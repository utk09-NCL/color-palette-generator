// src/store/colorTypes.ts
import chroma from "chroma-js";

/** Red-Green-Blue-Alpha (0-255, alpha 0-1) */
export type RGBA = { r: number; g: number; b: number; a: number };
/** Hue-Saturation-Lightness (0-360, 0-100%) */
export type HSL = { h: number; s: number; l: number };
/** Cyan-Magenta-Yellow-Key (0-100%) */
export type CMYK = { c: number; m: number; y: number; k: number };
/** Lightness-Chroma-Hue (0-150, 0-150, 0-360) */
export type LCH = { l: number; c: number; h: number };

export interface ColorDataState {
  id: string;
  name: string;
  hex: string;
  shades: number;
  generatedShades: string[];
  rgba: RGBA;
  hsl: HSL;
  cmyk: CMYK;
  lch: LCH;
}

export const createInitialColorCardState = (
  id: string,
  initialData?: Partial<Omit<ColorDataState, "id" | "generatedShades">>,
): ColorDataState => {
  const baseHex = initialData?.hex || "#93b0ff";
  const color = chroma(baseHex);
  return {
    id,
    name: initialData?.name ?? `color${id.substring(id.length - 8, id.length)}`,
    hex: baseHex,
    shades: initialData?.shades ?? 12,
    generatedShades: [],
    rgba: initialData?.rgba ?? {
      r: color.get("rgb.r"),
      g: color.get("rgb.g"),
      b: color.get("rgb.b"),
      a: color.alpha(),
    },
    hsl: initialData?.hsl ?? {
      h: color.get("hsl.h"),
      s: color.get("hsl.s"),
      l: color.get("hsl.l"),
    },
    cmyk: initialData?.cmyk ?? {
      c: color.get("cmyk.c"),
      m: color.get("cmyk.m"),
      y: color.get("cmyk.y"),
      k: color.get("cmyk.k"),
    },
    lch: initialData?.lch ?? {
      l: color.get("lch.l"),
      c: color.get("lch.c"),
      h: color.get("lch.h"),
    },
  };
};
