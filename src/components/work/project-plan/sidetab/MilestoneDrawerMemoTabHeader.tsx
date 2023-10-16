import CreateButton from "@/components/work/components/CreateButton";
import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import CreateMemoForm from "@/components/work/components/CreateMemoForm";
import React, { useState } from "react";

interface MilestoneDrawerMemoTabHeaderProps {
  showChecked: boolean;
  onToggleCheck: () => void;
}
export default function MilestoneDrawerMemoTabHeader({
  showChecked,
  onToggleCheck,
}: MilestoneDrawerMemoTabHeaderProps) {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    const handleClose = () => setShowForm(false);

    return <CreateMemoForm onClose={handleClose} />;
  }

  return (
    <div className="flex-between">
      <ToggleCheckOnly checked={showChecked} onClick={onToggleCheck} />
      <CreateButton onClick={() => setShowForm(true)} />
    </div>
  );
}
