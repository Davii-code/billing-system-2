import {Component, computed, OnInit, signal, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {Sale} from "../../shared/sale";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InvoiceService} from "../service/invoice.service";
import {CurrencyPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {SalesComponent} from "../sales/sales.component";
import {DialogMessageOkComponent} from "../core/dialog-message-ok/dialog-message-ok.component";


@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatIcon,
    MatPaginator,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatColumnDef,
    MatTable,
    MatInput,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIconButton,
    MatButton,
    MatSelect,
    MatOption,
    MatFormField

  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  sale: Sale[] = [];
  displayedColumns: string[] = ['id', 'client', 'product', 'salePrice', 'seller', 'situation', 'productPrice', 'actions'];
  dataSource: MatTableDataSource<Sale>;
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  private dialogRef!: MatDialogRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servico: InvoiceService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Sale>();
  }

  ngOnInit() {
    this.recarregar()
  }


  recarregar() {
    this.sale = [];
    this.dataSource.data = [];
    this.servico.getAll().subscribe((valor) => {
      this.sale = valor;
      this.dataSource.data = this.sale;
      this.dataSource.paginator = this.paginator;
      this.length = this.sale.length;
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applySituationFilter(event: any) {
    const filterValue = event.value;
    this.dataSource.filterPredicate = (data: Sale, filter: string) => {
      return filter === '' || data.situation === filter;
    };
    this.dataSource.filter = filterValue;
  }

  executeDelete(sale1: Sale) {
    this.servico.delete(sale1.id).subscribe({
      next: value => {
        this.showMessage("Excluído com sucesso!!!");
        this.refresh(sale1);
      },
      error: error => {
        this.showMessage(`Erro ao excluir!!: ${error.error}`);
      }
    });
  }

  refresh(sale1: Sale) {
    const saleIndex = this.sale.findIndex((value) => value.id === sale1.id);
    if (saleIndex >= 0) {
      this.sale.splice(saleIndex, 1);
      this.dataSource.data = [...this.sale];
      this.length = this.sale.length;
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
      console.log("Botão fechar acionado");
    });
  }

  openDialogAdicionar() {
    const dialogRef = this.dialog.open(SalesComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.recarregar();
    });
  }

  openDialogEditar(sale:Sale) {
    const dialogRef = this.dialog.open(SalesComponent, {
      width: '700px',
      data: sale
    });

    dialogRef.afterClosed().subscribe(result => {
      this.recarregar();
    });
  }
}
