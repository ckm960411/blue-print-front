import { Colors } from "@/utils/common/color";
import { CalendarWork } from "@/utils/services/work/[projectId]/calendar";
import { DateTime } from "@/utils/types";
import { format } from "date-fns";

const formatDate = (dateTime: DateTime) =>
  format(new Date(dateTime), "yyyy-MM-dd");

const isMilestone = (work: CalendarWork) => !!work.milestoneId;
const isRange = (work: CalendarWork) => !!(work.startAt && work.endAt);

const getBackgroundColor = (work: CalendarWork) => {
  if (!isRange(work)) return undefined;
  if (isMilestone(work)) {
    return Colors[work.color][400];
  } else {
    return Colors[work.color][50];
  }
};

const getBorderColor = (work: CalendarWork) => {
  if (!isRange(work)) return undefined;
  if (isMilestone(work)) {
    return work.priority === 5 ? Colors.red[500] : Colors[work.color][300];
  } else {
    return Colors[work.color][200];
  }
};

const getTextColor = (work: CalendarWork) => {
  if (!isRange(work)) return "#000";
  if (isMilestone(work)) {
    return "#fff";
  } else {
    return work.priority === 5 ? Colors.red[500] : "#000";
  }
};

const getEmoji = ({ unicode }: CalendarWork) => {
  const emoji = unicode ? String.fromCodePoint(parseInt(unicode, 16)) : "";
  return `${emoji} `;
};

export const convertWorkToCalendarEvent = (work: CalendarWork) => {
  const { milestoneId, taskId, title, startAt, endAt } = work;

  return {
    id: `${isMilestone(work) ? "milestone" : "task"}-${milestoneId ?? taskId}`,
    title: `${getEmoji(work)} ${title}`,
    start: isRange(work) ? formatDate(startAt) : undefined,
    end: isRange(work) ? formatDate(endAt) : undefined,
    date: isRange(work) ? undefined : formatDate(startAt),
    backgroundColor: getBackgroundColor(work),
    borderColor: getBorderColor(work),
    textColor: getTextColor(work),
    display: isRange(work) ? undefined : "list-item",
    className: "mb-4px font-bold rounded-md pl-8px py-4px cursor-pointer",
  };
};
