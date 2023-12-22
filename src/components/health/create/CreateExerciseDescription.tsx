interface CreateExerciseDescriptionProps {
  description: string;
  onChange: React.ComponentProps<"textarea">["onChange"];
}
export default function CreateExerciseDescription({
  description,
  onChange,
}: Readonly<CreateExerciseDescriptionProps>) {
  return (
    <textarea
      value={description}
      onChange={onChange}
      placeholder="오늘 운동은 어땠나요?"
      className="rounded-md border border-gray-200 p-16px text-14px leading-[150%] outline-0 duration-200 focus:border-main"
      rows={4}
    />
  );
}
