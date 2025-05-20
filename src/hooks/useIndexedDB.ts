// src/hooks/useIndexedDB.ts
import { useLiveQuery } from "dexie-react-hooks";

import { ColorDataState } from "@/store";

import { db } from "../services/idbService";

type useIndexedDBType = {
  palettes: ColorDataState[] | undefined;
  addPalette: (data: ColorDataState) => Promise<string>;
  updatePalette: (id: string, changes: Partial<ColorDataState>) => Promise<number>;
  deletePalette: (id: string) => Promise<void>;
};

/**
 * Hook wrapping IndexedDB operations for palettes
 */
export function useIndexedDB(): useIndexedDBType {
  const palettes = useLiveQuery(() => db.palettes.toArray(), []);

  const addPalette = (data: ColorDataState): Promise<string> => db.palettes.add(data);
  const updatePalette = (id: string, changes: Partial<ColorDataState>): Promise<number> =>
    db.palettes.update(id, changes);
  const deletePalette = (id: string): Promise<void> => db.palettes.delete(id);

  return { palettes, addPalette, updatePalette, deletePalette };
}
