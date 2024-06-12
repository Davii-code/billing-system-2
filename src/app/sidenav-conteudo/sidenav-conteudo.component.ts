import {Component, computed, Input, signal} from '@angular/core';
import {MatList, MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-sidenav-conteudo',
  standalone: true,
  imports: [
    MatList,
    MatNavList,
    MatIcon,
    MatListItemIcon,
    MatListItem,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidenav-conteudo.component.html',
  styleUrl: './sidenav-conteudo.component.css'
})
export class SidenavConteudoComponent {

  sidenavCollapsed = signal(false)
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value)
  }

  profilePicSize = computed(()=> this.sidenavCollapsed() ? '35' : '100')

}
