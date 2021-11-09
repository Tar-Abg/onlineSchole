import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoadingService} from "./shared/services/loading/loading.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private loadingService: LoadingService
  ) {

  }


  ngOnInit(): void {
    this.isLoading$ = this.loadingService.loadingSub;
  }


}
