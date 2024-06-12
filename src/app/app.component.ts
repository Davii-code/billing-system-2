import {Component, computed, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {SidenavConteudoComponent} from "./sidenav-conteudo/sidenav-conteudo.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, MatIcon, MatIconButton, MatSidenav, MatSidenavContainer, MatSidenavContent, MatToolbar, SidenavConteudoComponent,
      MatSidenavContainer,
      MatSidenav,
      MatSidenavContent,
      MatToolbar,
      MatIconButton,
      MatIcon,
      RouterOutlet,
      SidenavConteudoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'billing-system-angula';

  collapsed=signal(false);

  sidenavWidth = computed(()=>this.collapsed() ? '65px':'250px')
}
