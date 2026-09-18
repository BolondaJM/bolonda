export interface PhotoAsset {
  id: string;
  stageNumber: number;
  imageNumber: number;
  src: string;
}

export interface Stage {
  number: number;
  name: string;
  photos: PhotoAsset[];
}

export const STAGE_NAMES: Record<number, string> = {
  1: "Wifey",
  2: "Husband",
  3: "Dating Era",
  4: "Traditional Door",
  5: "Eternity Entrance",
  6: "Forever Ever",
};

const STAGE_PHOTO_COUNTS: Record<number, number> = {
  1: 10,
  2: 10,
  3: 10,
  4: 10,
  5: 12,
  6: 15,
};

function photosFor(stageNumber: number, count: number): PhotoAsset[] {
  return Array.from({ length: count }, (_, index) => {
    const imageNumber = index + 1;
    return {
      id: `${stageNumber}-${imageNumber}`,
      stageNumber,
      imageNumber,
      src: `/bpuzzle/photos/stage-${stageNumber}/${imageNumber}.jpg`,
    };
  });
}

export const stages: Stage[] = Object.entries(STAGE_PHOTO_COUNTS).map(
  ([number, count]) => {
    const stageNumber = Number(number);
    return {
      number: stageNumber,
      name: STAGE_NAMES[stageNumber] ?? `Stage ${stageNumber}`,
      photos: photosFor(stageNumber, count),
    };
  },
);

export const allPhotos: PhotoAsset[] = stages.flatMap((stage) => stage.photos);

export function stageByNumber(stageNumber: number): Stage | undefined {
  return stages.find((stage) => stage.number === stageNumber);
}

export function photoById(stageNumber: number, imageNumber: number): PhotoAsset | undefined {
  return allPhotos.find(
    (photo) => photo.stageNumber === stageNumber && photo.imageNumber === imageNumber,
  );
}

export function stageName(stageNumber: number): string {
  return STAGE_NAMES[stageNumber] ?? `Stage ${stageNumber}`;
}
