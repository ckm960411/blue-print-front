export interface CreateExerciseReqDto {
  exerciseTypeId: number;
  date: Date;
  count: number;
  description?: string;
}
