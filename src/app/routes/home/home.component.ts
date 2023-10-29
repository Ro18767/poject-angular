import { Component, Signal } from '@angular/core';
import { ProdctsService, Product } from 'src/app/sevice/prodcts.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  produts: Map<number, Product> | null;
  constructor(private prodctsService: ProdctsService) {
    this.produts = this.prodctsService.select();
  }
}
