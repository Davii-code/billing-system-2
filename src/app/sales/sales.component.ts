import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatOption} from "@angular/material/autocomplete";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {InvoiceService} from "../service/invoice.service";
import {NgIf} from "@angular/common";

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
    MatDialogContent
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  vendaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servico: InvoiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.vendaForm = this.formBuilder.group({
      id: [null], // O ID pode ser preenchido automaticamente ou deixado em branco, dependendo da lógica do seu aplicativo
      situation: ['', Validators.required],
      salePrice: ['', Validators.required],
      productPrice: ['', Validators.required],
      product: ['', Validators.required],
      client: ['', Validators.required],
      seller: ['', Validators.required],
      createdDate: [new Date(), Validators.required] // Definindo a data de criação como a data atual
    });
  }

  onSubmit() {
    // Verifica se o formulário é válido
    if (this.vendaForm.valid) {
      let salePrice = this.vendaForm.get("salePrice")?.value;
      salePrice = salePrice.replace(/^R\$/i, '');
      this.vendaForm.get("salePrice")?.setValue(salePrice);

      let productPrice = this.vendaForm.get("productPrice")?.value;
      productPrice = productPrice.replace(/^R\$/i, '');
      this.vendaForm.get("productPrice")?.setValue(productPrice)

      this.servico.save(this.vendaForm.value).subscribe(
        resposta => {
          console.log(resposta);
        },
        error => {
          console.log(error)
        }
      );
    } else {
      console.error("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }

  resetForm() {
    this.vendaForm.reset({
      id: null,
      situation: '',
      salePrice: null,
      productPrice: null,
      product: '',
      client: '',
      seller: '',
      createdDate: new Date()
    });

    // Remover manualmente os erros de validação
    for (const control in this.vendaForm.controls) {
      if (this.vendaForm.controls.hasOwnProperty(control)) {
        this.vendaForm.controls[control].setErrors(null);
      }
    }
  }
}
