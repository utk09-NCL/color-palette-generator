import { ROUTES } from "@/constants";

export const HEADER_BUTTONS = [
  {
    name: "Home",
    route: ROUTES.HOME,
  },
  {
    name: "Saved Palettes",
    route: ROUTES.SAVED_PALETTES,
  },
  {
    name: "Accessibility",
    route: ROUTES.ACCESSIBILITY,
  },
  {
    name: "Extract Colors",
    route: ROUTES.EXTRACT_COLORS,
  },
  {
    name: "About",
    route: ROUTES.ABOUT,
  },
] as const;
