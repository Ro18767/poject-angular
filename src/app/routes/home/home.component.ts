import { Component, Signal } from '@angular/core';
import { ProdctsService, Product } from 'src/app/sevice/prodcts.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  produts: Signal<Map<number, Product> | null>;
  constructor(private prodctsService: ProdctsService) {
    console.log(this.prodctsService);
    this.produts = this.prodctsService.signal();
  }
}
