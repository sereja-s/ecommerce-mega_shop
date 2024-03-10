import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const profileGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

	const router = inject(Router);
	const userService = inject(UserService);

	if (userService.auth) {
      return true;
    }

    router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;

} ;
