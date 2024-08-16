import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-message-ok',
  standalone: true,
  imports: [],
  templateUrl: './dialog-message-ok.component.html',
  styleUrl: './dialog-message-ok.component.css'
})
export class DialogMessageOkComponent {
  public message : string;
  constructor(
    private dialogRef: MatDialogRef<DialogMessageOkComponent>,
    @Inject(MAT_DIALOG_DATA) data: string)
  {
    this.message = data;
    this.message = this.message.replace("\n","<br\>\n");
  }

  ok() {
    this.dialogRef.close();
  }
}
