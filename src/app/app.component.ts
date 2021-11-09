import {Component, OnInit} from '@angular/core';
import {LoadingService} from "./shared/services/loading/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService
  ) {

  }


  ngOnInit(): void {
    this.loadingService.loadingSub.subscribe((val) => {
      if (val) {
        this.isLoading = val;
      }
    });
  }


}
