import { useToggleMemoChecked } from "@/utils/hooks/work/memo/useToggleMemoChecked";
import React, { useState } from "react";

import { Milestone } from "@/utils/types/milestone";
import CreateButton from "@/components/work/components/CreateButton";
import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import CreateMemoForm from "@/components/work/components/CreateMemoForm";

interface MilestoneDrawerMemoTabHeaderProps {
  milestone: Milestone;
}
export default function MilestoneDetailMemoTabHeader({
  milestone,
}: Readonly<MilestoneDrawerMemoTabHeaderProps>) {
  const [showForm, setShowForm] = useState(false);
  const { showMemoChecked, toggleMemoChecked } = useToggleMemoChecked();

  const handleClose = () => setShowForm(false);

  return (
    <>
      {showForm ? (
        <CreateMemoForm milestoneId={milestone.id} onClose={handleClose} />
      ) : (
        <div className="flex-between">
          <ToggleCheckOnly
            checked={showMemoChecked}
            onClick={toggleMemoChecked}
          />
          <CreateButton onClick={() => setShowForm(true)} />
        </div>
      )}
    </>
  );
}
