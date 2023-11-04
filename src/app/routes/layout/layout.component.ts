import { Component } from '@angular/core';
import { AuthService } from 'src/app/sevice/auth.service';
import { CartService } from 'src/app/sevice/cart.service';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  is_admin = this.authService.get_is_admin_signal();
  countincart : number;

  constructor(private authService: AuthService, private CartService: CartService ) {
    this.countincart = CartService.getcount();
  }
}
