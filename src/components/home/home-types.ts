export type HomeModel = {
  name: string;
  slug: string;
  category?: string;
  tagline: string;
  specifications: {
    label: string;
    value: string;
    unit?: string;
  }[];
  image: string;
  imageAlt: string;
  mediaMode?: "transparent" | "studio";
  visuals: {
    stageScale: number;
    stageX: string;
    stageY: string;
    stageMaxWidth: string;
    stageObjectPosition: string;
    selectorScale: number;
    selectorX: string;
    selectorY: string;
    wordmarkX: string;
    wordmarkY: string;
    wordmarkScale: number;
    wordmarkTracking: string;
  };
};
