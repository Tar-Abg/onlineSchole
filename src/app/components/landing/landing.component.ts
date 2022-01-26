import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToSearchTutor(): void {
    this.router.navigate(['searchTutor']);
  }
}
