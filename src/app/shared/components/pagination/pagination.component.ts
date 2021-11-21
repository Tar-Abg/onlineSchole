import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pageCount: number;
  @Input() currentPage: number | null;
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  changePage(number: number) {
    if (number > 0 && number <= this.pageCount) {
      this.onChangePage.emit(number);
    }
  }
}
