import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

	private products: ProductResposeModel[] = [];
	private server_url = environment.SERVER_URL;

	constructor(private http: HttpClient) { }

	getSingleOrder(orderId: number) {
		return this.http.get<ProductResposeModel[]>(this.server_url + '/orders/' + orderId).toPromise();
	}
}

/** 
 * Определим локальный интерфейс товара для заказа
*/
interface ProductResposeModel {
	id: number;
	title: string;
	description: string;
	price: number;
	quantityOrdered: number;
	image: string;
}
