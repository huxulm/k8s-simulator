import Image from "next/image";

export default function Home() {
  return (
    <div className="p-2">
      <main className="flex flex-col items-center mt-20 sm:mt-40">
        <h1 className="text-3xl sm:text-6xl font-bold text-blue-500 text-center">
          CKA CKAD CKS Simulator Q&A
        </h1>
        <nav className="flex flex-col gap-4 items-start mt-5 sm:flex-row sm:gap-4 sm:mt-20">
          <a className="logo" href="/cks">
            <Image src="/k8s/cks.svg" alt="Next.js logo" priority />
          </a>
          <a className="logo" href="/cka">
            <Image src="/k8s/cka.svg" alt="Next.js logo" priority />
          </a>
        </nav>
      </main>
    </div>
  );
}
