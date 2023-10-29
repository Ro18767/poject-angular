import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sevice/auth.service';
import { ProdctsService, Product } from 'src/app/sevice/prodcts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class AdminProductListComponent {
  produts: Map<number, Product> | null;
  constructor(
    private prodctsService: ProdctsService,
    private router: Router,
    private authService: AuthService
  ) {
    this.check_is_admin();
    this.produts = this.prodctsService.select();
  }

  check_is_admin() {
    if (!this.authService.is_admin()) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin']);
      });
    }
  }

  handle_delete_click(product_id: number) {
    let allowed_to_delete = confirm(
      `Can we delete product (id is ${product_id})`
    );
    if (!allowed_to_delete) return;
    this.prodctsService.delete(product_id);
    this.prodctsService.save();

    this.produts = this.prodctsService.select();
  }
}
