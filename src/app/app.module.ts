import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarGroupsComponent } from './components/calendar-groups/calendar-groups.component';
import { TitleButtonComponent } from './components/title-button/title-button.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ListContainerComponent } from './components/list-container/list-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarGroupsComponent,
    TitleButtonComponent,
    SidenavComponent,
    ListContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
