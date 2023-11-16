/* Get all providers */

DELIMITER //

CREATE PROCEDURE Proc_get_all_providers()
BEGIN
  SELECT * FROM provider ORDER BY provider_id DESC;
END
//

DELIMITER ;



/* Get provider by id */

DELIMITER //

CREATE PROCEDURE Proc_get_provider_by_id(IN Ip_provider_id INT)
BEGIN
  SELECT * FROM provider WHERE provider_id = Ip_provider_id;
END
//

DELIMITER ;



/* Insert provider */

DELIMITER //

CREATE PROCEDURE Proc_insert_provider(
  IN Ip_name VARCHAR(45),
  IN Ip_phone_number VARCHAR(20),
  IN Ip_email VARCHAR(255),
  OUT Op_provider_id INT
)
BEGIN
  INSERT INTO provider (name, phone_number, email)
  VALUES(Ip_name, Ip_phone_number, Ip_email);
  SET Op_provider_id = LAST_INSERT_ID();
END
//

DELIMITER ;



/* Update provider */

DELIMITER //

CREATE PROCEDURE Proc_update_provider(
  IN Ip_provider_id INT,
  IN Ip_name VARCHAR(45),
  IN Ip_phone_number VARCHAR(20),
  IN Ip_email VARCHAR(255)
)
BEGIN
  UPDATE provider
  SET name = Ip_name, phone_number = Ip_phone_number, email = Ip_email
  WHERE provider_id = Ip_provider_id;
END
//

DELIMITER ;



/* Delete provider */

DELIMITER //

CREATE PROCEDURE Proc_delete_provider(IN Ip_provider_id INT)
BEGIN
  DELETE FROM provider WHERE provider_id = Ip_provider_id;
END
//

DELIMITER ;
