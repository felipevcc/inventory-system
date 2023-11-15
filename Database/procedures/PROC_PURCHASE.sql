/* Get all purchases */

DELIMITER //
CREATE PROCEDURE Proc_get_all_purchases()
BEGIN
  SELECT * FROM purchase;
END
//
DELIMITER ;



/* Get purchase by id */

DELIMITER //
CREATE PROCEDURE Proc_get_purchase_by_id(IN Ip_purchase_id INT)
BEGIN
  SELECT * FROM purchase WHERE purchase_id = Ip_purchase_id;
END
//
DELIMITER ;



/* Get all purchase details */

DELIMITER //
CREATE PROCEDURE Proc_get_all_purchase_details(IN Ip_purchase_id INT)
BEGIN
  SELECT * FROM purchase_detail where purchase_id = Ip_purchase_id;
END
//
DELIMITER ;



/* Insert purchase */
DELIMITER //
CREATE PROCEDURE Proc_insert_purchase(
  IN Ip_total_value INT,
  IN Ip_provider_id INT,
  IN Ip_user_id INT
)
BEGIN
  INSERT INTO purchase(total_value, provider_id, user_id)
  VALUES(Ip_total_value, Ip_provider_id, Ip_user_id);
END;
//
DELIMITER;
