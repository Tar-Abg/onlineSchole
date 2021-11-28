import {Component, Input, OnInit} from '@angular/core';
import {TutorRatings} from "../../models/tutor.model";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  @Input() ratings: any;

  constructor() { }

  ngOnInit(): void {
  }

}
