import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomlete',
  templateUrl: './autocomlete.component.html',
  styleUrls: ['./autocomlete.component.scss'],
})
export class AutocomleteComponent implements OnInit {
  @Input() public label: string = '';

  @Input() public inputFormControl: FormControl = new FormControl();

  @Input() public options: any[] = [];

  @Input() public optionTemplate!: TemplateRef<any>;

  @Input() public optionChipTemplate!: TemplateRef<any>;

  @Input() public optionFilterKey: string = '';

  @Input() public optionValueKey: string = '';

  @Input() public multiple: boolean = false;

  @Input() public displayWith!: (value: any) => string;

  @Input() public creatable: boolean = false;

  @Input() public defaultCreatableObject: any = {};

  @Input() public creatableValueKey: string = '';

  public filteredOptions: Observable<any[]> = of([]);

  public filterFormControl: FormControl = new FormControl('');

  public creatableOptionId = (Math.random() + 1).toString(36).substring(7);

  public duplicateValuesFound: any[] = [];

  public ngOnInit(): void {
    this.filteredOptions = this.filterFormControl.valueChanges.pipe(
      startWith(this.filterFormControl.value),
      map((value) => {
        return this._filter(value);
      })
    );

    if (!this.multiple) {
      this.initSingleAutocomplete();
    }
  }

  private initSingleAutocomplete(): void {
    this.filterFormControl.setValue(this.inputFormControl.value);
  }

  private _filter(value: string): string[] {
    value = value ?? '';
    const filterValue = value.toString()?.toLowerCase();

    if (this.multiple) {
      const formArray = this.inputFormControl as any as FormArray;
      const selectedValues = formArray.value as any[];
      // TODO: Restrict the user form adding an already added value

      return this.options
        .filter((o) => !selectedValues.includes(o))
        .filter((option) =>
          option[this.optionFilterKey].toLowerCase().includes(filterValue)
        );
    } else {
      return this.options.filter((option) =>
        option[this.optionFilterKey].toLowerCase().includes(filterValue)
      );
    }
  }

  public optionSelected(event: MatAutocompleteSelectedEvent): void {
    if (this.multiple) {
      const customOptionSelected = event.option.id === this.creatableOptionId;
      const formArray = this.inputFormControl as any as FormArray;

      if (customOptionSelected && !this.optionValueKey) {
        formArray.push(
          new FormControl({
            ...this.defaultCreatableObject,
            [this.creatableValueKey]: this.filterFormControl.value,
          })
        );
      } else if (customOptionSelected && this.optionValueKey) {
        // TODO: not sure if this works
        formArray.push(new FormControl(this.filterFormControl.value));
      } else {
        (this.inputFormControl as any as FormArray).push(
          new FormControl(event.option.value)
        );
      }
      // TODO: set as null
    } else {
      this.inputFormControl.setValue(event.option.value);
    }
  }

  public removeOption(index: number) {
    if (this.multiple) {
      const formArray = this.inputFormControl as any as FormArray;
      formArray.removeAt(index);
    }
  }
}
