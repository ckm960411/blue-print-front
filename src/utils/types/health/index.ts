import { DateTime } from "@/utils/types";

export interface Exercise {
  id: number;
  description: string;
  count: number;
  date: DateTime;
  exerciseTypeId: number;
  name: string;
  unit: string;
}
