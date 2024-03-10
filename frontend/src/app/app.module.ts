import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

// https://github.com/abacritt/angularx-social-login

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
	  BrowserModule,
	  BrowserAnimationsModule,
	  AppRoutingModule,
	  NgbModule,
	  HttpClientModule,
	  NgxSpinnerModule,	  
	  ToastrModule.forRoot(),
	  SocialLoginModule
  ],
	providers: [
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
			  autoLogin: false,
			  providers: [
				 {
					id: GoogleLoginProvider.PROVIDER_ID,
					provider: new GoogleLoginProvider(
					  '799705726167-vn6184fsovmps0kpbg5c7jabv15r3ias.apps.googleusercontent.com'
					)
				 }
			  ],
			  onError: (err) => {
				 console.error(err);
			  }
			} as SocialAuthServiceConfig,
		 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
