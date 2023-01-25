import {Injectable, OnDestroy} from '@angular/core';
import {Activity} from "./interfaces/Activities";
import {activities} from "./helpers/data";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService implements OnDestroy {
  activitiesSubject = new BehaviorSubject<Activity[]>([])
  activityToEditSubject = new BehaviorSubject<Activity | null>(null)
  notifier = new Subject()

  constructor() {
    if (localStorage.getItem('activities')) {
      // @ts-ignore
      this.activitiesSubject.next(this.sortActivitiesByDate(this.fixDates(JSON.parse(localStorage.getItem('activities')))))
    } else {
      this.activitiesSubject.next(this.sortActivitiesByDate(activities))
    }

    this.activitiesSubject
      .pipe(takeUntil(this.notifier))
      .subscribe(activities => {
        localStorage.setItem('activities', JSON.stringify(activities))
      })
  }

  sortActivitiesByDate(activities: Activity[]) {
    // @ts-ignore
    return activities.sort((a,b) => a.startDate - b.startDate);
  }

  sortActivitiesById(activities: Activity[]) {
    return activities.sort(
      (a1, a2) => (a1.activityId && a2.activityId && a1.activityId < a2.activityId) ? 1
        : (a1.activityId && a2.activityId && a1.activityId > a2.activityId) ? -1 : 0);
  }

  filterActivitiesByDate(dateString: string | undefined, activities: Activity[]) {
    return activities.filter(t => t.startDate?.toISOString().split('T')[0]
      === dateString)
  }

  fixDates(activities: any[]) {
    return activities.map(act => ({
        ...act,
        startDate: (act.startDate) ? new Date(act.startDate) : null,
        endDate: (act.endDate) ? new Date(act.endDate) : null,
      })
    )
  }

  ngOnDestroy() {
    // @ts-ignore
    this.notifier.next()
    this.notifier.complete()
  }
}
