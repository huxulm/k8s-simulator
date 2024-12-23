"use client";
import cka from "@/cka.json";
import { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const idMaps = [
  "contexts",
  "schedule-pod-on-controlplane-nodes",
  "scale-down-statefulset",
  "pod-ready-if-service-is-reachable",
  "kubectl-sorting",
  "storage-pv-pvc-pod-volume",
  "node-and-pod-resource-usage",
  "get-controlplane-information",
  "kill-scheduler-manual-scheduling",
  "rbac-serviceaccount-role-rolebinding",
  "daemonset-on-all-nodes",
  "deployment-on-all-nodes",
  "multi-containers-and-pod-shared-volume",
  "find-out-cluster-information",
  "cluster-event-logging",
  "namespaces-and-api-resources",
  "find-container-of-pod-and-check-info",
  "fix-kubelet",
  "create-secret-and-mount-into-pod",
  "update-kubernetes-version-and-join-cluster",
  "create-a-static-pod-and-service",
  "check-how-long-certificates-are-valid",
  "kubelet-clientserver-cert-info",
  "networkpolicy",
  "etcd-snapshot-save-and-restore",
  "extra-question-1-|-find-pods-first-to-be-terminated",
  "extra-question-2-|-curl-manually-contact-api",
];
export default function CKA() {
  const questions = cka.questions["1.31"] as Record<string, string>;
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
  const [current, setCurrent] = useState({ id: 0, content: contents[0] });
  const ref = useRef<HTMLIFrameElement>(null);
  const answer = useMemo(() => {
    return (
      <iframe ref={ref} src="cka_ans.html" width="100%" height="100%"></iframe>
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
            Certified Kubernetes Administrator (CKA)
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
              >
                {`Question ${seq}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="content p-5 bg-white">
          {current?.content}
          <button
            className="answer"
            onClick={() =>
              scrollToAnswer(
                `question-${current.id}-|-${idMaps[current.id - 1]}`
              )
            }
          >
            Ans
          </button>
          <div className="absolute bottom-10 flex items-center justify-center w-full gap-5">
            <button
              className="btn"
              onClick={() => current.id > 0 && changeQuestion(current.id - 1)}
            >
              Prev
            </button>
            <button
              className="btn"
              onClick={() =>
                current.id < seqs.length - 1 && changeQuestion(current.id + 1)
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
