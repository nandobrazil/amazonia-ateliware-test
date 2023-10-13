import {Component, Input} from '@angular/core';
import {MenuItem} from "primeng/api";
import {IMenu} from "../../shared/constants/menu";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {startsWith} from "lodash";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() hideSidenav = false;
  items: MenuItem[] = IMenu;
  user = {name: 'Fernando Conde', email: 'fernando@foxitech.com.br'};

  constructor(
    private router: Router,
  ) {
    this.GetActiveRoute();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (!event?.url) return
        // this.filterService.clearFilter();
        this.items.forEach(menu => menu.styleClass = '');
        const menuRoute = this.items?.find(menu => menu?.routerLink?.startsWith(event.url))
        menuRoute ? menuRoute.styleClass = 'active' : null;
      });
  }

  GetActiveRoute() {
    this.items.forEach(menu => menu.styleClass = '');
    const menuRoute = this.items?.find(menu => menu?.routerLink?.startsWith(this.router.url))
    menuRoute ? menuRoute.styleClass = 'active' : null;
  }
}
