import { CanMatchFn } from '@angular/router';

export const adminGuard: CanMatchFn = (route, state) => {
  return sessionStorage.getItem('is_admin') === 'true';
};
