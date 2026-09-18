import type { Metadata } from "next";
import BPuzzlePost from "@/components/bpuzzle/BPuzzlePost";

export const metadata: Metadata = {
  title: "Play Bolonda's Puzzle",
  description:
    "Piece together Bolonda family photos in a free browser puzzle. Choose a difficulty, follow the stages, and play right here.",
};

export default function BPuzzleBlogPage() {
  return <BPuzzlePost />;
}
