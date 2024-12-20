"use client";
import cks from "@/cks.json";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function CKS() {
  const questions = cks.questions["1.31"] as Record<string, string>;
  const seqs = Object.keys(questions);
  const contents = useMemo(() => {
    return seqs.map((seq) => {
      const question = questions[seq];
      return (
        <div>
          <h1 className="text-xl font-bold">{`Question ${seq}`}</h1>
          <p>
            <ReactMarkdown className="markdown">{question}</ReactMarkdown>
          </p>
        </div>
      );
    });
  }, [questions]);
  const [current, setCurrent] = useState(contents ? contents[0] : null);
  const answer = useMemo(() => {
    return <iframe src="cks_ans.html" width="100%" height="100%"></iframe>;
  }, [questions]);
  return (
    <main className="main">
      <nav className="top-nav">
        <ul className="nav-list">
          <a className="nav-logo" href="/cka">
            <img
              src="/k8s/cka.svg"
              alt="Next.js logo"
              className="w-full h-full"
            />
          </a>
          <a className="nav-logo" href="/cka">
            <img
              src="/k8s/cka.svg"
              alt="Next.js logo"
              className="w-full h-full"
            />
          </a>
          <h3 className="text-blue-600 text-xl font-bold">
            Certified Kubernetes Security Specialist (CKS)
          </h3>
        </ul>
      </nav>
      <div className="grid-container">
        <div className="sidebar">
          <ul>
            {seqs.map((seq, index) => (
              <li
                className="side-item"
                onClick={() => setCurrent(contents[index])}
              >{`Question ${seq}`}</li>
            ))}
          </ul>
        </div>
        <div className="content p-5 bg-white">{current}</div>
        <div className="content overflow-y-auto w-full p-0">{answer}</div>
      </div>
    </main>
  );
}