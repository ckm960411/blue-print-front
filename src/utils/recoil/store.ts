import { atom } from "recoil";

export const sideBarOpenState = atom({
  key: "sideBarOpen",
  default: true,
});

export const imageDetailsState = atom<string[] | null>({
  key: "imageDetails",
  default: null,
});
