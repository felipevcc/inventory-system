/* Get all customers */

DELIMITER //
CREATE PROCEDURE Proc_get_all_customers()
BEGIN
  SELECT * FROM customer ORDER BY created_at DESC;
END
//

DELIMITER ;



/* Get customer by id */

DELIMITER //

CREATE PROCEDURE Proc_get_customer_by_id(IN Ip_customer_id INT)
BEGIN
  SELECT * FROM customer WHERE customer_id = Ip_customer_id;
END
//

DELIMITER ;



/* Insert customer */

DELIMITER //

CREATE PROCEDURE Proc_insert_customer(
  IN Ip_name VARCHAR(45),
  IN Ip_phone_number VARCHAR(20),
  IN Ip_email VARCHAR(255),
  IN Ip_document VARCHAR(45),
  IN Ip_address VARCHAR(255),
  IN Ip_state VARCHAR(45),
  IN Ip_city VARCHAR(45),
  OUT Op_customer_id INT
)
BEGIN
  INSERT INTO customer (name, phone_number, email, document, address, state, city)
  VALUES (Ip_name, Ip_phone_number, Ip_email, Ip_document, Ip_address, Ip_state, Ip_city);
  SET Op_customer_id = LAST_INSERT_ID();
END
//

DELIMITER ;



/* Update customer */

DELIMITER //

CREATE PROCEDURE Proc_update_customer(
  IN Ip_customer_id INT,
  IN Ip_name VARCHAR(45),
  IN Ip_phone_number VARCHAR(20),
  IN Ip_email VARCHAR(255),
  IN Ip_document VARCHAR(45),
  IN Ip_address VARCHAR(255),
  IN Ip_state VARCHAR(45),
  IN Ip_city VARCHAR(45)
)
BEGIN
  UPDATE customer
  SET name = Ip_name, phone_number = Ip_phone_number, email = Ip_email, document = Ip_document, address = Ip_address, state = Ip_state, city = Ip_city
  WHERE customer_id = Ip_customer_id;
END
//

DELIMITER ;



/* Delete customer */

DELIMITER //

CREATE PROCEDURE Proc_delete_customer(IN Ip_customer_id INT)
BEGIN
  DELETE FROM customer WHERE customer_id = Ip_customer_id;
END
//

DELIMITER ;
