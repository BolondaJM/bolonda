"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { allPhotos, stages, stageByNumber, stageName, type PhotoAsset } from "@/lib/bpuzzle/catalog";
import {
  ALLOWED_PIECE_COUNTS,
  isPhotoUnlocked,
  isStageComplete,
  isStageUnlocked,
  loadPreferences,
  nextIsNewStage,
  nextPhoto,
  randomPlayable,
  savePreferences,
  type PieceCount,
  type PuzzlePreferences,
} from "@/lib/bpuzzle/engine";
import PuzzlePlay from "./PuzzlePlay";

type Screen =
  | { name: "onboarding" }
  | { name: "home" }
  | { name: "stages" }
  | { name: "photos"; stageNumber: number }
  | { name: "settings"; from: Screen }
  | { name: "transition"; fromStage: number; toStage: number; toImage: number }
  | { name: "puzzle"; stageNumber: number; imageNumber: number; random: boolean };

const PIECE_HINTS: Record<PieceCount, { title: string; hint: string; columns: number; rows: number }> = {
  8: { title: "8 pieces", hint: "Easier", columns: 2, rows: 4 },
  12: { title: "12 pieces", hint: "Just right", columns: 3, rows: 4 },
  24: { title: "24 pieces", hint: "Challenge", columns: 4, rows: 6 },
};

