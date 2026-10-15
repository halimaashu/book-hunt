"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function CopyTransactionId({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard can be blocked, nothing else to do
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy transaction ID"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:bg-zinc-800 dark:text-slate-200 dark:hover:bg-zinc-700"
    >
      {copied ? (
        <>
          <FiCheck className="text-green-600 dark:text-green-400" />
          Copied
        </>
      ) : (
        <>
          <FiCopy />
          Copy
        </>
      )}
    </button>
  );
}