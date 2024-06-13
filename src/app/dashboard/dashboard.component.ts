import {Component, OnInit} from '@angular/core';
import {InvoiceComponent} from "../invoice/invoice.component";
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
import {CommonModule} from "@angular/common";
import {EChartsOption} from "echarts"
import {InvoiceService} from "../service/invoice.service";
import {format} from "date-fns";
import {Sale} from "../../shared/sale";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective,
    InvoiceComponent, MatFormField, MatSelect, MatOption
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [
    provideEcharts(),
  ]
})
export class DashboardComponent implements OnInit {
  chartOption: EChartsOption | null = null;
  chartOptionLinha: EChartsOption | null = null;
  chartOptionPontos: EChartsOption | null = null;
  chartOptionPizza:EChartsOption | null= null;

  salesData: Sale[] = [];
  priceType: 'salePrice' | 'productPrice' = 'salePrice';
  personType: 'seller' | 'client' = 'client';

  constructor(private saleService: InvoiceService) { }

  ngOnInit(): void {
    this.saleService.getAll().subscribe(data => {
      this.salesData = data;
      this.updateCharts();
    });
  }

  onPriceTypeChange(event: MatSelectChange): void {
    this.priceType = event.value;
    this.updateCharts();
  }

  onPersonTypeChange(event: MatSelectChange): void {
    this.personType = event.value;
    this.updateCharts();
  }

  private updateCharts(): void {
    const months =this.salesData.map(d=>d[this.personType])
      // this.salesData.map(d => format(new Date(d.createdDate), 'MMMM/yyyy'));
    const sales = this.salesData.map(d => d[this.priceType]);

    this.chartOption = this.createChartOption('bar', months, sales);
    this.chartOptionLinha = this.createChartOption('line', months, sales);
    this.chartOptionPontos = this.createChartOption('scatter', months, sales);
    this.chartOptionPizza = this.createChartOption('pie', months, sales);
  }

  private createChartOption(type: 'pie'|'bar' | 'line' | 'scatter', months: string[], sales: number[]): EChartsOption {
    if (type=='pie'){
      return {
        series: [
          {
            name: 'Vendas (mil)',
            type: type,
            data: sales,
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            }
          }
        ]
      };
    }else {
      return {
        xAxis: {
          type: 'category',
          data: months,
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
            type: type,
            data: sales,
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            }
          }
        ]
      };
    }

  }
}
