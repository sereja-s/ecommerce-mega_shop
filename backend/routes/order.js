const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

// Маршрут для получения всех заказов:
router.get('/', (req, res) => {
	database.table('orders_details as od')
		.join([
			{
				table: 'orders as o',
				on: 'o.id = od.order_id'
			},
			{
				table: 'products as p',
				on: 'p.id = od.product_id'
			},
			{
				table: 'users as u',
				on: 'u.id = o.user_id'
			},
		])
		.withFields(['o.id', 'p.title as name', 'p.description', 'p.price', 'u.username'])
		.sort({id: 1})
		.getAll()
		.then(orders => {
			if (orders.length > 0) {
				res.json(orders);
			} else {
				res.json({ message: 'Заказов не найдено !' })
			}
		}).catch(err => console.log(err));
});

// Маршрут для получения одного заказа по указанному в запросе идентификатору:
router.get('/:id', (req, res) => {
	let orderId = req.params.id;

	database.table('orders_details as od')
		.join([
			{
				table: 'orders as o',
				on: 'o.id = od.order_id'
			},
			{
				table: 'products as p',
				on: 'p.id = od.product_id'
			},
			{
				table: 'users as u',
				on: 'u.id = o.user_id'
			}
		])
		.withFields('o.id', 'p.title as name', 'p.description', 'p.price', 'u.username', 'p.image', 'od.quantity as quantityOrdered')
		.filter({ 'o.id': orderId })
		.getAll()
		.then(orders => {
			if (orders.length > 0) {
				res.status(200).json(orders);
			} else {
				res.json({ message: `Нет заказа с orderId ${orderId} !` })
			}
		}).catch(err => console.log(err));
});

// Маршрут оформления нового заказа:
/* router.post('/new', (req, res) =>
{
	let { userId, products } = req.body;

	console.log(userId);
	console.log(products);

	if (userId !== null && userId > 0) {
		database.table('orders')
			.insert({
				user_Id: userId
			}).then(newOrderId => {

				if (newOrderId > 0) {
					products.forEach(async (p) => {

						// получим необходимые данные из соответствующей таблицы и поместим их в переменную
						let data = await database.table('products').filter({ id: p.id }).withFields('quantity').get();

						let inCart = p.incart;

						// вычитаем количество заказанных товаров из количества товаров в БД:
						if (data.quantity > 0) {

							data.quantity = data.quantity - inCart;

							if (data.quantity < 0) {
								
								data.quantity = 0
							}
							
						} else {

							data.quantity = 0

						}

						// добавим информацию о заказе с соответствующим идентификатором
						database.table('orders_details')
							.insert({
								order_id: newOrderId,
								product_id: p.id,
								quantity: inCart
							}).then(newId => {

								database.table('products').filter({ id: p.id }).update({ quantity: data.quantity })
									.then(successNum => { }).catch(err => console.log(err));
								
							}).catch(err => console.log(err));
						
					});
				} else {

					res.json({ message: 'При добавлении сведений о новом заказе произошла ошибка !', success: false });
				}

				// при успешном добавлении заказа отправим ответ:
				res.json({
					message: `Заказ успешно размещен с использованием идентификатора заказа ${newOrderId}`,
					success: true,
					order_id: newOrderId,
					products: products
				})

			}).catch(err => console.log(err));
		
	} else {

		res.json({ message: 'Новый заказ не создан !', success:false });
	}
}); */

router.post('/new',  (req, res) => {

	let { userId, products } = req.body;
	
	console.log(req.body);

	if(userId !== null && userId > 0) {
		 database.table('orders')
			  .insert({
					user_id: userId
			  })
			  .then(newOrderId => {
					if(newOrderId.insertId > 0) {
						 products.forEach(async (p) => {
							  let data = await database.table('products')
									.filter({id: p.id})
									.withFields(['quantity'])
									.get();

							  let inCart = p.incart;

							  // Deduct the number of pieces ordered from the quantity column in database
							  if(data.quantity > 0) {
									data.quantity = data.quantity - inCart;

									if(data.quantity < 0) {
										 data.quantity = 0;
									}
							  } else {
									data.quantity = 0;
							  }

							  // INSERT ORDER DETAILS W.R.T THE NEWLY GENERATED ORDER ID
							  database.table('orders_details')
									.insert({
										 order_id: newOrderId.insertId,
										 product_id: p.id,
										 quantity: inCart
									}).then(newId => {
									database.table('products')
										 .filter({id: p.id})
										 .update({
											  quantity: data.quantity
										 }).then(successNum => {}).catch(err => console.log(err));
							  }).catch(err => console.log(err));
						 });
					} else {
						 res.json({message: `New Order failed while adding order details`, success: false});
					}
					res.json({
						 message: `Order successfully placed with order id ${newOrderId.insertId}`,
						 success: true,
						 order_id: newOrderId.insertId,
						 products: products
					})
					//sendmail.OrderEmail(userId, products, newOrderId.insertId)
			  }).catch(err => console.log(err));
	} else {
		 res.json({message: `New Order failed`, success: false});
	}

});

// Платежный шлюз:
router.post('/payment', (req, res) => {
	setTimeout(() => {
		res.status(200).json({ success: true });
	}, 3000)
});

module.exports = router;