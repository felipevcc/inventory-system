/* Get all sales */

DELIMITER //
CREATE PROCEDURE Proc_get_all_sales()
BEGIN
  SELECT * FROM sale ORDER BY sale_id DESC;
END
//
DELIMITER ;



/* Get sale by id */

DELIMITER //
CREATE PROCEDURE Proc_get_sale_by_id(IN Ip_sale_id INT)
BEGIN
  SELECT * FROM sale WHERE sale_id = Ip_sale_id;
END
//
DELIMITER ;



/* Insert sale */

DELIMITER //
CREATE PROCEDURE Proc_insert_sale(
  IN Ip_total_value INT,
  IN Ip_customer_id INT,
  IN Ip_user_id INT,
  OUT Op_sale_id INT
)
BEGIN
  INSERT INTO sale(total_value, customer_id, user_id)
  VALUES(Ip_total_value, Ip_customer_id, Ip_user_id);
  SET Op_sale_id = LAST_INSERT_ID();
END
//
DELIMITER ;



/* Get all sale details */

DELIMITER //
CREATE PROCEDURE Proc_get_all_sale_details(IN Ip_sale_id INT)
BEGIN
  SELECT * FROM sale_detail where sale_id = Ip_sale_id;
END
//
DELIMITER ;



/* Insert sale detail */

DELIMITER //
CREATE PROCEDURE Proc_insert_sale_detail(
  IN Ip_sale_id INT,
  IN Ip_article_id INT,
  IN Ip_article_quantity INT,
  IN Ip_price INT
)
BEGIN
  INSERT INTO sale_detail(sale_id, article_id, article_quantity, price)
  VALUES(Ip_sale_id, Ip_article_id, Ip_article_quantity, Ip_price);
END
//
DELIMITER ;
