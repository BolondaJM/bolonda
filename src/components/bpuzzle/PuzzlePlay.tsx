"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import type { PhotoAsset } from "@/lib/bpuzzle/catalog";
import { stageName } from "@/lib/bpuzzle/catalog";
import {
  cellUnderDrag,
  isSolved,
  playMoveSound,
  preparePuzzleImage,
  shuffledBoard,
  swapTiles,
  type PreparedPuzzleImage,
  type PuzzleBoard,
} from "@/lib/bpuzzle/engine";

interface PuzzlePlayProps {
  photo: PhotoAsset;
  pieceCount: number;
  isRandom: boolean;
  hasNext: boolean;
  nextIsNewStage: boolean;
  soundEnabled: boolean;
  photoCountInStage: number;
  onBack: () => void;
  onSolved: (photo: PhotoAsset) => void;
  onNext: () => void;
  onPlayAnother: () => void;
  onHome: () => void;
  onSettings: () => void;
}

export default function PuzzlePlay({
  photo,
  pieceCount,
  isRandom,
  hasNext,
  nextIsNewStage,
  soundEnabled,
  photoCountInStage,
  onBack,
  onSolved,
  onNext,
  onPlayAnother,
  onHome,
  onSettings,
}: PuzzlePlayProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [puzzleImage, setPuzzleImage] = useState<PreparedPuzzleImage | null>(null);
  const [board, setBoard] = useState<PuzzleBoard | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const solved = board ? isSolved(board.tiles) : false;

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setPuzzleImage(null);
    setBoard(null);
    setSelectedIndex(null);
    setMoves(0);
    setShowPreview(false);
    setShowCelebration(false);

    const nextBoard = shuffledBoard(pieceCount);
    preparePuzzleImage(photo.src)
      .then((image) => {
        if (cancelled) return;
        setPuzzleImage(image);
        setBoard(nextBoard);
        setStatus("ready");
      })
      .catch((error: Error) => {
        if (cancelled) return;
        setErrorMessage(error.message || "Unable to load photo");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [photo.id, photo.src, pieceCount]);

  useEffect(() => {
    if (!solved) return;
    onSolved(photo);
    const timer = window.setTimeout(() => setShowCelebration(true), 500);
    return () => window.clearTimeout(timer);
  }, [solved, onSolved, photo]);

  function applySwap(first: number, second: number) {
    if (!board || solved || first === second) return;
    playMoveSound(soundEnabled, 0.85);
    setBoard(swapTiles(board, first, second));
    setSelectedIndex(null);
    setMoves((count) => count + 1);
  }

  function selectOrSwap(index: number) {
    if (!board || solved) return;
    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }
    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }
    applySwap(selectedIndex, index);
  }

  const title = isRandom
    ? "Random puzzle"
    : `${stageName(photo.stageNumber)} · ${photo.imageNumber}/${photoCountInStage}`;

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-2 px-2 py-2">
        <IconButton label="Back" onClick={onBack}>
          <BackIcon />
        </IconButton>
        <h2 className="flex-1 text-center text-lg font-semibold text-[#3D2914]">{title}</h2>
        {status === "ready" && (
          <IconButton label="Preview" onClick={() => setShowPreview(true)}>
            <PhotoIcon />
          </IconButton>
        )}
        <IconButton label="Settings" onClick={onSettings}>
          <SettingsIcon />
        </IconButton>
      </header>

      {status === "loading" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-[#53443B]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFDCC8] border-t-[#C45C26]" />
          <p>Loading photo…</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-[#53443B]">{errorMessage || "This photo could not be loaded on this device."}</p>
          <button
            type="button"
            onClick={() => {
              setStatus("loading");
              const nextBoard = shuffledBoard(pieceCount);
              preparePuzzleImage(photo.src)
                .then((image) => {
                  setPuzzleImage(image);
                  setBoard(nextBoard);
                  setStatus("ready");
                })
                .catch((error: Error) => {
                  setErrorMessage(error.message);
                  setStatus("error");
                });
            }}
            className="rounded-full bg-[#C45C26] px-6 py-2 font-semibold text-white"
          >
            Retry
          </button>
        </div>
      )}

      {status === "ready" && board && puzzleImage && (
        <div className="flex min-h-0 flex-1 flex-col items-center px-3 pb-4">
          <p className="max-w-xl shrink-0 text-center text-sm text-[#53443B]">
            Tap two pieces to swap, or drag a piece and drop it on another to switch them
          </p>
          <p className="mt-1 shrink-0 text-sm font-semibold text-[#3D2914]">Moves: {moves}</p>
          <PuzzleBoardView
            board={board}
            imageSrc={puzzleImage.src}
            imageWidth={puzzleImage.width}
            imageHeight={puzzleImage.height}
            selectedIndex={selectedIndex}
            solved={solved}
            onSelect={selectOrSwap}
            onSwap={applySwap}
            onPickup={() => playMoveSound(soundEnabled, 0.45)}
          />
        </div>
      )}

      {showPreview && puzzleImage && (
        <Modal onClose={() => setShowPreview(false)}>
          <p className="mb-3 text-center text-lg font-semibold text-[#3D2914]">Full photo preview</p>
          <img
            src={puzzleImage.src}
            alt="Puzzle preview"
            className="mx-auto max-h-[min(70vh,520px)] w-auto max-w-full rounded-xl object-contain"
          />
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className="mt-4 w-full text-sm font-semibold text-[#C45C26]"
          >
            Close preview
          </button>
        </Modal>
      )}

      {showCelebration && puzzleImage && (
        <WinDialog
          preview={puzzleImage.src}
          isRandom={isRandom}
          hasNext={hasNext}
          nextIsNewStage={nextIsNewStage}
          onNext={onNext}
          onPlayAnother={onPlayAnother}
          onHome={onHome}
          onBackToStages={onBack}
        />
      )}
    </div>
  );
}

