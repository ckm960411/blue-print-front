export interface EmojiType {
  id: string;
  name: string;
  native: string;
  unified: string; // unicode
  shortcodes: string;
  aliases?: string[];
  keywords?: string[];
  emoticons?: string[];
}
interface UnicodeProps {
  value: string;
  className?: HTMLDivElement["className"];
  onClick?: () => void;
}
export default function Unicode({ value, className, onClick }: UnicodeProps) {
  const emoji = String.fromCodePoint(parseInt(value, 16));
  return (
    <div onClick={onClick} className={className}>
      {emoji}
    </div>
  );
}

export const laptopEmoji: EmojiType = {
  id: "computer",
  keywords: ["computer", "technology", "screen", "display", "monitor"],
  name: "Laptop",
  native: "💻",
  shortcodes: ":computer",
  unified: "1f4bb",
};
