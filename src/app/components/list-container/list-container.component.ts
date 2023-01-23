import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from "../../interfaces/Activities";
import {CalendarService} from "../../calendar.service";

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {
  @Input() title: string = '';
  @Input() date: Date | null = null
  @Output() drop = new EventEmitter<any>();

  activities: Activity[] = []

  constructor(public calendarService: CalendarService) {
  }

  ngOnInit() {
    this.calendarService.activitiesSubject.subscribe(activities =>
      this.activities = this.calendarService.filterActivitiesByDate(
        this.date?.toISOString().split('T')[0],
        activities
      )
    )
  }


  onDrop(e: any) {
    this.drop.emit(e);
  }

}
