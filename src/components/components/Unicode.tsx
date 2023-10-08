interface UnicodeProps {
  value: string;
}
export default function Unicode({ value }: UnicodeProps) {
  const emoji = String.fromCodePoint(parseInt(value, 16));
  return <div>{emoji}</div>;
}
