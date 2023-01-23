import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Activity} from "../../interfaces/Activities";
import {CalendarService} from "../../calendar.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() date: Date | null = null
  @Output() drop = new EventEmitter<any>();

  activities: Activity[] = []
  notifier = new Subject()

  constructor(public calendarService: CalendarService) {
  }

  ngOnInit() {
    this.calendarService.activitiesSubject
      .pipe(takeUntil(this.notifier))
      .subscribe(activities =>
      this.activities = this.calendarService.filterActivitiesByDate(
        this.date?.toISOString().split('T')[0],
        activities
      )
    )
  }

  onDrop(e: any) {
    this.drop.emit(e);
  }

  ngOnDestroy() {
    // @ts-ignore
    this.notifier.next()
    this.notifier.complete()
  }

}
