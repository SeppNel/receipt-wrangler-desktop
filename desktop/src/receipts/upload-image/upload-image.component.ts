import { ReadVarExpr } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_SNACKBAR_CONFIG } from 'constants';
import { DEFAULT_SNACKBAR_ACTION } from 'constants';
import { tap } from 'rxjs';
import { ReceiptImagesService } from 'src/api/receipt-images.service';
import { FormMode } from 'src/enums/form-mode.enum';
import { FileData } from 'src/models/file-data';
import { formatImageData } from '../utils/form.utils';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @Input() public images: FileData[] = [];

  @Input() public receiptId?: string = '';

  @Input() public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public acceptFileType: string = 'image/*';

  constructor(
    private activatedRoute: ActivatedRoute,
    private receiptImagesService: ReceiptImagesService,
    private snackbar: MatSnackBar
  ) {
    this.mode = this.activatedRoute.snapshot.data['mode'];
  }

  public async onFileChange(event: any): Promise<void> {
    this.mode = this.activatedRoute.snapshot.data['mode'];
    const files: File[] = Array.from(event?.target?.files ?? []);
    const acceptedFiles = files.filter((f) =>
      new RegExp(this.acceptFileType).test(f.type)
    );

    for (let i = 0; i < acceptedFiles.length; i++) {
      const reader = new FileReader();
      const f = acceptedFiles[i];

      reader.onload = () => {
        const fileData = {
          name: f.name,
          fileType: f.type,
          imageData: reader.result as string,
          size: f.size,
          receiptId: this.receiptId,
        } as FileData;

        this.handleFile(fileData);
      };

      reader.readAsBinaryString(f);
    }
  }

  private handleFile(fileData: FileData): void {
    switch (this.mode) {
      case FormMode.add:
        this.images.push(fileData);
        break;
      case FormMode.edit:
        const uploadData = formatImageData(
          fileData,
          Number.parseInt(this.receiptId ?? '')
        );
        this.receiptImagesService
          .uploadImage(uploadData)
          .pipe(
            tap(() => {
              this.snackbar.open(
                'Successfully uploaded image',
                DEFAULT_SNACKBAR_ACTION,
                DEFAULT_SNACKBAR_CONFIG
              );
              this.images.push(fileData);
            })
          )
          .subscribe();
        // we can upload each, then
        break;

      default:
        break;
    }
  }
}
