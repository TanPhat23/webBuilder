"use client";

import { useChat } from "@ai-sdk/react";
import { Input } from "./ui/input";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const params = useParams();
  const projectId = params.slug as string;

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: {
      projectId: projectId,
    },
  });

  return (
    <div className="flex flex-col py-24 mx-auto">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <ReactMarkdown key={i}>{part.text}</ReactMarkdown>;
              default:
                return null;
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <Input
          className="fixed bottom-0 w-[300px] p-2 mb-16 border bg-secondary rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
