import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = "AnguCD";
  
  @ViewChild("routeAccueil") routeAccueil!: ElementRef;
  @ViewChild("routeCatalogue") routeCatalogue!: ElementRef;
  @ViewChild("routeAjouter") routeAjouter!: ElementRef;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.switchSelectedTab(event.url);
      }
    });
  }

  switchSelectedTab(routeUrl: string) {
    const routes = [this.routeAccueil, this.routeCatalogue, this.routeAjouter];
    for (const route of routes) {
      if (route.nativeElement.getAttribute("routerlink") === routeUrl) {
        route.nativeElement.classList.add("link-secondary");
      } else {
        route.nativeElement.classList.remove("link-secondary");
      }
    }
  }
}
