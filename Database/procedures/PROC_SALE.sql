/* Get all sales */

DELIMITER //
CREATE PROCEDURE Proc_get_all_sales()
BEGIN
  SELECT * FROM sale;
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



/* Get all sale details */

DELIMITER //
CREATE PROCEDURE Proc_get_all_sale_details(IN Ip_sale_id INT)
BEGIN
  SELECT * FROM sale_detail where sale_id = Ip_sale_id;
END
//
DELIMITER ;



/* Insert sale */

DELIMITER //
CREATE PROCEDURE Proc_insert_sale(
  IN Ip_total_value INT,
  IN Ip_customer_id INT,
  IN Ip_user_id INT
)
BEGIN
  INSERT INTO sale(total_value, customer_id, user_id)
  VALUES(Ip_total_value, Ip_customer_id, Ip_user_id);
END
//
DELIMITER ;
