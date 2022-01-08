import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  activeTab: "PROFILE" | "START_LESSON" | "MESSAGES"  | "PAYMENTS" | "LESSON_HISTORY"  | "FIND_TUTOR" = "PROFILE";

  constructor() {
  }

  ngOnInit(): void {
  }

}
