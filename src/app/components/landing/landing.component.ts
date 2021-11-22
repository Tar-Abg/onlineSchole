import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isOpenLogin: boolean;
  isOpenResetPassword: boolean;
  isOpenChangePassword: boolean;
  isOpenMessageModal: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
