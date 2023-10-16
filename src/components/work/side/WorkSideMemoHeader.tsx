import CreateButton from "@/components/work/components/CreateButton";
import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import CreateMemoForm from "@/components/work/components/CreateMemoForm";
import React, { useState } from "react";

interface WorkSideMemoHeaderProps {
  showChecked: boolean;
  onToggleCheck: () => void;
}
export default function WorkSideMemoHeader({
  showChecked,
  onToggleCheck,
}: WorkSideMemoHeaderProps) {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    const handleCancel = () => setShowForm(false);

    return <CreateMemoForm onCancel={handleCancel} />;
  }

  return (
    <div className="flex-between">
      <ToggleCheckOnly checked={showChecked} onClick={onToggleCheck} />
      <CreateButton onClick={() => setShowForm(true)} />
    </div>
  );
}