export default function BPuzzleGame() {
  const [prefs, setPrefs] = useState<PuzzlePreferences | null>(null);
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const loaded = loadPreferences();
    setPrefs(loaded);
    setScreen(loaded.hasChosenPieceCount ? { name: "home" } : { name: "onboarding" });
  }, []);

  const completed = useMemo(() => new Set(prefs?.completedPhotos ?? []), [prefs]);

  const updatePrefs = useCallback((next: PuzzlePreferences) => {
    setPrefs(next);
    savePreferences(next);
  }, []);

  const markCompleted = useCallback(
    (photo: PhotoAsset) => {
      setPrefs((current) => {
        if (!current) return current;
        if (current.completedPhotos.includes(photo.id)) return current;
        const next = {
          ...current,
          completedPhotos: [...current.completedPhotos, photo.id],
        };
        savePreferences(next);
        return next;
      });
    },
    [],
  );

  function openPuzzle(photo: PhotoAsset, random: boolean) {
    setScreen({
      name: "puzzle",
      stageNumber: photo.stageNumber,
      imageNumber: photo.imageNumber,
      random,
    });
  }

  if (!prefs) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center text-[#53443B]">
        Loading Bolonda&apos;s Puzzle…
      </div>
    );
  }

  if (screen.name === "onboarding") {
    return (
      <PieceCountPicker
        title="How many pieces?"
        body="Pick a difficulty for your first puzzle. You can change this later in Settings."
        selected={prefs.pieceCount}
        confirmLabel="Continue"
        onSelect={(count) =>
          updatePrefs({ ...prefs, pieceCount: count, hasChosenPieceCount: true })
        }
        onConfirm={(count) => {
          updatePrefs({ ...prefs, pieceCount: count, hasChosenPieceCount: true });
          setScreen({ name: "home" });
        }}
      />
    );
  }

  if (screen.name === "home") {
    return (
      <HomeScreen
        photoCount={allPhotos.length}
        onStart={() => setScreen({ name: "stages" })}
        onRandom={() => {
          const photo = randomPlayable(allPhotos, completed);
          if (photo) openPuzzle(photo, true);
        }}
        onSettings={() => setScreen({ name: "settings", from: { name: "home" } })}
      />
    );
  }

  if (screen.name === "settings") {
    return (
      <div className="relative flex h-full min-h-0 flex-col">
        <TopBar title="Settings" onBack={() => setScreen(screen.from)} />
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3 text-[#3D2914]">
            <span className="text-xl">{prefs.soundEnabled ? "🔊" : "🔇"}</span>
            <span className="font-semibold">Sound effects</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={prefs.soundEnabled}
            onClick={() => updatePrefs({ ...prefs, soundEnabled: !prefs.soundEnabled })}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              prefs.soundEnabled ? "bg-[#C45C26]" : "bg-[#C8B8AC]"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                prefs.soundEnabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
        <PieceCountPicker
          title="Number of pieces"
          body="This applies to every new puzzle. If you change it during a game, that puzzle restarts."
          selected={prefs.pieceCount}
          showConfirm={false}
          onSelect={(count) => {
            const restartPuzzle = count !== prefs.pieceCount && screen.from.name === "puzzle";
            updatePrefs({ ...prefs, pieceCount: count, hasChosenPieceCount: true });
            if (restartPuzzle) setScreen(screen.from);
          }}
        />
        <div className="px-4 pb-6">
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-sm font-semibold text-[#C45C26]"
          >
            Reset stage progress
          </button>
        </div>
        {confirmReset && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#FFF6EE] p-5 shadow-xl">
              <p className="text-lg font-semibold text-[#3D2914]">Reset stage progress</p>
              <p className="mt-2 text-sm text-[#53443B]">Clear which photos you have already solved?</p>
              <div className="mt-5 flex justify-end gap-3">
                <button type="button" onClick={() => setConfirmReset(false)} className="px-3 py-2 text-sm">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updatePrefs({ ...prefs, completedPhotos: [] });
                    setConfirmReset(false);
                  }}
                  className="rounded-full bg-[#C45C26] px-4 py-2 text-sm font-semibold text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (screen.name === "stages") {
    const allComplete = stages.length > 0 && stages.every((stage) => isStageComplete(stage, completed));
    return (
      <div className="relative flex h-full min-h-0 flex-col">
        <TopBar title="Stages" onBack={() => setScreen({ name: "home" })} />
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <p className="mb-4 text-sm text-[#53443B]">
            {allComplete
              ? "You have finished every family photo. Replay any stage, or try Random mode."
              : "Follow the path. Finish every photo in a stage before the next stage unlocks."}
          </p>
          <JourneyList
            stops={stages.map((stage) => ({
              id: `stage-${stage.number}`,
              title: stage.name,
              subtitle: `${stage.photos.filter((photo) => completed.has(photo.id)).length} / ${stage.photos.length} photos`,
              src: stage.photos[0]?.src,
              unlocked: isStageUnlocked(stages, stage, completed),
              completed: isStageComplete(stage, completed),
            }))}
            onSelect={(id) => {
              const stage = stages.find((item) => `stage-${item.number}` === id);
              if (stage && isStageUnlocked(stages, stage, completed)) {
                setScreen({ name: "photos", stageNumber: stage.number });
              }
            }}
          />
        </div>
      </div>
    );
  }

  if (screen.name === "photos") {
    const stage = stageByNumber(screen.stageNumber);
    if (!stage) return null;
    return (
      <div className="relative flex h-full min-h-0 flex-col">
        <TopBar title={stage.name} onBack={() => setScreen({ name: "stages" })} />
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <p className="mb-4 text-sm text-[#53443B]">
            Photos unlock one by one. Complete the current photo to open the next.
          </p>
          <JourneyList
            stops={stage.photos.map((photo) => ({
              id: photo.id,
              title: `Photo ${photo.imageNumber}`,
              subtitle: completed.has(photo.id)
                ? "Completed"
                : isPhotoUnlocked(allPhotos, photo, completed)
                  ? "Ready to play"
                  : "Locked. Finish the previous photo first.",
              src: photo.src,
              unlocked: isPhotoUnlocked(allPhotos, photo, completed),
              completed: completed.has(photo.id),
            }))}
            onSelect={(id) => {
              const photo = stage.photos.find((item) => item.id === id);
              if (photo && isPhotoUnlocked(allPhotos, photo, completed)) {
                openPuzzle(photo, false);
              }
            }}
          />
        </div>
      </div>
    );
  }

  if (screen.name === "transition") {
    return (
      <StageTransition
        completedStageName={stageName(screen.fromStage)}
        nextStageName={stageName(screen.toStage)}
        onContinue={() =>
          setScreen({
            name: "puzzle",
            stageNumber: screen.toStage,
            imageNumber: screen.toImage,
            random: false,
          })
        }
      />
    );
  }

  const photo = allPhotos.find(
    (item) => item.stageNumber === screen.stageNumber && item.imageNumber === screen.imageNumber,
  );
  if (!photo) return null;
  const upcoming = screen.random ? undefined : nextPhoto(allPhotos, photo);
  const stage = stageByNumber(photo.stageNumber);

  return (
    <PuzzlePlay
      key={`${photo.id}-${prefs.pieceCount}-${screen.random}`}
      photo={photo}
      pieceCount={prefs.pieceCount}
      isRandom={screen.random}
      hasNext={Boolean(upcoming)}
      nextIsNewStage={nextIsNewStage(photo, upcoming)}
      soundEnabled={prefs.soundEnabled}
      photoCountInStage={stage?.photos.length ?? 1}
      onBack={() => setScreen(screen.random ? { name: "home" } : { name: "stages" })}
      onSolved={markCompleted}
      onNext={() => {
        if (!upcoming) return;
        if (nextIsNewStage(photo, upcoming)) {
          setScreen({
            name: "transition",
            fromStage: photo.stageNumber,
            toStage: upcoming.stageNumber,
            toImage: upcoming.imageNumber,
          });
        } else {
          openPuzzle(upcoming, false);
        }
      }}
      onPlayAnother={() => {
        const another = randomPlayable(allPhotos, completed, photo) ?? photo;
        openPuzzle(another, true);
      }}
      onHome={() => setScreen({ name: "home" })}
      onSettings={() => setScreen({ name: "settings", from: screen })}
    />
  );
}

function HomeScreen({
  photoCount,
  onStart,
  onRandom,
  onSettings,
}: {
  photoCount: number;
  onStart: () => void;
  onRandom: () => void;
  onSettings: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col px-6 py-4">
      <div className="flex justify-end">
        <button
          type="button"
          aria-label="Settings"
          onClick={onSettings}
          className="rounded-full p-2 text-[#3D2914] hover:bg-[#FFDCC8]"
        >
          ⚙️
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <img
          src="/bpuzzle/logo.png"
          alt="Bolonda's Puzzle"
          className="mb-4 w-44 rounded-2xl object-contain"
        />
        <h2 className="text-3xl font-bold text-[#3D2914]">Bolonda&apos;s Puzzle</h2>
        <p className="mt-2 max-w-md text-[#53443B]">Piece Together our Family Photos</p>
        {photoCount === 0 ? (
          <p className="mt-8 text-red-700">No photos found.</p>
        ) : (
          <div className="mt-10 w-full max-w-sm space-y-3">
            <button
              type="button"
              onClick={onStart}
              className="h-14 w-full rounded-full bg-[#C45C26] text-lg font-semibold text-white shadow-md hover:bg-[#a94b1d]"
            >
              Start
            </button>
            <button
              type="button"
              onClick={onRandom}
              className="h-14 w-full rounded-full border-2 border-[#C45C26] text-lg font-semibold text-[#C45C26] hover:bg-[#FFDCC8]"
            >
              🔀 Random mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PieceCountPicker({
  title,
  body,
  selected,
  confirmLabel,
  showConfirm = true,
  onSelect,
  onConfirm,
}: {
  title: string;
  body: string;
  selected: PieceCount;
  confirmLabel?: string;
  showConfirm?: boolean;
  onSelect: (count: PieceCount) => void;
  onConfirm?: (count: PieceCount) => void;
}) {
  const [current, setCurrent] = useState(selected);
  useEffect(() => setCurrent(selected), [selected]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-6 py-6">
      <h2 className="text-center text-2xl font-bold text-[#3D2914]">{title}</h2>
      <p className="mt-3 text-center text-[#53443B]">{body}</p>
      <div className="mt-7 space-y-3">
        {ALLOWED_PIECE_COUNTS.map((count) => {
          const meta = PIECE_HINTS[count];
          const active = current === count;
          return (
            <button
              key={count}
              type="button"
              onClick={() => {
                setCurrent(count);
                onSelect(count);
                if (!showConfirm) onConfirm?.(count);
              }}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left ${
                active ? "border-[#C45C26] bg-[#FFDCC8]/50" : "border-[#C8B8AC] bg-white"
              }`}
            >
              <MiniGrid columns={meta.columns} rows={meta.rows} />
              <div className="flex-1">
                <p className="font-semibold text-[#3D2914]">{meta.title}</p>
                <p className="text-sm text-[#53443B]">{meta.hint}</p>
              </div>
              <span
                className={`h-5 w-5 rounded-full border-2 ${
                  active ? "border-[#C45C26] bg-[#C45C26]" : "border-[#85746A]"
                }`}
              />
            </button>
          );
        })}
      </div>
      {showConfirm && (
        <button
          type="button"
          onClick={() => onConfirm?.(current)}
          className="mt-6 h-12 w-full rounded-full bg-[#C45C26] font-semibold text-white"
        >
          {confirmLabel ?? "Continue"}
        </button>
      )}
    </div>
  );
}

function MiniGrid({ columns, rows }: { columns: number; rows: number }) {
  return (
    <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${columns}, 10px)` }}>
      {Array.from({ length: columns * rows }).map((_, index) => (
        <span key={index} className="h-2 w-2.5 rounded-[1px] bg-[#C45C26]/70" />
      ))}
    </div>
  );
}

function JourneyList({
  stops,
  onSelect,
}: {
  stops: {
    id: string;
    title: string;
    subtitle: string;
    src?: string;
    unlocked: boolean;
    completed: boolean;
  }[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-2 pb-8">
      {stops.map((stop, index) => (
        <div key={stop.id}>
          <button
            type="button"
            disabled={!stop.unlocked}
            onClick={() => onSelect(stop.id)}
            className={`flex w-full max-w-sm items-center gap-3 rounded-[28px] border-2 bg-white p-2.5 shadow-sm ${
              index % 2 === 1 ? "ml-auto" : ""
            } ${
              stop.completed
                ? "border-[#2E7D4F]"
                : stop.unlocked
                  ? "border-[#C45C26]"
                  : "border-[#C8B8AC] opacity-80"
            }`}
          >
            {index % 2 === 0 && <Portrait stop={stop} />}
            <div className={`flex-1 ${index % 2 === 1 ? "text-right" : "text-left"}`}>
              <p className="font-semibold text-[#3D2914]">{stop.title}</p>
              <p className="text-xs text-[#53443B]">{stop.subtitle}</p>
            </div>
            {index % 2 === 1 && <Portrait stop={stop} />}
          </button>
          {index < stops.length - 1 && (
            <div className="flex justify-center py-1">
              <span className={`text-lg ${stops[index + 1].unlocked ? "text-[#E8B86D]" : "text-[#C8B8AC]"}`}>
                ╰╮
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Portrait({
  stop,
}: {
  stop: { src?: string; unlocked: boolean; completed: boolean; title: string };
}) {
  return (
    <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full bg-[#F3E3D6]">
      {stop.src && (
        <img
          src={stop.src}
          alt={stop.title}
          className={`h-full w-full object-cover ${stop.unlocked ? "" : "scale-110 blur-sm grayscale"}`}
        />
      )}
      {!stop.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-lg text-white">
          🔒
        </div>
      )}
      {stop.completed && (
        <span className="absolute right-1 top-1 text-sm text-[#2E7D4F]" aria-hidden>
          ✓
        </span>
      )}
    </div>
  );
}

function StageTransition({
  completedStageName,
  nextStageName,
  onContinue,
}: {
  completedStageName: string;
  nextStageName: string;
  onContinue: () => void;
}) {
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const first = window.setTimeout(() => setReveal(true), 800);
    const second = window.setTimeout(onContinue, 3400);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, [onContinue]);

  return (
    <div className="relative flex h-full min-h-0 flex-col items-center justify-center px-8 text-center">
      <p className="text-lg text-[#53443B]">You finished</p>
      <p className="mt-2 text-3xl font-semibold text-[#3D2914]">{completedStageName}</p>
      {reveal && (
        <>
          <p className="mt-10 text-lg text-[#53443B]">Now moving to</p>
          <p className="mt-2 text-4xl font-bold text-[#E8B86D]">{nextStageName}</p>
          <button
            type="button"
            onClick={onContinue}
            className="mt-10 rounded-full bg-[#C45C26] px-8 py-3 font-semibold text-white"
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
}

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="flex items-center gap-2 px-2 py-2">
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        className="rounded-full p-2 text-[#3D2914] hover:bg-[#FFDCC8]"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
      <h2 className="flex-1 pr-10 text-center text-lg font-semibold text-[#3D2914]">{title}</h2>
    </header>
  );
}
