import {Component, computed, signal} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterOutlet} from "@angular/router";
import {SidenavConteudoComponent} from "../sidenav-conteudo/sidenav-conteudo.component";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatToolbar,
    MatIconButton,
    MatIcon,
    RouterOutlet,
    SidenavConteudoComponent
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  collapsed=signal(false);

  sidenavWidth = computed(()=>this.collapsed() ? '65px':'250px')
}
