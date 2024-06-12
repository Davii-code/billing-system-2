import { Routes } from '@angular/router';
import {InvoiceComponent} from "./invoice/invoice.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AnalyticsComponent} from "./analytics/analytics.component";

export const routes: Routes = [{path:'',redirectTo:'invoice',pathMatch:"full"},
  {path:'invoice', component:InvoiceComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'analytics',component:AnalyticsComponent},
];
