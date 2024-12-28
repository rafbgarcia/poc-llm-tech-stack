"use client";

import { IconArrowUp } from "@tabler/icons-react";
import { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function Home() {
  const [ragOutput, setRagOutput] = useState("");
  const [noRagOutput, setNoRagOutput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    askWithRag(e);
    askWithoutRag(e);
  };

  const askWithRag = async (e: React.FormEvent) => {
    const form = e.target as HTMLFormElement;
    const message = form.prompt.value;
    const nextjs = form.nextjs.value;
    const version = nextjs.split(" ")[1];
    const router = nextjs.includes("pages") ? "pages" : "app";

    setRagOutput("...");
    const res = await fetch("http://localhost:8000/with-rag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        version,
        router,
      }),
    });

    const data = await res.json();
    setRagOutput(data.answer);
  };

  const askWithoutRag = async (e: React.FormEvent) => {
    const form = e.target as HTMLFormElement;
    const message = form.prompt.value;
    const nextjs = form.nextjs.value;
    const version = nextjs.split(" ")[1];
    const router = nextjs.includes("pages") ? "pages" : "app";

    setNoRagOutput("...");
    const res = await fetch("http://localhost:8000/without-rag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        version,
        router,
      }),
    });

    const data = await res.json();
    setNoRagOutput(data.answer);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-[40rem] mx-auto mt-4">
          <p className="text-sm font-semibold">Tech stack</p>
          <div className="flex flex-col gap-2">
            <select
              name="nextjs"
              className="select select-bordered select-xs w-72"
            >
              <option>NextJS 15.1.2 app router</option>
              <option>NextJS 15.1.2 pages router</option>
              <option>NextJS 14.2.21 app router</option>
              <option>NextJS 14.2.21 pages router</option>
              <option>NextJS 13.5.8 app router</option>
              <option>NextJS 13.5.8 pages router</option>
            </select>
          </div>
        </div>

        <div className="w-[40rem] mx-auto mt-10 flex items-end gap-2">
          <textarea
            name="prompt"
            className="textarea textarea-bordered w-full"
            required
            minLength={10}
            rows={3}
            defaultValue={`Implement a form with optimistic update to save a post with fields title?:string, content: string, publishDate: string.
Also create a server action that returns validation errors and display in the client.`}
            autoComplete="off"
          />
          <button type="submit" className="btn">
            <IconArrowUp size={18} />
          </button>
        </div>
      </form>

      <div className="w-[40rem] mx-auto my-10">
        <div className="alert">Both models receive the same instructions.</div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-10">
        <div>
          <h3 className="font-semibold">Without RAG</h3>
          <Md>{noRagOutput}</Md>
        </div>
        <div>
          <h3 className="font-semibold">With RAG</h3>
          <Md>{ragOutput}</Md>
        </div>
      </div>
    </>
  );
}

function Md({ children }: { children: string }) {
  return (
    <Markdown
      components={{
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter {...rest} PreTag="div" language={match[1]}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
