import { Checkbox } from "@chakra-ui/checkbox";

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
  title?: string;
}
export default function CheckBox({
  isChecked,
  onClick,
  title,
}: Readonly<CheckBoxProps>) {
  return (
    <button
      onClick={onClick}
      className="flex-center gap-6px text-14px font-medium"
    >
      <Checkbox
        isChecked={isChecked}
        onChange={(e) => {
          e.stopPropagation();
          onClick();
        }}
      />
      {title && <span>{title}</span>}
    </button>
  );
}
