import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductModelServer, serverResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

	//private SERVER_URL = environment.serverURL;
	private server_url = environment.SERVER_URL;

	constructor(private http: HttpClient) { }
	
	showMessage() {
		console.log('Сервис товаров вызван !');
	}

	// Получим все товары из beckend-сервера
/* 	getAllProducts(limitOfResults = 10) {
		
		return this.http.get<{count: Number, products: any[]}>(this.SERVER_URL + 'products', {
			params: {
				limit: limitOfResults.toString()
			}
		});
	} */

	getAllProducts(limitOfResults=10): Observable<serverResponse> {
		return this.http.get<serverResponse>(this.server_url + '/products', {
		  params: {
			 limit: limitOfResults.toString()
		  }
		});
	}
	
	getSingleProduct(id: number): Observable<ProductModelServer> {
		return this.http.get<ProductModelServer>(this.server_url + "/products/" + id);
	}

	getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
		return this.http.get<ProductModelServer[]>(this.server_url + "/products/category/" + catName);
	}
}
