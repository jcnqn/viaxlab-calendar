import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-title-button',
  templateUrl: './title-button.component.html',
  styleUrls: ['./title-button.component.css']
})
export class TitleButtonComponent {
  @Output() drawerToggle = new EventEmitter<any>();

  onDrawerToggle(e: any) {
    this.drawerToggle?.emit(e)
  }
}
