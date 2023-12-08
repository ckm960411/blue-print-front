import { meState } from "@/utils/recoil/store";
import { useRecoilValue } from "recoil";

export const useMe = () => {
  const me = useRecoilValue(meState);
  return me;
};
