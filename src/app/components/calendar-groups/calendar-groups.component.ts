import { Component } from '@angular/core';
import {CalendarService} from "../../pages/calendar.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-calendar-groups',
  templateUrl: './calendar-groups.component.html',
  styleUrls: ['./calendar-groups.component.css']
})
export class CalendarGroupsComponent {
  constructor(public calendarService: CalendarService) {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
