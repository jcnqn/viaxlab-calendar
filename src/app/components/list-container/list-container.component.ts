import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent {
  @Input() list: string[] = [];
  @Input() title: string = '';
  @Output() drop = new EventEmitter<any>();

  onDrop(e:any) {
    this.drop.emit(e);
  }

}
