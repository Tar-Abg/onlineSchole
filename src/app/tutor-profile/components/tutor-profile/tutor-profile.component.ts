import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss']
})
export class TutorProfileComponent implements OnInit {
  activeTab: "availability" | "calendar" | "ratings" | "reviews" | "subjects";

  constructor() { }

  ngOnInit(): void {
  }

}
