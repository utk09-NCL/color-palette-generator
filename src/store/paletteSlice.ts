// src/store/paletteSlice.ts
import { create } from "zustand";

import { db } from "../services/idbService";

import type { ColorDataState } from "./colorTypes";

export interface PaletteStore {
  palettes: ColorDataState[];
  loadPalettes: () => Promise<void>;
  addPalette: (data: ColorDataState) => Promise<string>;
  updatePalette: (id: string, changes: Partial<ColorDataState>) => Promise<number>;
  deletePalette: (id: string) => Promise<void>;
}

export const usePaletteStore = create<PaletteStore>((set, _get) => ({
  palettes: [],

  loadPalettes: async () => {
    const all = await db.palettes.toArray();
    set({ palettes: all });
  },

  addPalette: async (data) => {
    const id = await db.palettes.add(data);
    await _get().loadPalettes();
    return id;
  },

  updatePalette: async (id, changes) => {
    const count = await db.palettes.update(id, changes);
    await _get().loadPalettes();
    return count;
  },

  deletePalette: async (id) => {
    await db.palettes.delete(id);
    await _get().loadPalettes();
  },
}));
