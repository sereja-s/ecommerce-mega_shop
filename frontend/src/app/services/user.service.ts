import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

auth = false;
	private SERVER_URL = environment.SERVER_URL;
	// @ts-ignore
  private user;
	authState$ = new BehaviorSubject<boolean>(this.auth);
	 // @ts-ignore
  userData$ = new BehaviorSubject<SocialUser | ResponseModel>(null);

	constructor(private authService: SocialAuthService, private httpClient: HttpClient) { 
	  
		authService.authState.subscribe((user: SocialUser) => {
			if (user != null) {
			  this.auth = true;
			  this.authState$.next(this.auth);
			  this.userData$.next(user);
			}
		 });

	}
	
	 //  Login User with Email and Password
	 loginUser(email: string, password: string) {
		this.httpClient.post<ResponseModel>(`${this.SERVER_URL}/auth/login`, {email, password})
		  .subscribe((data: ResponseModel) => {
			 this.auth = data.auth;
			 this.authState$.next(this.auth);
			 this.userData$.next(data);
		  });
	 }

	//  Google Authentication
	googleLogin() {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
	 }
  
	 logout() {
		this.authService.signOut();
		this.auth = false;
		this.authState$.next(this.auth);
	 }
}

export interface ResponseModel {
	token: string;
	auth: boolean;
	email: string;
	username: string;
	fname: string;
	lname: string;
	photoUrl: string;
	userId: number;
 }
