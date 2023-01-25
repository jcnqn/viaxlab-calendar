import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Activity } from '../../interfaces/Activities';
import { CalendarService } from '../../calendar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit, OnDestroy {
    @Input() title: string = '';
    @Input() date: Date | null = null;
    @Output() drop = new EventEmitter<any>();
    @Output() drawerToggle = new EventEmitter<any>();

    activities: Activity[] = [];
    notifier = new Subject();

    constructor(public calendarService: CalendarService) {
    }

    ngOnInit() {
        this.calendarService.activitiesSubject
            .pipe(takeUntil(this.notifier))
            .subscribe(activities => {
                this.activities = this.calendarService.filterActivitiesByDate(this.date?.toISOString().split('T')[0], this.calendarService.sortActivitiesByDate(activities));
            });
    }

    onDrop(e: any) {
        this.drop.emit(e);
        const activityIdToChange = e.container.data[e.currentIndex].activityId;
        // @ts-ignore
        const newActivities: Activity[] = this.calendarService.activitiesSubject.value.map((act) => {
            if (act.activityId === activityIdToChange && act.startDate && act.endDate && this.date) {
                act.startDate.setDate(e.container.data[0].startDate?.getDate());
                act.endDate.setDate(e.container.data[0].startDate?.getDate());
                return {
                    ...act, startDate: act.startDate, endDate: act.endDate,
                };
            }
            return act;
        });
        this.calendarService.activitiesSubject.next(newActivities);
    }

    setStatus(stat: string | null) {
        switch (stat) {
            case 'DONE':
                return 'DONE';
            case 'IN_PROGRESS':
                return 'IN PROGRESS';
            default:
                return null;
        }
    }

    differenceActivities = (arr1: [], arr2: []) => {
        return arr1.filter(act => arr2.indexOf(act) === -1);
    };

    onDrawerToggle(e: any, activity: Activity) {
        this.calendarService.activityToEditSubject.next(activity);
        this.drawerToggle?.emit(e);
    }

    onDeleteActivity(activityId: number) {
        this.calendarService.activitiesSubject.next(this.calendarService.activitiesSubject.value.filter(act => act.activityId !== activityId));
    }

    ngOnDestroy() {
        // @ts-ignore
        this.notifier.next();
        this.notifier.complete();
    }
}
