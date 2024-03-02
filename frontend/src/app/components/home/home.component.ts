import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductModelServer, serverResponse } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

	// products: any[] = [];
	products: ProductModelServer[] = [];

	constructor(private productService: ProductService,
					private cartService: CartService,
					private router: Router) { }

	ngOnInit() {
		this.productService.showMessage();
		//this.productService.getAllProducts().subscribe((prods: {count: Number, products: any[]}) => {
		this.productService.getAllProducts().subscribe((prods: serverResponse) => {

			this.products = prods.products;

			console.log(prods);
			console.log(this.products);
		});
	}

	selectProduct(id: number) {

		this.router.navigate(['/product', id]).then();
	}

	AddToCart(id: number) {
		
		this.cartService.AddProductToCart(id);
	}

}
