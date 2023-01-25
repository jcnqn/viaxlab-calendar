import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { CalendarService } from '../../calendar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-sidenav-drawer',
    templateUrl: './sidenav-drawer.component.html',
    styleUrls: ['./sidenav-drawer.component.css'],
})
export class SidenavDrawerComponent implements OnInit, OnDestroy {

    @ViewChild('drawer') drawer: ElementRef;
    @ViewChild('datePicker') datePicker: ElementRef | undefined;


    activityForm: FormGroup;
    minDate = moment.tz('2023-05-16', Intl.DateTimeFormat().resolvedOptions().timeZone).toDate();
    maxDate = moment.tz('2023-05-18 23:59', Intl.DateTimeFormat().resolvedOptions().timeZone).toDate();
    stepSecond = 1;
    formIsValid: boolean = false;
    editMode: boolean = false;
    editActivityId: number;

    notifier = new Subject();

    constructor(private formBuilder: FormBuilder, private calendarService: CalendarService) {
    }

    onDrawerToggle() {
        // @ts-ignore
        this.drawer.toggle();
    }

    ngOnInit() {
        // @ts-ignore
        this.activityForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            type: ['', [Validators.required, Validators.minLength(2)]],
            startDate: ['', []],
            endDate: ['', []],
            enableDate: [false, [Validators.required]],
            status: [null, []],
        });
        this.onChanges();
        this.calendarService.activityToEditSubject
            .pipe(takeUntil(this.notifier))
            .subscribe(act => {
                this.activityForm.patchValue({
                    title: act?.title,
                    type: act?.type,
                    startDate: act?.startDate,
                    endDate: act?.endDate,
                    enableDate: true,
                    status: act?.status,
                });
                this.editMode = !!(act);
                // @ts-ignore
                this.editActivityId = act?.activityId;
            });

    }


    onSubmit() {
        if (this.activityForm.valid) {
            if (this.editMode) {
                this.calendarService.activitiesSubject.next(
                    this.calendarService.activitiesSubject.value.map(act => {
                        if (act.activityId === this.editActivityId) {
                            return {
                                activityId: this.editActivityId,
                                title: this.activityForm.controls['title'].value,
                                type: this.activityForm.controls['type'].value,
                                startDate: (this.activityForm.controls['enableDate'].value)
                                    ? new Date(this.activityForm.controls['startDate'].value)
                                    : null,
                                endDate: (this.activityForm.controls['enableDate'].value)
                                    ? new Date(this.activityForm.controls['endDate'].value)
                                    : null,
                                status: this.activityForm.controls['status'].value,
                            };
                        }
                        return act;
                    }),
                );

            } else {
                this.calendarService.activitiesSubject.next([
                    ...this.calendarService.activitiesSubject.value,
                    {
                        activityId: this.calendarService.sortActivitiesById(this.calendarService.activitiesSubject.value)[0].activityId + 1,
                        title: this.activityForm.controls['title'].value,
                        type: this.activityForm.controls['type'].value,
                        startDate: (this.activityForm.controls['enableDate'].value)
                            ? new Date(this.activityForm.controls['startDate'].value)
                            : null,
                        endDate: (this.activityForm.controls['enableDate'].value)
                            ? new Date(this.activityForm.controls['endDate'].value)
                            : null,
                        status: null,
                    },
                ]);
            }

            this.onDrawerToggle();
            this.activityForm.reset();
        }
        this.editMode = false;
    }

    ngOnDestroy() {
        // @ts-ignore
        this.notifier.next();
        this.notifier.complete();
    }

    private onChanges() {
        // @ts-ignore
        this.activityForm.get('enableDate').valueChanges
            .pipe(takeUntil(this.notifier))
            .subscribe(enableDate => {
                if (enableDate) {
                    this.activityForm.get('endDate')?.enable();
                    this.activityForm.get('startDate')?.enable();
                } else {
                    this.activityForm.get('endDate')?.disable();
                    this.activityForm.get('startDate')?.disable();
                }
            });

        this.activityForm.valueChanges
            .pipe(takeUntil(this.notifier))
            .subscribe(() => {
                this.formIsValid = this.activityForm.valid
                    && !this.activityForm.pristine
                    && (this.activityForm.controls['startDate'].value.getTime()
                        <= this.activityForm.controls['endDate'].value.getTime())
                    && (this.activityForm.controls['startDate'].value.getDate()
                        === this.activityForm.controls['endDate'].value.getDate());
            });
    }
}
