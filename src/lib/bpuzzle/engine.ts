import type { PhotoAsset, Stage } from "./catalog";

export const ALLOWED_PIECE_COUNTS = [8, 12, 24] as const;
export type PieceCount = (typeof ALLOWED_PIECE_COUNTS)[number];
export const DEFAULT_PIECE_COUNT: PieceCount = 12;

export interface PuzzleBoard {
  columns: number;
  rows: number;
  tiles: number[];
}

export function dimensions(pieceCount: number): { columns: number; rows: number } {
  switch (pieceCount) {
    case 8:
      return { columns: 2, rows: 4 };
    case 12:
      return { columns: 3, rows: 4 };
    case 24:
      return { columns: 4, rows: 6 };
    default:
      throw new Error("Piece count must be 8, 12, or 24");
  }
}

export function isSolved(tiles: number[]): boolean {
  return tiles.every((value, index) => value === index);
}

export function shuffledBoard(pieceCount: number): PuzzleBoard {
  const { columns, rows } = dimensions(pieceCount);
  const count = columns * rows;
  let tiles: number[];
  do {
    tiles = Array.from({ length: count }, (_, index) => index);
    for (let i = tiles.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (isSolved(tiles));
  return { columns, rows, tiles };
}

export function swapTiles(board: PuzzleBoard, first: number, second: number): PuzzleBoard {
  if (first === second) return board;
  const tiles = [...board.tiles];
  const held = tiles[first];
  tiles[first] = tiles[second];
  tiles[second] = held;
  return { ...board, tiles };
}

export function cellUnderDrag(
  board: PuzzleBoard,
  fromIndex: number,
  dragX: number,
  dragY: number,
  gridWidth: number,
  gridHeight: number,
): number {
  if (gridWidth <= 0 || gridHeight <= 0 || fromIndex < 0 || fromIndex >= board.tiles.length) {
    return fromIndex;
  }
  const cellWidth = gridWidth / board.columns;
  const cellHeight = gridHeight / board.rows;
  const originX = (fromIndex % board.columns) * cellWidth + cellWidth / 2;
  const originY = Math.floor(fromIndex / board.columns) * cellHeight + cellHeight / 2;
  const x = Math.min(Math.max(originX + dragX, 0), gridWidth - 1);
  const y = Math.min(Math.max(originY + dragY, 0), gridHeight - 1);
  const column = Math.min(Math.max(Math.floor(x / cellWidth), 0), board.columns - 1);
  const row = Math.min(Math.max(Math.floor(y / cellHeight), 0), board.rows - 1);
  return row * board.columns + column;
}

export function isPhotoUnlocked(
  photos: PhotoAsset[],
  photo: PhotoAsset,
  completed: Set<string>,
): boolean {
  const index = photos.findIndex((item) => item.id === photo.id);
  if (index <= 0) return true;
  if (index < 0) return false;
  if (completed.has(photos[index].id)) return true;
  return photos.slice(0, index).every((item) => completed.has(item.id));
}

export function isStageUnlocked(
  stageList: Stage[],
  stage: Stage,
  completed: Set<string>,
): boolean {
  const index = stageList.findIndex((item) => item.number === stage.number);
  if (index <= 0) return true;
  if (index < 0) return false;
  const previous = stageList[index - 1];
  return previous.photos.length > 0 && previous.photos.every((photo) => completed.has(photo.id));
}

export function nextPhoto(photos: PhotoAsset[], current: PhotoAsset): PhotoAsset | undefined {
  const index = photos.findIndex((item) => item.id === current.id);
  if (index < 0 || index >= photos.length - 1) return undefined;
  return photos[index + 1];
}

export function playablePhotos(photos: PhotoAsset[], completed: Set<string>): PhotoAsset[] {
  return photos.filter((photo) => isPhotoUnlocked(photos, photo, completed));
}

export function randomPlayable(
  photos: PhotoAsset[],
  completed: Set<string>,
  excluding?: PhotoAsset,
): PhotoAsset | undefined {
  const unlocked = playablePhotos(photos, completed);
  const pool = unlocked.filter((photo) => photo.id !== excluding?.id);
  const choices = pool.length > 0 ? pool : unlocked;
  if (choices.length === 0) return undefined;
  return choices[Math.floor(Math.random() * choices.length)];
}

export function nextIsNewStage(current: PhotoAsset, next?: PhotoAsset): boolean {
  return Boolean(next && next.stageNumber !== current.stageNumber);
}

export function isStageComplete(stage: Stage, completed: Set<string>): boolean {
  return stage.photos.length > 0 && stage.photos.every((photo) => completed.has(photo.id));
}

const STORAGE_KEY = "bpuzzle-web-progress";

export interface PuzzlePreferences {
  hasChosenPieceCount: boolean;
  pieceCount: PieceCount;
  completedPhotos: string[];
  soundEnabled: boolean;
}

const DEFAULT_PREFS: PuzzlePreferences = {
  hasChosenPieceCount: false,
  pieceCount: DEFAULT_PIECE_COUNT,
  completedPhotos: [],
  soundEnabled: true,
};

function isPieceCount(value: number): value is PieceCount {
  return (ALLOWED_PIECE_COUNTS as readonly number[]).includes(value);
}

export function loadPreferences(): PuzzlePreferences {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<PuzzlePreferences>;
    return {
      hasChosenPieceCount: Boolean(parsed.hasChosenPieceCount),
      pieceCount: isPieceCount(Number(parsed.pieceCount))
        ? (Number(parsed.pieceCount) as PieceCount)
        : DEFAULT_PIECE_COUNT,
      completedPhotos: Array.isArray(parsed.completedPhotos)
        ? parsed.completedPhotos.filter((id): id is string => typeof id === "string")
        : [],
      soundEnabled: parsed.soundEnabled !== false,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePreferences(prefs: PuzzlePreferences): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export interface PreparedPuzzleImage {
  src: string;
  width: number;
  height: number;
}

export async function preparePuzzleImage(
  src: string,
  maxSide = 1600,
): Promise<PreparedPuzzleImage> {
  const image = await loadImage(src);
  const longest = Math.max(image.width, image.height);
  const scale = longest > maxSide ? maxSide / longest : 1;
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to prepare this photo");
  context.drawImage(image, 0, 0, width, height);
  return {
    src: canvas.toDataURL("image/jpeg", 0.92),
    width,
    height,
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("This photo could not be loaded"));
    image.src = src;
  });
}

let moveSound: HTMLAudioElement | null = null;

export function playMoveSound(enabled: boolean, volume = 0.8): void {
  if (!enabled || typeof window === "undefined") return;
  if (!moveSound) {
    moveSound = new Audio("/bpuzzle/piece_move.wav");
  }
  moveSound.volume = volume;
  moveSound.currentTime = 0;
  void moveSound.play().catch(() => undefined);
}
