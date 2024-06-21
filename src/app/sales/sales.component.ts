import {Component, Inject, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatOption} from "@angular/material/autocomplete";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {InvoiceService} from "../service/invoice.service";
import {NgIf} from "@angular/common";
import {DialogMessageOkComponent} from "../core/dialog-message-ok/dialog-message-ok.component";
import {Sale} from "../../shared/sale";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    MatError,
    MatLabel,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatOption,
    ReactiveFormsModule,
    MatSelect,
    MatInput,
    NgIf,
    MatDialogContent,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  vendaForm!: FormGroup;
  private dialogRef!: MatDialogRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Sale,
    private servico: InvoiceService,
    private dialog: MatDialog,
    private dialogRefCurrent: MatDialogRef<SalesComponent>
  ) {}

  ngOnInit(): void {
    this.vendaForm = this.formBuilder.group({
      id: [this.data?.id || ''],
      situation: [this.data?.situation === 'OPEN' ? '0' : this.data?.situation === 'CLOSED' ? '1' : '', Validators.required],
      salePrice: [this.data?.salePrice || '', Validators.required],
      productPrice: [this.data?.productPrice || '', Validators.required],
      product: [{ value: this.data?.product || '', disabled: false }, Validators.required],
      client: [{ value: this.data?.client || '', disabled: !!this.data?.id}, Validators.required],
      seller: [{ value: this.data?.seller || '',disabled: !!this.data?.id  }, Validators.required],
      createdDate: [this.data?.createdDate ? new Date(this.data.createdDate) : new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.vendaForm.valid) {
      if (this.vendaForm.get('id')?.value) {
        this.servico.update(this.vendaForm.value,this.vendaForm.get("id")?.value).subscribe(
          resposta => {
            this.showMessage("Item atualizado com sucesso!");
          },
          error => {
            this.showMessage("Erro ao atualizar:\n" + error.error);
          }
        );
      } else {
        this.servico.save(this.vendaForm.value).subscribe(
          resposta => {
            this.showMessage("Item salvo com sucesso!");
          },
          error => {
            this.showMessage("Erro ao salvar:\n" + error.error);
          }
        );
      }
    } else {
      console.error("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }

  private showMessage(message: string) {
    this.dialogRef = this.dialog.open(DialogMessageOkComponent, {
      minWidth: "200px",
      minHeight: "100px",
      disableClose: true,
      data: message
    });
    this.dialogRef.afterClosed().subscribe(value => {
        this.dialogRefCurrent.close();
    });
  }
}
