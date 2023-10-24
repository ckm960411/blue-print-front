import { Project } from "@/utils/types/project";
import { atom } from "recoil";

export const sideBarOpenState = atom({
  key: "sideBarOpen",
  default: true,
});

export const imageDetailsState = atom<string[] | null>({
  key: "imageDetails",
  default: null,
});

export const projectState = atom<Project | undefined>({
  key: "project",
  default: undefined,
});
