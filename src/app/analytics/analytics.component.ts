import {Component, OnInit} from '@angular/core';
import {InvoiceComponent} from "../invoice/invoice.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {EChartsOption} from "echarts";
import {Sale} from "../../shared/sale";
import {InvoiceService} from "../service/invoice.service";
import {format} from "date-fns";
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
import {SaleDateRange} from "../../shared/SaleDateRange";
import {NgIf} from "@angular/common";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    InvoiceComponent,
    MatCardContent,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    NgxEchartsDirective,
    NgIf,
    MatLabel,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect
  ],
  providers: [
    provideEcharts(),
    provideNativeDateAdapter()
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{
  chartOptionLinha: EChartsOption | null = null;
  selectedPeriod = '1';
  dateRange = {
    initialDate: new Date(),
    finalDate: new Date()
  };
  clienteData: any = null;
  produtoData: any = null;
  vendedorData: any = null;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.setInitialDateRange();
    this.updateLineChart();
    this.getClienteTotal();
    this.getProdutoTotal()
    this.getVendedorTotal()
  }

  setInitialDateRange(): void {
    this.updateDateRange();
  }

  applyPeriodFilter(): void {
    this.updateDateRange();
    this.updateLineChart();
  }

  updateDateRange(): void {
    const endDate = new Date();
    let startDate = new Date();

    switch (this.selectedPeriod) {
      case '1':
        startDate.setMonth(endDate.getMonth() - 1); // Último mês
        break;
      case '2':
        startDate.setMonth(endDate.getMonth() - 2); // Últimos dois meses
        break;
      case '3':
        startDate.setMonth(endDate.getMonth() - 3); // Últimos três meses
        break;
    }

    this.dateRange = {
      initialDate: startDate,
      finalDate: endDate
    };
  }

  private updateLineChart(): void {
    const { initialDate, finalDate } = this.dateRange;
    const formattedInitialDate = format(initialDate, 'yyyy-MM-dd');
    const formattedFinalDate = format(finalDate, 'yyyy-MM-dd');

    this.invoiceService.getTotalSalesPrice(formattedInitialDate, formattedFinalDate).subscribe(
      data => {
        const dates = data.map(d => format(new Date(d[0]), 'dd/MM/yyyy'));
        const sales = data.map(d => d[1]);
        this.chartOptionLinha = {
          xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
              rotate: 45,
              interval: 0
            }
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'Vendas (mil)',
              type: 'line',
              data: sales,
              label: {
                show: true,
                position: 'top',
                formatter: '{c}'
              }
            }
          ]
        };
      },
      error => {
        console.error('Erro ao obter os dados de vendas:', error);
      }
    );
  }

  getClienteTotal() {
    this.invoiceService.getClienteTotal().subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.clienteData = data[0];
        }
      },
      (error) => {
        console.error('Erro ao obter dados do cliente:', error);
      }
    );
  }


  getProdutoTotal() {
    this.invoiceService.getProdutoTotal().subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.produtoData = data[0]; // Pegando o primeiro produto com maior valor
        }
      },
      (error) => {
        console.error('Erro ao obter dados do produto:', error);
      }
    );
  }

  getVendedorTotal() {
    this.invoiceService.getVendedorTotal().subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          this.vendedorData = data[0]; // Pegando o primeiro vendedor com maior valor
        }
      },
      (error) => {
        console.error('Erro ao obter dados do vendedor:', error);
      }
    );
  }
}
