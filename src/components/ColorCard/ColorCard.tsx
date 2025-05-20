import chroma from "chroma-js";
import { FC } from "react";
import { BsEyedropper, BsFloppy, BsPlus, BsTrash3 } from "react-icons/bs";

import { ExportButton } from "@/components/Shared/ExportButton";
import { usePaletteStore } from "@/store";

const ICON_BTN =
  "grid h-10 w-10 place-content-center rounded-sm border border-slate-900 hover:bg-slate-700 hover:text-white transition-colors";

const BOX =
  "h-10 w-10 rounded-sm border border-slate-900 px-1 py-0.5 text-center text-[11px] text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none";

type ColorCardProps = {
  cardId?: string;
};

const ColorCard: FC<ColorCardProps> = ({ cardId }) => {
  const cardData = usePaletteStore((state) =>
    cardId ? state.palettes.find((card) => card.id === cardId) : undefined,
  );
  const updatePalette = usePaletteStore((state) => state.updatePalette);
  const deletePalette = usePaletteStore((state) => state.deletePalette);

  // Generate shades and persist
  const handleGenerateShades = (): void => {
    if (!cardData) return;
    const scale = chroma.scale(["white", cardData.hex, "black"]).mode("lab");
    const shades = scale.colors(cardData.shades);
    updatePalette(cardId!, { generatedShades: shades }).catch(console.error);
  };

  if (!cardId || !cardData) {
    return null;
  }

  return (
    <div className="my-4 flex flex-col gap-2 rounded-sm bg-white p-2 shadow-sm">
      <div className="grid grid-cols-[1fr_auto_auto_auto] items-start gap-1">
        <div className="flex flex-col">
          <input
            type="text"
            className="h-10 min-w-1 rounded-sm border border-slate-900 px-2 py-1 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="Color Name (e.g. primary)"
            aria-label="Color Name"
            value={cardData.name}
            onChange={(e) => updatePalette(cardId!, { name: e.target.value })}
          />
        </div>

        <div
          className="h-10 w-10 rounded-sm border border-slate-900"
          style={{ backgroundColor: cardData.hex }}
          aria-label="Color Preview"
          title="Color Preview"
        ></div>

        <button className={ICON_BTN} title="Pick Color">
          <BsEyedropper size={20} />
        </button>

        {/* Save is automatic via DB persistence */}
        <button className={ICON_BTN} title="Save Color" disabled>
          <BsFloppy size={20} />
        </button>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto_auto] items-start gap-1">
        <div className="flex flex-col">
          <input
            type="text"
            className="h-10 min-w-1 rounded-sm border border-slate-900 px-2 py-1 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="Hex Value (e.g. #FF5733)"
            aria-label="Hex Value"
            value={cardData.hex}
            onChange={(e) => updatePalette(cardId!, { hex: e.target.value })}
          />
        </div>

        <button className={ICON_BTN} title="Generate Shades" onClick={handleGenerateShades}>
          <BsPlus size={28} />
        </button>

        <button className={ICON_BTN} title="Delete Color" onClick={() => deletePalette(cardId!)}>
          <BsTrash3 size={20} />
        </button>

        <input
          type="text"
          className="h-10 w-10 rounded-sm border border-slate-900 px-2 py-1 text-center text-base text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="10"
          aria-label="Number of Shades"
          value={cardData.shades}
          onChange={(e) => updatePalette(cardId!, { shades: Number(e.target.value) })}
        />
      </div>

      <div className="grid grid-cols-7 gap-1">
        {(["r", "g", "b", "a"] as const).map((channel) => (
          <span key={channel} className="flex flex-col items-center">
            <input
              type="text"
              className={BOX}
              placeholder={channel.toUpperCase()}
              aria-label={`${channel.toUpperCase()} Value`}
              value={cardData.rgba[channel]}
              onChange={(e) =>
                updatePalette(cardId!, {
                  rgba: { ...cardData.rgba, [channel]: Number(e.target.value) },
                }).catch(console.error)
              }
            />
            <label className="text-center text-xs text-slate-900">{channel.toUpperCase()}</label>
          </span>
        ))}

        {(["h", "s", "l"] as const).map((channel) => (
          <span key={channel} className="flex flex-col items-center">
            <input
              type="text"
              className={BOX}
              placeholder={channel.toUpperCase()}
              aria-label={`${channel.toUpperCase()} Value`}
              value={cardData.hsl[channel]}
              onChange={(e) =>
                updatePalette(cardId!, {
                  hsl: { ...cardData.hsl, [channel]: Number(e.target.value) },
                }).catch(console.error)
              }
            />
            <label className="text-center text-xs text-slate-900">{channel.toUpperCase()}</label>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {(["c", "m", "y", "k"] as const).map((channel) => (
          <span key={channel} className="flex flex-col items-center">
            <input
              type="text"
              className={BOX}
              placeholder={channel.toUpperCase()}
              aria-label={`${channel.toUpperCase()} Value`}
              value={cardData.cmyk[channel]}
              onChange={(e) =>
                updatePalette(cardId!, {
                  cmyk: { ...cardData.cmyk, [channel]: Number(e.target.value) },
                }).catch(console.error)
              }
            />
            <label className="text-center text-xs text-slate-900">{channel.toUpperCase()}</label>
          </span>
        ))}
        {(["l", "c", "h"] as const).map((channel) => (
          <span key={channel} className="flex flex-col items-center">
            <input
              type="text"
              className={BOX}
              placeholder={channel.toUpperCase()}
              aria-label={`${channel.toUpperCase()} Value`}
              value={cardData.lch[channel]}
              onChange={(e) =>
                updatePalette(cardId!, {
                  lch: { ...cardData.lch, [channel]: Number(e.target.value) },
                }).catch(console.error)
              }
            />
            <label className="text-center text-xs text-slate-900">{channel.toUpperCase()}</label>
          </span>
        ))}
      </div>

      {/* Export section - show only if shades are generated */}
      {cardData.generatedShades && cardData.generatedShades.length > 0 && (
        <div className="mt-2 border-t border-slate-200 pt-2">
          <ExportButton palette={cardData} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default ColorCard;
