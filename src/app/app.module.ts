import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from "./material.module";

import {AppComponent} from './app.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {CalendarGroupsComponent} from './components/calendar-groups/calendar-groups.component';
import {ListContainerComponent} from './components/list-container/list-container.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {TitleButtonComponent} from './components/title-button/title-button.component';
import {SidenavDrawerComponent} from "./components/sidenav-drawer/sidenav-drawer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarGroupsComponent,
    ListContainerComponent,
    SidenavComponent,
    TitleButtonComponent,
    SidenavDrawerComponent,
  ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
