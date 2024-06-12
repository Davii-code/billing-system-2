import { Component } from '@angular/core';
import {InvoiceComponent} from "../invoice/invoice.component";
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
import {CommonModule} from "@angular/common";
import {EChartsOption} from "echarts"

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective,
    InvoiceComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [
    provideEcharts(),
  ]
})
export class DashboardComponent {
    chartOption: EChartsOption={
      xAxis:{
        type: 'category',
        data: ["Janeiro/2024","Fevereiro/2024","Março/2024"],
        axisLabel:{
          rotate:45,
          interval:0
        }
      },
      yAxis:{
        type:'value',
      },
      series:[
        {
          name:'Vendas (mil)',
          type:'bar',
          data: [30,20,78],
          label: {
            show:true,
            position:'top',
            formatter:'{c}'
          }
        }
      ]
    }

  chartOptionLinha: EChartsOption={
    xAxis:{
      type: 'category',
      data: ["Janeiro/2024","Fevereiro/2024","Março/2024"],
      axisLabel:{
        rotate:45,
        interval:0
      }
    },
    yAxis:{
      type:'value',
    },
    series:[
      {
        name:'Vendas (mil)',
        type:'line',
        data: [30,20,78],
        label: {
          show:true,
          position:'top',
          formatter:'{c}'
        }
      }
    ]
  }

  chartOptionPontos: EChartsOption={
    xAxis:{
      type: 'category',
      data: ["Janeiro/2024","Fevereiro/2024","Março/2024"],
      axisLabel:{
        rotate:45,
        interval:0
      }
    },
    yAxis:{
      type:'value',
    },
    series:[
      {
        name:'Vendas (mil)',
        type:'scatter',
        data: [30,20,78],
        label: {
          show:true,
          position:'top',
          formatter:'{c}'
        }
      }
    ]
  }

  chartOptionPizza: EChartsOption={
    series:[
      {
        name:'Vendas (mil)',
        type:'pie',
        data: [{value:30},{value:20},{value:78}],
        label: {
          show:true,
          position:'top',
          formatter:'{c} mil'
        }
      }
    ]
  }


}


