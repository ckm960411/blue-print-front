import { parseAsBoolean, useQueryState } from "next-usequerystate";

export const useToggleMemoChecked = () => {
  const [showMemoChecked, setShowMemoChecked] = useQueryState(
    "showMemoChecked",
    parseAsBoolean,
  );

  const toggleMemoChecked = () => {
    setShowMemoChecked((prev) => (prev ? null : true));
  };

  return {
    showMemoChecked: !!showMemoChecked,
    toggleMemoChecked,
  };
};
