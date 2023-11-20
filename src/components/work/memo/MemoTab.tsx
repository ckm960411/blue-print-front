import MemoSideTab from "@/components/work/memo/MemoSideTab";

export default function MemoTab() {
  return (
    <div className="flex">
      <MemoSideTab />
      <div className="grow p-16px">memo detail</div>
    </div>
  );
}
