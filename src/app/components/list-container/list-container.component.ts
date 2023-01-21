import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../interfaces/tasks";
import {tasks} from "../../helpers/data";

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit{
  @Input() tasks: Task[] = [];
  @Input() title: string = '';
  @Input() date: Date | null = null
  @Output() drop = new EventEmitter<any>();

  filteredTasks: Task[] = []

  ngOnInit() {
    this.filteredTasks = tasks.filter(t => t.date?.getDay() === this.date?.getDay())
  }


  onDrop(e:any) {
    this.drop.emit(e);
  }

}
