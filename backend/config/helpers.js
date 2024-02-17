const Mysqli = require('mysqli');

// параметры конфигурации БД
let conn = new Mysqli({
	host: 'localhost', // IP/domain name 
	post: 3306, // port, default 3306 
	user: 'root', // username 
	passwd: '', // password 
	db: 'ecommerce-mega_shop'
});

let db = conn.emit(false, '');

module.exports = {
/**
 * Объект БД
 */
	database: db,
};