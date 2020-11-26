import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  urlAtual;
  exibirFooter: boolean = true;

  constructor(private router: Router,
              private location: Location) { 

    this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) { 
            if(location.path().includes('login') || location.path().includes('pagamento')){
              this.exibirFooter = false;
              console.log('exibirFooter= '+ this.exibirFooter);
            } else {
              this.exibirFooter = true;
            }
        }
    });
  }

  ngOnInit() {
    this.urlAtual = this.location.path();
  }


}
