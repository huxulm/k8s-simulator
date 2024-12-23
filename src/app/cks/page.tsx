"use client";
import cks from "@/cks.json";
import { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const idMaps = [
  "contexts",
  "runtime-security-with-falco",
  "apiserver-security",
  "pod-security-standard",
  "cis-benchmark",
  "verify-platform-binaries",
  "kubeletconfiguration",
  "ciliumnetworkpolicy",
  "apparmor-profile",
  "container-runtime-sandbox-gvisor",
  "secrets-in-etcd",
  "hack-secrets",
  "restrict-access-to-metadata-server",
  "syscall-activity",
  "configure-tls-on-ingress",
  "docker-image-attack-surface",
  "audit-log-policy",
  "sbom",
  "immutable-root-filesystem",
  "update-kubernetes",
  "image-vulnerability-scanning",
  "manual-static-security-analysis",
  "imagepolicywebhook",
];
export default function CKS() {
  const questions = cks.questions["1.31"] as Record<string, string>;
  const seqs = Object.keys(questions);
  const contents = useMemo(() => {
    return seqs.map((seq, i) => {
      const question = questions[seq];
      return (
        <div key={`c_${i}`}>
          <h1 className="text-xl font-bold">{`Question ${seq}`}</h1>
          <p>
            <ReactMarkdown className="markdown">{question}</ReactMarkdown>
          </p>
        </div>
      );
    });
  }, [questions]);
  const [current, setCurrent] = useState(
    contents ? { id: 0, content: contents[0] } : null
  );
  const ref = useRef<HTMLIFrameElement>(null);
  const answer = useMemo(() => {
    return (
      <iframe ref={ref} src="cks_ans.html" width="100%" height="100%"></iframe>
    );
  }, [questions, ref]);
  const scrollToAnswer = (id: string) => {
    const doc = ref.current!.contentDocument!;
    const ele = doc.getElementById(id);
    console.log(id, ele);
    if (ele) ele.scrollIntoView();
  };
  const changeQuestion = (index: number) => {
    setCurrent({ id: index, content: contents[index] });
    scrollToAnswer(`question-${index + 1}-|-${idMaps[index]}`);
  };
  return (
    <main className="main">
      <nav className="top-nav">
        <ul className="nav-list">
          <a className="nav-logo" href="./cka">
            <img src="./k8s/cka.svg" className="w-full h-full" />
          </a>
          <a className="nav-logo" href="./cks">
            <img src="./k8s/cks.svg" className="w-full h-full" />
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
                key={`menu_${index}`}
                className="side-item"
                onClick={() => changeQuestion(index)}
              >{`Question ${seq}`}</li>
            ))}
          </ul>
        </div>
        <div className="content p-5 bg-white">
          {current?.content}
          <button
            className="answer"
            onClick={() =>
              scrollToAnswer(
                `question-${current?.id}-|-${idMaps[current!.id - 1]}`
              )
            }
          >
            Ans
          </button>
          <div className="absolute bottom-10 flex items-center justify-center w-full gap-5">
            <button
              className="btn"
              onClick={() => current!.id > 0 && changeQuestion(current!.id - 1)}
            >
              Prev
            </button>
            <button
              className="btn"
              onClick={() =>
                current!.id < seqs.length - 1 && changeQuestion(current!.id + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
        <div className="content overflow-y-auto w-full p-0">{answer}</div>
      </div>
    </main>
  );
}
