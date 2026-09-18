"use client";

import Link from "next/link";
import BPuzzleGame from "./BPuzzleGame";

export default function BPuzzlePost() {
  return (
    <>
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 flex w-fit items-center gap-2 text-sm text-amber-600 transition-colors hover:text-amber-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Blog
          </Link>
          <span className="mb-4 inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white uppercase">
            Blog
          </span>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Play Bolonda&apos;s Puzzle
          </h1>
          <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
            <span className="font-medium text-gray-700">Jonathan Bolonda</span>
            <span>&middot;</span>
            <time>September 18, 2026</time>
            <span>&middot;</span>
            <span>Play now</span>
          </div>
          <p className="text-lg leading-relaxed text-gray-600">
            We turned our family photos into a puzzle you can play in the browser. Choose how many
            pieces you want, walk the stages in order, and put each memory back together. Progress
            stays on this device, so you can come back and keep going.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Tap two pieces to swap them, or drag a piece onto another. Preview the full photo if you
            get stuck. When you finish a picture, the next one unlocks.
          </p>
        </div>
      </section>

      <section className="bg-[#FFF6EE] py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-visible rounded-[28px] border border-[#E8D3C2] bg-[#FFF6EE] shadow-xl">
            <BPuzzleGame />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            A web version of Bolonda&apos;s Puzzle, built from the family photo game.
          </p>
        </div>
      </section>
    </>
  );
}
