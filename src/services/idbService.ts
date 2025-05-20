import Dexie, { Table } from "dexie";

import { ColorDataState } from "@/store";

export class AppDB extends Dexie {
  palettes!: Table<ColorDataState, string>;

  constructor() {
    super("colorConjureDB");
    this.version(1).stores({
      palettes: "id,name,hex,shades",
    });
  }
}

export const db = new AppDB();
