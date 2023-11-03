import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private is_admin_signal = signal(this.is_admin());

  is_admin() {
    console.log(sessionStorage.getItem('is_admin') === 'true');

    return sessionStorage.getItem('is_admin') === 'true';
  }

  set_is_admin() {
    this.is_admin_signal.set(true);
    sessionStorage.setItem('is_admin', 'true');
  }
  set_is_not_admin() {
    this.is_admin_signal.set(false);
    sessionStorage.removeItem('is_admin');
  }
  get_is_admin_signal() {
    return this.is_admin_signal;
  }
}
