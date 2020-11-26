import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  produtos;
  responsiveOptions;

  constructor(config: NgbCarouselConfig,
              private produtoService: ProdutoService) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 3
      }
  ];
  }

  ngOnInit() {
    this.getProdutos();
  }


  getProdutos() {
    this.produtoService.buscar().subscribe(res => this.produtos = res);
  }

  images = [
    "../assets/img/test/camarao2.jpg",
    "../assets/img/test/camarao1.jpg",
    "../assets/img/test/camarao4.jpg"
  ];

  produt = [
    "../assets/img/test/produto5.jpg",
    "../assets/img/test/produto3.jpg"
  ];

  products = [
    {imagem: "../assets/img/test/produto9.jpg", descricao: "Camarão salgado 50kg", preco: 2.99},
    {imagem: "../assets/img/test/produto7.jpg", descricao: "Camarão sem cabeça 100kg", preco: 3.99},
    {imagem: "../assets/img/test/produto9.jpg", descricao: "Camarão salgado 50kg", preco: 2.99},
    {imagem: "../assets/img/test/produto7.jpg", descricao: "Camarão sem cabeça 100kg", preco: 3.99},
    {imagem: "../assets/img/test/produto9.jpg", descricao: "Camarão salgado 50kg", preco: 2.99}
  ];

}
