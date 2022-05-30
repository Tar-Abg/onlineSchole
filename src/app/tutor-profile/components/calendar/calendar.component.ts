import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TutorService} from "../../services/tutor-service.service";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {filter, tap} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {DaysOfWeek, HoursOfDay} from "../../../shared/models/infos.model";
import {SelectedDay} from "../../models/tutor.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  tutorPaymentExistence$: Observable<boolean>;
  @Output() onAddLesson: EventEmitter<void> = new EventEmitter<void>();
  private userId: number;
  form: FormGroup;
  daysOfWeek$: Observable<DaysOfWeek[]>;
  hoursOfDay$: Observable<HoursOfDay[]>;
  selectedDays$: Observable<SelectedDay[]>;
  schedule: any[] = [];

  constructor(
    private tutorService: TutorService,
    private infoService: InfosService,
    private storageService: StorageService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.storageService.getUserId();
    this.getSchedule();
    this.tutorPaymentExistence$ = this.infoService.tutorPaymentExistence(this.userId);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      date: [new Date().toISOString()],
      endDate: [null],
    });
    this.form.get('endDate')?.disable();
    this.setSecondDate();
  }

  getSchedule(): void {
    this.makeSubscriptions();
    combineLatest([this.daysOfWeek$, this.hoursOfDay$, this.selectedDays$]).pipe(
      filter(([daysOfWeek, hoursOfDay, selectedDays]) => !!daysOfWeek && !!hoursOfDay && !!selectedDays ),
      tap(([daysOfWeek, hoursOfDay, selectedDays]) => {
        hoursOfDay.forEach((hours, index: number) => {
          this.schedule[index] = {
            hour: hours,
            week: []
          };
          daysOfWeek.forEach((day) => {
            const thisSelectedDay = selectedDays.find(selectedDay => selectedDay.dayId === day.id && selectedDay.hourId === hours.id)
            this.schedule[index].week.push({hoursId: hours.id, dayId: day.id, thisSelectedDay: thisSelectedDay})
          })
        })
      })
    ).subscribe();
  }

  makeSubscriptions(): void {
    this.daysOfWeek$ = this.infoService.getDaysOfWeekForCalendar( new Date(this.form.value?.date).toISOString());
    this.hoursOfDay$ = this.infoService.getHoursOfDay();
    this.selectedDays$ = this.form?.value.date && this.tutorService.getCalendar(this.userId, new Date(this.form.value?.date).toISOString());
  }

  setSecondDate(): void {
    const startDate = new Date(this.form.get('date')?.value);
    let secondDateDay = startDate.getDate();
    secondDateDay = secondDateDay+7;
    const secondDate = startDate.setDate(secondDateDay);
    this.form.get('endDate')?.setValue(new Date(secondDate).toISOString());
  }
}
