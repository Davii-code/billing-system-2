import { Component } from '@angular/core';
import {InvoiceComponent} from "../invoice/invoice.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {EChartsOption} from "echarts";
import {Sale} from "../../shared/sale";
import {InvoiceService} from "../service/invoice.service";
import {format} from "date-fns";
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
import {SaleDateRange} from "../../shared/SaleDateRange";
import {NgIf} from "@angular/common";

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
    NgIf
  ],
  providers: [
    provideEcharts(),
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  chartOptionLinha: EChartsOption | null = null;
  dateRange = {
    initialDate: '2024-01-01',
    finalDate: '2024-06-16'
  };
  clienteData: any = null;
  produtoData: any = null;
  vendedorData: any = null;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.updateLineChart();
    this.getClienteTotal();
    this.getProdutoTotal()
    this.getVendedorTotal()
  }

  private updateLineChart(): void {
    const { initialDate, finalDate } = this.dateRange;
    this.invoiceService.getTotalSalesPrice(initialDate, finalDate).subscribe(
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
