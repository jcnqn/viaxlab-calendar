import {Injectable} from '@angular/core';
import {Task} from "./interfaces/tasks";
import {tasks} from "./helpers/data";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  tasks: Task[] = []
  constructor() {
    this.tasks = tasks
  }
}
