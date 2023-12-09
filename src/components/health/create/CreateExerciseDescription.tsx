import { useState } from "react";

interface CreateExerciseDescriptionProps {}
export default function CreateExerciseDescription({}: Readonly<CreateExerciseDescriptionProps>) {
  const [description, setDescription] = useState("");

  return (
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="오늘 운동은 어땠나요?"
      className="rounded-md border border-gray-200 p-16px text-14px leading-[150%] outline-0 duration-200 focus:border-main"
      rows={4}
    />
  );
}
