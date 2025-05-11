// src/stores/colorStore.ts
import chroma from "chroma-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Types
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
  rgba: RGBA;
  hsl: HSL;
  cmyk: CMYK;
  lch: LCH;
}

export interface ColorStore {
  colorCards: ColorDataState[];
  addColorCard: (initialData?: Partial<Omit<ColorDataState, "id">>) => string;
  removeColorCard: (id: string) => void;
  updateColorCardName: (id: string, name: string) => void;
  updateColorCardHex: (id: string, hex: string) => void;
  updateColorCardShades: (id: string, shades: number) => void;
  updateColorCardRgba: (id: string, rgba: RGBA) => void;
  updateColorCardHsl: (id: string, hsl: HSL) => void;
  updateColorCardCmyk: (id: string, cmyk: CMYK) => void;
  updateColorCardLch: (id: string, lch: LCH) => void;
  updateColorCardRgbaChannel: <K extends keyof RGBA>(
    id: string,
    channel: K,
    value: RGBA[K],
  ) => void;
  updateColorCardHslChannel: <K extends keyof HSL>(id: string, channel: K, value: HSL[K]) => void;
  updateColorCardCmykChannel: <K extends keyof CMYK>(
    id: string,
    channel: K,
    value: CMYK[K],
  ) => void;
  updateColorCardLchChannel: <K extends keyof LCH>(id: string, channel: K, value: LCH[K]) => void;
  resetStore: () => void;
}

const createInitialColorCardState = (
  id: string,
  initialData?: Partial<Omit<ColorDataState, "id">>,
): ColorDataState => {
  const baseHex = initialData?.hex || "#93b0ff";
  const color = chroma(baseHex);
  return {
    id,
    name: initialData?.name ?? `color${id.substring(id.length - 8, id.length)}`,
    hex: baseHex,
    shades: initialData?.shades ?? 12,
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

/**
 * @example
 * import { useColorStore } from "store/colorStore";
 * const MyComponent = () => {
 *   const { colorCards, addColorCard } = useColorStore();
 *   return (
 *     <div>
 *       {colorCards.map((card) => (
 *         <div key={card.id} style={{ backgroundColor: card.hex }}>
 *           <h3>{card.name}</h3>
 *         </div>
 *       ))}
 *       <button onClick={() => addColorCard()}>Add Color Card</button>
 *     </div>
 *   );
 * };
 * export default MyComponent;
 */
export const useColorStore = create<ColorStore>()(
  persist(
    immer((set, _get) => ({
      colorCards: [createInitialColorCardState(Date.now().toString())],

      addColorCard: (initialData) => {
        const newId = Date.now().toString();
        const newCard = createInitialColorCardState(newId, initialData);
        set((state) => {
          state.colorCards.push(newCard);
        });
        return newId;
      },

      removeColorCard: (id) =>
        set((state) => {
          state.colorCards = state.colorCards.filter((card) => card.id !== id);
        }),

      updateColorCardName: (id, name) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.name = name;
          }
        }),

      updateColorCardHex: (id, hex) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card && chroma.valid(hex)) {
            const color = chroma(hex);
            card.hex = color.hex();

            card.rgba = {
              r: color.get("rgb.r"),
              g: color.get("rgb.g"),
              b: color.get("rgb.b"),
              a: color.alpha(),
            };
            card.hsl = {
              h: color.get("hsl.h"),
              s: color.get("hsl.s"),
              l: color.get("hsl.l"),
            };
            card.cmyk = {
              c: color.get("cmyk.c"),
              m: color.get("cmyk.m"),
              y: color.get("cmyk.y"),
              k: color.get("cmyk.k"),
            };
            card.lch = {
              l: color.get("lch.l"),
              c: color.get("lch.c"),
              h: color.get("lch.h"),
            };
          } else {
            console.error(`Invalid hex color provided: ${hex} for card ID: ${id}`);
          }
        }),

      updateColorCardShades: (id, shades) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.shades = Math.max(0, Number(shades) || 0);
          }
        }),

      updateColorCardRgba: (id, rgba) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.rgba = rgba;
          }
        }),

      updateColorCardHsl: (id, hsl) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.hsl = hsl;
          }
        }),

      updateColorCardCmyk: (id, cmyk) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.cmyk = cmyk;
          }
        }),

      updateColorCardLch: (id, lch) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.lch = lch;
          }
        }),

      updateColorCardRgbaChannel: (id, channel, value) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.rgba[channel] = value;
          }
        }),

      updateColorCardHslChannel: (id, channel, value) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.hsl[channel] = value;
          }
        }),

      updateColorCardCmykChannel: (id, channel, value) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.cmyk[channel] = value;
          }
        }),

      updateColorCardLchChannel: (id, channel, value) =>
        set((state) => {
          const card = state.colorCards.find((card) => card.id === id);
          if (card) {
            card.lch[channel] = value;
          }
        }),

      resetStore: () =>
        set(() => ({ colorCards: [createInitialColorCardState(Date.now().toString())] })),
    })),
    {
      name: "color-conjure-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
