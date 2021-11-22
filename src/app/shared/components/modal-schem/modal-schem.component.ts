import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-schem',
  templateUrl: './modal-schem.component.html',
  styleUrls: ['./modal-schem.component.scss']
})
export class ModalSchemComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string;
  @Input() isShowBack: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
