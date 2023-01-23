export interface Activity {
  activityId: number;
  title: string;
  type: string;
  startDate: Date | null;
  endDate: Date | null;
  status : string | null;
}
