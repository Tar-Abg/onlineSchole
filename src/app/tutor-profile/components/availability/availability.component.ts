import {Component, Input, OnInit} from '@angular/core';
import {TutorService} from "../../services/tutor-service.service";
import {Observable} from "rxjs";
import {TutorAvailabilities} from "../../models/tutor.model";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  @Input() userId: number;
  availabilities$: Observable<TutorAvailabilities>

  constructor(
    private tutorService: TutorService
  ) { }

  ngOnInit(): void {
    this.availabilities$ = this.tutorService.getAvailabilities(this.userId);
  }



}
