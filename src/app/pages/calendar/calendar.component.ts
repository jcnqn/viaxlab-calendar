import {Component, ViewChild} from '@angular/core';
import {SidenavDrawerComponent} from "../../components/sidenav-drawer/sidenav-drawer.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

@ViewChild(SidenavDrawerComponent) sidenavDrawer: SidenavDrawerComponent | undefined

  onDrawerToggle(e: any) {
    // @ts-ignore
    this.sidenavDrawer?.drawer.toggle()
  }
}
