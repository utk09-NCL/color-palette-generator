import { type FC } from "react";
import { BsEyedropper, BsFloppy, BsPlus, BsTrash3 } from "react-icons/bs";

import { useColorStore } from "@/store/colorStore";

const ICON_BTN =
  "grid h-10 w-10 place-content-center rounded-sm border border-slate-900 hover:bg-slate-700 hover:text-white transition-colors";

const BOX =
  "h-10 w-10 rounded-sm border border-slate-900 px-1 py-0.5 text-center text-[11px] text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none";

type ColorCardProps = {
  cardId?: string;
};

const ColorCard: FC<ColorCardProps> = ({ cardId }) => {
  const cardData = useColorStore((state) =>
    cardId ? state.colorCards.find((card) => card.id === cardId) : undefined,
  );
  const updateColorCardName = useColorStore((state) => state.updateColorCardName);
  const updateColorCardHex = useColorStore((state) => state.updateColorCardHex);
  const updateColorCardShades = useColorStore((state) => state.updateColorCardShades);
  const removeColorCard = useColorStore((state) => state.removeColorCard);
  // const updateColorCardRgbaChannel = useColorStore((state) => state.updateColorCardRgbaChannel);
  // const updateColorCardHslChannel = useColorStore((state) => state.updateColorCardHslChannel);
  // const updateColorCardCmykChannel = useColorStore((state) => state.updateColorCardCmykChannel);
  // const updateColorCardLchChannel = useColorStore((state) => state.updateColorCardLchChannel);
  const generateColorCardShades = useColorStore((state) => state.generateColorCardShades);

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
            onChange={(e) => updateColorCardName(cardId, e.target.value)}
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

        <button className={ICON_BTN} title="Save Color">
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
            onChange={(e) => updateColorCardHex(cardId, e.target.value)}
          />
        </div>

        <button
          className={ICON_BTN}
          title="Generate Shades"
          onClick={() => generateColorCardShades(cardId)}
        >
          <BsPlus size={28} />
        </button>

        <button className={ICON_BTN} title="Delete Color" onClick={() => removeColorCard(cardId)}>
          <BsTrash3 size={20} />
        </button>

        <input
          type="text"
          className="h-10 w-10 rounded-sm border border-slate-900 px-2 py-1 text-center text-base text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="10"
          aria-label="Number of Shades"
          value={cardData.shades}
          onChange={(e) => updateColorCardShades(cardId, Number(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-7 gap-1">
        {(["r", "g", "b", "a"] as const).map((color) => (
          <span key={color} className="flex flex-col items-center">
            <input
              type="text"
              className={BOX}
              placeholder={color.toUpperCase()}
              aria-label={`${color.toUpperCase()} Value`}
            />
            <label className="text-center text-xs text-slate-900">{color.toUpperCase()}</label>
          </span>
        ))}

        {(["h", "s", "l"] as const).map((color) => (
          <span key={color} className="flex flex-col items-center">
            <input
              type="text"
              className={BOX}
              placeholder={color.toUpperCase()}
              aria-label={`${color.toUpperCase()} Value`}
            />
            <label className="text-center text-xs text-slate-900">{color.toUpperCase()}</label>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {(["c", "m", "y", "k"] as const).map((color) => (
          <span key={color} className="flex flex-col items-center">
            <input
              type="text"
              className={BOX}
              placeholder={color.toUpperCase()}
              aria-label={`${color.toUpperCase()} Value`}
            />
            <label className="text-center text-xs text-slate-900">{color.toUpperCase()}</label>
          </span>
        ))}
        {(["l", "c", "h"] as const).map((color) => (
          <span key={color} className="flex flex-col items-center">
            <input
              type="text"
              className={BOX}
              placeholder={color.toUpperCase()}
              aria-label={`${color.toUpperCase()} Value`}
            />
            <label className="text-center text-xs text-slate-900">{color.toUpperCase()}</label>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ColorCard;
