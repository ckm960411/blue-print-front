import { WorkTab } from "@/app/work/page";
import { Dispatch, SetStateAction } from "react";

interface WorkTabMenuProps {
  workTab: WorkTab;
  setWorkTab: Dispatch<SetStateAction<WorkTab>>;
}
export default function WorkTabMenu({ workTab, setWorkTab }: WorkTabMenuProps) {
  return <div>WorkTabMenu</div>;
}
