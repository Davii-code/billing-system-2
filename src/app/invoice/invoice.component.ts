import {Component, computed, signal, ViewChild} from '@angular/core';
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
import {MatDialog} from "@angular/material/dialog";
import {InvoiceService} from "../service/invoice.service";
import {CurrencyPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {SalesComponent} from "../sales/sales.component";


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
export class InvoiceComponent {

  sale: Sale[] = [];
  displayedColumns: string[] = ['id', 'client', 'product', 'salePrice', 'seller', 'situation', 'productPrice', 'actions'];
  dataSource: MatTableDataSource<Sale>;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servico: InvoiceService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Sale>();
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.servico.getAll().subscribe((valor) => {
      this.sale = valor;
      this.dataSource.data = this.sale;
      this.dataSource.paginator = this.paginator; // Configura o paginador
      this.length = this.sale.length; // Atualiza o comprimento real dos dados
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applySituationFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filterPredicate = (data: Sale, filter: string) => {
      return filter === '' || data.situation === filter;
    };

    this.dataSource.filter = filterValue;
  }

  openDialog() {
    const dialogRef = this.dialog.open(SalesComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarDados();
    });
  }
}
