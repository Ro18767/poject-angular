import { CanMatchFn } from '@angular/router';

export const notAdminGuard: CanMatchFn = (route, state) => {
  return sessionStorage.getItem('is_admin') !== 'true';
};
