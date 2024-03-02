import { ProductModelServer } from "./product.model";

/**
 * Модель для сервера
 */
export interface CartModelServer {
	total: number;
	data: [{
		product: ProductModelServer | undefined,
		numInCart: number
	}]
}

/**
 * Общедоступная модель корзины
 */
export interface CartModelPublic {
	total: number,
	prodData: [{
		id: number,
		incart: number
	}]
}