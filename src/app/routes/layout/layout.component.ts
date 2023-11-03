import { Component } from '@angular/core';
import { AuthService } from 'src/app/sevice/auth.service';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  is_admin = this.authService.get_is_admin_signal();
  constructor(private authService: AuthService) {}
}
