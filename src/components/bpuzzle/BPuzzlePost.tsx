"use client";

import Link from "next/link";
import BPuzzleGame from "./BPuzzleGame";

const ANDROID_APK_URL =
  "https://github.com/BolondaJM/bolonda/releases/download/puzzle-app/bolonda-puzzle.apk";
const ANDROID_RELEASE_URL =
  "https://github.com/BolondaJM/bolonda/releases/tag/puzzle-app";

function AndroidLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.6 9.48 19.44 6.3a.66.66 0 0 0-.26-.85.65.65 0 0 0-.85.26l-1.89 3.27A10.9 10.9 0 0 0 12 8.06c-1.61 0-3.12.34-4.44.94L5.67 5.71a.65.65 0 0 0-.85-.26.66.66 0 0 0-.26.85l1.84 3.18C3.83 11.17 2.1 14.05 2 17.25h20c-.1-3.2-1.83-6.08-4.4-7.77ZM7.25 14.5a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Zm9.5 0a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z" />
    </svg>
  );
}

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

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Android app</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Download Bolonda&apos;s Puzzle</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Prefer the phone app? Android users can download and install Bolonda&apos;s Puzzle
              directly from this page. It is not on the Play Store yet, so your phone will treat it
              as an unknown app.
            </p>
            <a
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-[#C45C26] px-5 py-2.5 pr-7 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#a94b1d]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <AndroidLogo className="h-6 w-6" />
              </span>
              Download for Android
            </a>
            <p className="mt-2 text-sm text-gray-500">
              APK file · about 140 MB ·{" "}
              <a
                href={ANDROID_RELEASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
              >
                GitHub Release
              </a>
            </p>
            <div className="mt-6 space-y-2 text-sm leading-relaxed text-gray-600">
              <p className="font-semibold text-gray-800">Before you install</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Download the app, then open the APK from your notification or Files app.</li>
                <li>
                  If Android says the source is unknown, go to Settings and allow this browser or
                  Files app to install unknown apps.
                </li>
                <li>
                  If Play Protect or another auto-block stops the install, tap <span className="font-medium text-gray-800">Install anyway</span> or
                  turn off the block for this one-time install.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF6EE] py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-2xl font-bold text-[#3D2914]">Play in the browser</h2>
          <p className="mb-6 text-center text-gray-600">
            No install needed. Start a puzzle right here.
          </p>
          <div className="relative h-[min(85dvh,760px)] min-h-[520px] overflow-hidden rounded-[28px] border border-[#E8D3C2] bg-[#FFF6EE] shadow-xl">
            <div className="h-full min-h-0">
              <BPuzzleGame />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            A web version of Bolonda&apos;s Puzzle, built from the family photo game.
          </p>
        </div>
      </section>
    </>
  );
}
