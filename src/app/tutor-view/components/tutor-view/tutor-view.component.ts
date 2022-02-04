import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-view',
  templateUrl: './tutor-view.component.html',
  styleUrls: ['./tutor-view.component.scss']
})
export class TutorViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(2)
  }

}
