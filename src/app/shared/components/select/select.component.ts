import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ViewChild, ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import {KeyValuePair} from "../../models/keyValuePair.model";

// import { ListInterface } from '../../models/Collateral.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() list: any[] | null = [];
  @Input() label: string = '';
  @Input() error: boolean = false;
  @Input() disable = false;
  @Input() keyName: string = 'description';
  @Input() set value(val: number | string) {
    this.matSelect.value = val;
  }

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  onChanged: any = () => {};
  onTouched: any = () => {};

  // @ts-ignore
  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;

  selectionChanged(event: MatSelectChange) {
    this.selectionChange.emit(
      new MatSelectChange(this.matSelect, event.value)
    );
    this.onChanged(event.value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;

  }
}
