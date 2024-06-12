import { Component } from '@angular/core';
import {InvoiceComponent} from "../invoice/invoice.component";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    InvoiceComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

}