function PuzzleBoardView({
  board,
  imageSrc,
  imageWidth,
  imageHeight,
  selectedIndex,
  solved,
  onSelect,
  onSwap,
  onPickup,
}: {
  board: PuzzleBoard;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  selectedIndex: number | null;
  solved: boolean;
  onSelect: (index: number) => void;
  onSwap: (first: number, second: number) => void;
  onPickup: () => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragOrigin = useRef<{ x: number; y: number; index: number } | null>(null);
  const gap = solved ? 0 : 3;

  useEffect(() => {
    if (solved) {
      setDraggingIndex(null);
      setDragOffset({ x: 0, y: 0 });
      dragOrigin.current = null;
    }
  }, [solved]);

  const cells = useMemo(
    () => Array.from({ length: board.tiles.length }, (_, index) => index),
    [board.tiles.length],
  );

  function tileStyle(tileId: number): CSSProperties {
    const column = tileId % board.columns;
    const row = Math.floor(tileId / board.columns);
    const x = board.columns === 1 ? 0 : (column / (board.columns - 1)) * 100;
    const y = board.rows === 1 ? 0 : (row / (board.rows - 1)) * 100;
    return {
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: `${board.columns * 100}% ${board.rows * 100}%`,
      backgroundPosition: `${x}% ${y}%`,
    };
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>, index: number) {
    if (solved) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragOrigin.current = { x: event.clientX, y: event.clientY, index };
    setDraggingIndex(index);
    setDragOffset({ x: 0, y: 0 });
    onPickup();
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!dragOrigin.current) return;
    setDragOffset({
      x: event.clientX - dragOrigin.current.x,
      y: event.clientY - dragOrigin.current.y,
    });
  }

  function endDrag(event: PointerEvent<HTMLButtonElement>) {
    const origin = dragOrigin.current;
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    const distance = Math.hypot(dx, dy);
    const grid = gridRef.current?.getBoundingClientRect();
    if (distance < 8) {
      onSelect(origin.index);
    } else if (grid && !solved) {
      const drop = cellUnderDrag(board, origin.index, dx, dy, grid.width, grid.height);
      if (drop !== origin.index) onSwap(origin.index, drop);
    }
    dragOrigin.current = null;
    setDraggingIndex(null);
    setDragOffset({ x: 0, y: 0 });
  }

  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect;
      if (!next) return;
      setBox({ width: next.width, height: next.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const aspect = imageWidth / imageHeight;
  const fitted =
    box.width > 0 && box.height > 0
      ? box.width / box.height > aspect
        ? { width: box.height * aspect, height: box.height }
        : { width: box.width, height: box.width / aspect }
      : { width: 0, height: 0 };

  return (
    <div ref={boxRef} className="mt-3 flex min-h-0 w-full flex-1 items-center justify-center">
      <div
        ref={gridRef}
        className="grid overflow-hidden rounded-xl"
        style={{
          width: fitted.width || undefined,
          height: fitted.height || undefined,
          gridTemplateColumns: `repeat(${board.columns}, minmax(0, 1fr))`,
          gap,
        }}
      >
        {cells.map((index) => {
          const tileId = board.tiles[index];
          const dragging = draggingIndex === index;
          return (
            <button
              key={`${index}-${tileId}`}
              type="button"
              aria-label={`Puzzle piece ${index + 1}`}
              onPointerDown={(event) => onPointerDown(event, index)}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={`relative touch-none overflow-hidden rounded-sm bg-no-repeat ${
                selectedIndex === index ? "ring-4 ring-[#7A5C2E]" : ""
              } ${dragging ? "z-20 shadow-xl" : "z-0"}`}
              style={{
                ...tileStyle(tileId),
                transform: dragging ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function WinDialog({
  preview,
  isRandom,
  hasNext,
  nextIsNewStage,
  onNext,
  onPlayAnother,
  onHome,
  onBackToStages,
}: {
  preview: string;
  isRandom: boolean;
  hasNext: boolean;
  nextIsNewStage: boolean;
  onNext: () => void;
  onPlayAnother: () => void;
  onHome: () => void;
  onBackToStages: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-6">
      <FlashingStars />
      <div className="relative z-10 w-full max-w-md text-center">
        <img
          src={preview}
          alt="Completed photo"
          className="mx-auto max-h-[min(50vh,420px)] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />
        <p className="mt-5 text-3xl font-bold text-[#E8B86D]">Congratulations!</p>
        <p className="mt-2 text-white">You put this photo back together.</p>
        <div className="mt-6 space-y-2">
          {isRandom ? (
            <>
              <button
                type="button"
                onClick={onPlayAnother}
                className="w-full rounded-full bg-[#C45C26] px-4 py-3 font-semibold text-white"
              >
                Play another
              </button>
              <button type="button" onClick={onHome} className="w-full py-2 font-semibold text-white">
                Home
              </button>
            </>
          ) : hasNext ? (
            <>
              <button
                type="button"
                onClick={onNext}
                className="w-full rounded-full bg-[#C45C26] px-4 py-3 font-semibold text-white"
              >
                {nextIsNewStage ? "Next stage" : "Next photo"}
              </button>
              <button type="button" onClick={onBackToStages} className="w-full py-2 font-semibold text-white">
                Stages
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onHome}
                className="w-full rounded-full bg-[#C45C26] px-4 py-3 font-semibold text-white"
              >
                Home
              </button>
              <button type="button" onClick={onBackToStages} className="w-full py-2 font-semibold text-white">
                Stages
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FlashingStars() {
  const sparks = [
    { x: "8%", y: "12%", delay: "0s" },
    { x: "78%", y: "10%", delay: "0.2s" },
    { x: "12%", y: "32%", delay: "0.4s" },
    { x: "86%", y: "36%", delay: "0.1s" },
    { x: "18%", y: "70%", delay: "0.3s" },
    { x: "82%", y: "68%", delay: "0.5s" },
    { x: "48%", y: "6%", delay: "0.15s" },
    { x: "52%", y: "88%", delay: "0.25s" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map((spark) => (
        <span
          key={`${spark.x}-${spark.y}`}
          className="absolute animate-pulse text-2xl text-[#E8B86D]"
          style={{ left: spark.x, top: spark.y, animationDelay: spark.delay }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl bg-[#FFF6EE] p-4 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="rounded-full p-2 text-[#3D2914] hover:bg-[#FFDCC8]"
    >
      {children}
    </button>
  );
}

function BackIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
