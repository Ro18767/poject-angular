import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  is_admin() {
    console.log(sessionStorage.getItem('is_admin') === 'true');

    return sessionStorage.getItem('is_admin') === 'true';
  }

  set_is_admin() {
    sessionStorage.setItem('is_admin', 'true');
  }
  set_is_not_admin() {
    sessionStorage.removeItem('is_admin');
  }
}
