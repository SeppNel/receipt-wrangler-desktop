import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FileData } from 'src/models/file-data';
import { Item } from 'src/models/item';

export function buildItemForm(item?: Item, receiptId?: string): FormGroup {
  return new FormGroup({
    name: new FormControl(item?.name ?? '', Validators.required),
    chargedToUserId: new FormControl(item?.chargedToUserId ?? '', [
      Validators.required,
    ]),
    receiptId: new FormControl(Number(item?.receiptId ?? receiptId)),
    amount: new FormControl(item?.amount ?? undefined, [
      Validators.required,
      Validators.min(1),
      itemTotalValidator(),
    ]),
    isTaxed: new FormControl(item?.isTaxed ?? false),
  });
}

function itemTotalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const epsilon = 0.01;
    const errKey = 'itemLargerThanTotal';

    const formArray = control.parent?.parent as FormArray;
    const amountControl = control?.parent?.parent?.parent;
    let receiptTotal: number = 1;
    if (amountControl) {
      const amountValue = amountControl.get('amount')?.value;
      if (amountValue !== undefined) {
        receiptTotal = Number.parseFloat(amountValue ?? '1');
      }
    }

    if (!formArray) {
      return null;
    }

    const itemControls = formArray.controls;
    const itemsAmounts: number[] = itemControls
      .map((c) => c.get('amount')?.value ?? 0)
      .map((amount: any) => Number.parseFloat(amount) ?? 1);
    const itemsTotal = itemsAmounts.reduce((a, b) => a + b);

    if (itemsTotal > receiptTotal + epsilon) {
      itemControls.forEach((c) => {
        if (c !== control) {
          c.get('amount')?.setErrors({
            [errKey]: 'Item sum cannot be larger than receipt total',
          });
        }
      });
      return { [errKey]: 'Item sum cannot be larger than receipt total' };
    } else {
      itemControls.forEach((c) => {
        if (c.get('amount')?.errors && c.get('amount')?.hasError(errKey)) {
          let newErrors = c.get('amount')?.errors ?? {};
          delete newErrors[errKey];
          c.get('amount')?.setErrors(newErrors);
        }
      });
      return null;
    }
  };
}
export function formatImageData(image: FileData, receiptId: number): any {
  return {
    ...image,
    receiptId: receiptId,
    imageData: Array.from(
      Uint8Array.from(image.imageData.split('').map((c) => c.charCodeAt(0)))
    ),
  };
}
