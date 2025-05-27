"use client";

import { Message, useChat } from "@ai-sdk/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  Copy,
  Download,
  Loader2,
  Send,
  Settings,
  Code2,
  FileText,
  RefreshCw,
  Trash2,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { useEditorStore } from "@/lib/store/editorStore";
import { v4 as uuid } from "uuid";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Chat() {
  const params = useParams();
  const { elements } = useEditorStore();
  const projectId = params.slug as string;
  const [format, setFormat] = useState("react");
  const [includeStyles, setIncludeStyles] = useState(true);
  const [includeInteractivity, setIncludeInteractivity] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [errorCount, setErrorCount] = useState(0);
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [messageCount, setMessageCount] = useState(0);

  // Chat presets for common requests
  const chatPresets = [
    {
      id: "mobile-first",
      title: "📱 Mobile-First",
      description: "Generate responsive mobile-first code",
      prompt:
        "Generate mobile-first responsive code for all elements with proper breakpoints and touch-friendly interactions",
    },
    {
      id: "accessibility",
      title: "♿ Accessibility",
      description: "Generate accessible, inclusive code",
      prompt:
        "Generate accessible code with proper ARIA labels, semantic HTML, keyboard navigation, and screen reader support",
    },
    {
      id: "performance",
      title: "⚡ Performance",
      description: "Generate performance-optimized code",
      prompt:
        "Generate performance-optimized code with lazy loading, minimal bundle size, and efficient rendering patterns",
    },
    {
      id: "animation",
      title: "✨ With Animations",
      description: "Add smooth animations and transitions",
      prompt:
        "Generate code with smooth animations, micro-interactions, and engaging transitions using modern CSS and JavaScript",
    },
  ];
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      elements: elements,
      projectId: projectId,
      format: format,
      includeStyles: includeStyles,
      includeInteractivity: includeInteractivity,
    },
    onError: (error) => {
      console.error("Chat error:", error);
      if (error.message.includes("elements")) {
        toast.error("No elements found. Please add elements to your project.");
      } else if (
        (errorCount < 3 && error.message.includes("network")) ||
        error.message.includes("timeout")
      ) {
        // Auto-retry on network errors with exponential backoff
        setErrorCount((prev) => prev + 1);
        toast.warning(`Network error, retrying... (${errorCount + 1}/3)`);
        setTimeout(() => {
          reload();
        }, 1000 * Math.pow(2, errorCount)); // Exponential backoff
      } else {
        toast.error(`Error: ${error.message}`);
      }
    },
    onFinish: (message: Message) => {
      setCurrentResponse(message.content);
      setErrorCount(0);
      setMessageCount((prev) => prev + 1);
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  // Enhanced code extraction with better block detection
  const extractCode = () => {
    if (currentResponse.length === 0) {
      toast.info("No messages to extract");
      return null;
    }

    let codeBlocks = "";
    let fileExtension = "js";
    let blockCount = 0;

    // Set file extension based on the format
    switch (format) {
      case "react":
        fileExtension = "jsx";
        break;
      case "html":
        fileExtension = "html";
        break;
      case "vue":
        fileExtension = "vue";
        break;
      case "angular":
        fileExtension = "ts";
        break;
      default:
        fileExtension = "js";
    }

    const codeBlockPattern = /```[\s\S]*?```/g;
    const matches = currentResponse.match(codeBlockPattern);

    if (matches) {
      matches.forEach((match) => {
        // Remove the ``` markers and language identifier
        let codeContent = match.replace(/^```\w*\n?/, "").replace(/```$/, "");
        if (codeContent.trim()) {
          codeBlocks += codeContent.trim() + "\n\n";
          blockCount++;
        }
      });
    }

    // If no code blocks found, return the entire response
    if (blockCount === 0) {
      codeBlocks = currentResponse.trim();
      blockCount = 1;
    }

    toast.success(`Extracted ${blockCount} code block(s)`);

    return {
      content: codeBlocks.trim(),
      extension: fileExtension,
      blockCount,
    };
  };
  const downloadCode = useCallback(() => {
    try {
      const extracted = extractCode();

      if (!extracted || !extracted.content) {
        toast.info("No code blocks found to download");
        return;
      }

      // Create a blob with the code content
      const blob = new Blob([extracted.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link to trigger download
      const a = document.createElement("a");
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, -5);

      a.href = url;
      a.download = `${format}-code-${timestamp}.${extracted.extension}`;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);

      toast.success(
        `Code downloaded successfully (${extracted.blockCount} blocks)`
      );
    } catch (error) {
      console.error("Failed to download code:", error);
      toast.error("Failed to download code");
    }
  }, [currentResponse, format]);
  const copyMessages = useCallback(() => {
    try {
      if (messages.length === 0) {
        toast.info("No messages to copy");
        return;
      }

      navigator.clipboard.writeText(currentResponse);
      toast.success("Latest response copied to clipboard");
    } catch (error) {
      console.error("Failed to copy messages:", error);
      toast.error("Failed to copy content");
    }
  }, [messages, currentResponse]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setCurrentResponse("");
    setMessageCount(0);
    toast.success("Chat history cleared");
  }, [setMessages]);

  const handleRetry = useCallback(() => {
    setErrorCount(0);
    reload();
  }, [reload]);

  const handlePresetClick = useCallback(
    (preset: (typeof chatPresets)[0]) => {
      if (isLoading) return;

      // Set the input to the preset prompt
      handleInputChange({ target: { value: preset.prompt } } as any);

      // Auto-submit if there are elements
      if (elements.length > 0) {
        setTimeout(() => {
          handleSubmit();
          setCurrentResponse("");
        }, 100);
      } else {
        toast.warning("Add elements to your project first");
      }
    },
    [isLoading, elements.length, handleInputChange, handleSubmit]
  );

  const handleKeySubmit = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
        setCurrentResponse("");
      }
    },
    [handleSubmit]
  );
  return (
    <TooltipProvider>
      <div className="flex flex-col h-full mx-16 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
              <Code2 className="w-3 h-3 text-primary" />
            </div>
            <div>
              <h2 className="font-medium text-xs">AI Code Generator</h2>
              <p className="text-[10px] text-muted-foreground">
                {elements.length} element(s) • {messageCount} message(s)
              </p>
            </div>
          </div>{" "}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={copyMessages}
                  disabled={messages.length === 0}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy latest response</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={downloadCode}
                  disabled={!currentResponse}
                >
                  <Download className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download code</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={clearHistory}
                  disabled={messages.length === 0}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear history</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle settings</TooltipContent>
            </Tooltip>
          </div>
        </div>{" "}
        {/* Settings Panel */}
        {showSettings && (
          <>
            <div className="border-b bg-muted/30 p-2 space-y-2">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Format</Label>
                  <Select defaultValue={format} onValueChange={setFormat}>
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium">Options</Label>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Switch
                        id="includeStyles"
                        checked={includeStyles}
                        onCheckedChange={setIncludeStyles}
                        className="scale-75"
                      />
                      <Label htmlFor="includeStyles" className="text-xs">
                        Styles
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Switch
                        id="includeInteractivity"
                        checked={includeInteractivity}
                        onCheckedChange={setIncludeInteractivity}
                        className="scale-75"
                      />
                      <Label htmlFor="includeInteractivity" className="text-xs">
                        Interactive
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium">Elements</Label>
                  <div className="text-xs text-muted-foreground">
                    {elements.length} element(s)
                  </div>
                  {elements.length === 0 && (
                    <p className="text-[10px] text-destructive">
                      Add elements first
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}{" "}
        {/* Chat Presets */}
        {messages.length === 0 && !isLoading && elements.length > 0 && (
          <div className="bg-background p-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Quick Start
              </Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={() => setShowPresets(!showPresets)}
              >
                {showPresets ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </Button>
            </div>

            {showPresets && (
              <div className="grid grid-cols-2 gap-1">
                {chatPresets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    className="h-auto p-2 justify-start text-left"
                    onClick={() => handlePresetClick(preset)}
                    disabled={isLoading}
                  >
                    <div className="space-y-0.5">
                      <div className="font-medium text-xs">{preset.title}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {preset.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}{" "}
        {/* Error/Retry Section */}
        {errorCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-2 mx-2 mt-1 rounded">
            <div className="flex items-center justify-between">
              <span className="text-amber-700 text-xs">
                Retrying... ({errorCount}/3)
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs"
                onClick={handleRetry}
              >
                <RefreshCw className="w-2 h-2 mr-1" />
                Retry
              </Button>
            </div>
          </div>
        )}{" "}
        {/* Messages */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded p-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-8"
                      : "bg-muted mr-8"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {message.role === "user" ? (
                      <MessageSquare className="w-3 h-3" />
                    ) : (
                      <Code2 className="w-3 h-3" />
                    )}
                    <Badge
                      variant={
                        message.role === "user" ? "secondary" : "default"
                      }
                      className="text-[10px] h-4"
                    >
                      {message.role === "user" ? "You" : "AI"}
                    </Badge>
                  </div>

                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <ReactMarkdown
                            key={i}
                            components={{
                              code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                const isInline = !match;
                                return isInline ? (
                                  <code
                                    className="bg-background/20 px-1 py-0.5 rounded text-xs font-mono"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                ) : (
                                  <div className="mt-2 rounded overflow-hidden border">
                                    <div className="bg-background/10 px-2 py-1 text-[10px] font-medium flex items-center justify-between">
                                      <span>{match?.[1] || "code"}</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-4 w-4 p-0"
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            String(children)
                                          );
                                          toast.success(
                                            "Code copied to clipboard"
                                          );
                                        }}
                                      >
                                        <Copy className="w-2 h-2" />
                                      </Button>
                                    </div>
                                    <SyntaxHighlighter
                                      style={atomOneDark}
                                      language={match?.[1] || "javascript"}
                                      PreTag="div"
                                      showLineNumbers
                                      className="text-xs"
                                      customStyle={{
                                        margin: 0,
                                        fontSize: "11px",
                                        lineHeight: "1.2",
                                      }}
                                    >
                                      {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                  </div>
                                );
                              },
                            }}
                          >
                            {part.text}
                          </ReactMarkdown>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            ))}{" "}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded p-2 mr-8">
                  <div className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="text-xs">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            {/* Empty State */}
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-32 text-center space-y-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">
                    Ready to Generate Code
                  </h3>
                  <p className="text-muted-foreground text-xs max-w-xs">
                    Ask about your project elements or request generated code.
                  </p>
                </div>
                {elements.length === 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded p-2 max-w-xs">
                    <p className="text-amber-800 text-xs">
                      <FileText className="w-3 h-3 inline mr-1" />
                      Add elements to your project first.
                    </p>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>{" "}
        {/* Input Area */}
        <div className="border-t bg-background p-2">
          <div className="flex gap-1">
            <Input
              className="flex-1 h-8 text-xs"
              value={input}
              placeholder="Ask about your elements or request code..."
              onChange={handleInputChange}
              disabled={isLoading}
              onKeyDown={handleKeySubmit}
            />
            <Button
              type="button"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={isLoading || !input.trim()}
              onClick={() => {
                handleSubmit();
                setCurrentResponse("");
              }}
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Send className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
