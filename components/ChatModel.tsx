"use client";

import { useChat } from "@ai-sdk/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Copy, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { useEditorStore } from "@/lib/store/editorStore";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);

export default function Chat() {
  const params = useParams();
  const { elements } = useEditorStore();
  const projectId = params.slug as string;
  const [format, setFormat] = useState("react");
  const [includeStyles, setIncludeStyles] = useState(true);
  const [includeInteractivity, setIncludeInteractivity] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [errorCount, setErrorCount] = useState(0);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
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
      if (
        (errorCount < 3 && error.message.includes("network")) ||
        error.message.includes("timeout")
      ) {
        // Auto-retry on network errors
        setErrorCount((prev) => prev + 1);
        setTimeout(() => {
          reload();
        }, 1000);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    },
    onFinish: () => {
      setErrorCount(0);
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const copyMessages = () => {
    try {
      if (messages.length === 0) {
        toast.info("No messages to copy");
        return;
      }

      // Extract all text content from messages
      const textContent = messages
        .map((message) =>
          message.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("\n")
        )
        .join("\n\n");

      // Copy to clipboard
      navigator.clipboard.writeText(textContent);
      toast.success("Chat content copied to clipboard");
    } catch (error) {
      console.error("Failed to copy messages:", error);
      toast.error("Failed to copy content");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <Button className="w-10 flex" onClick={copyMessages}>
          <Copy className="w-full" />
        </Button>
        {errorCount > 0 && (
          <span className="text-amber-500 text-xs">
            Retrying... ({errorCount}/3)
          </span>
        )}
        {error && errorCount >= 3 && (
          <Button
            size="sm"
            onClick={() => {
              setErrorCount(0);
              reload();
            }}
          >
            Retry
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-4 mb-16">
        {messages.map((message) => (
          <div key={message.id}>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <ReactMarkdown
                      key={i}
                      components={{
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const isInline = !match;

                          return isInline ? (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          ) : (
                            <div className="syntax-highlight-wrapper">
                              <SyntaxHighlighter
                                style={{
                                  'pre[class*="language-"]': {
                                    background: "#1E1E1E",
                                    color: "#D4D4D4",
                                    padding: "1em",
                                    borderRadius: "0.3em",
                                    overflow: "auto",
                                  },
                                  'code[class*="language-"]': {
                                    color: "#D4D4D4",
                                  },
                                }}
                                language={match?.[1] || "javascript"}
                                PreTag="div"
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
        ))}

        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <p>Ask about your project elements or request generated code</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Label htmlFor="format" className="text-xs">
                Format:
              </Label>
              <Select defaultValue={format} onValueChange={setFormat}>
                <SelectTrigger id="format" className="h-8 w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  {/* <SelectItem value="code">Code</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="includeStyles"
                checked={includeStyles}
                onCheckedChange={setIncludeStyles}
              />
              <Label htmlFor="includeStyles" className="text-xs">
                Include Styles
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="includeInteractivity"
                checked={includeInteractivity}
                onCheckedChange={setIncludeInteractivity}
              />
              <Label htmlFor="includeInteractivity" className="text-xs">
                Include Interactivity
              </Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              className="flex-1"
              value={input}
              placeholder="Ask about your elements or request generated code..."
              onChange={handleInputChange}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button
              type="button"
              size="icon"
              disabled={isLoading || !input.trim()}
              onClick={() => handleSubmit()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
