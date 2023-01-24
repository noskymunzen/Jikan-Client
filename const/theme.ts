import { ThemeTypings } from "@chakra-ui/react";
import { GenreName } from "../types/anime";

export const GenreColors: Record<GenreName, ThemeTypings["colorSchemes"]> = {
  [GenreName.ROMANCE]: "red",
  [GenreName.SLICE_OF_LIFE]: "green",
  [GenreName.ADVENTURE]: "yellow",
  [GenreName.DRAMA]: "teal",
  [GenreName.COMEDY]: "pink",
  [GenreName.SPORT]: "telegram",
  [GenreName.SCI_FI]: "purple",
  [GenreName.ACTION]: "orange",
  [GenreName.MYSTERY]: "whatsapp",
  [GenreName.SUSPENSE]: "gray",
  [GenreName.SUPERNATURAL]: "cyan",
}
