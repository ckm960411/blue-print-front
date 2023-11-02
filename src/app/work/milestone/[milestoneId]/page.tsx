interface MilestonePageProps {
  params: { milestoneId: number };
}
export default function MilestonePage({
  params: { milestoneId },
}: MilestonePageProps) {
  return <div>MilestonePage: {milestoneId}</div>;
}
