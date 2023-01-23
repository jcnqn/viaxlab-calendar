import {Injectable} from '@angular/core';
import {Activity} from "./interfaces/Activities";
import {activities} from "./helpers/data";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  activitiesSubject = new BehaviorSubject<Activity[]>([])
  sortedActivities: Activity[] = []

  constructor() {
    this.activitiesSubject.next(this.sortActivities(activities))
  }

  sortActivities(activities: Activity[]) {
    return activities.sort(
      (a1, a2) => (a1.startDate && a2.startDate && a1.startDate < a2.startDate) ? -1
        : (a1.startDate && a2.startDate && a1.startDate > a2.startDate) ? 1 : 0);
  }

  filterActivitiesByDate(dateString: string | undefined, activities: Activity[]){
    return activities.filter(t => t.startDate?.toISOString().split('T')[0]
      === dateString)
  }
}
