/* Get all users */

DELIMITER //

CREATE PROCEDURE Proc_get_all_users()
BEGIN
  SELECT * FROM user ORDER BY user_id DESC;
END
//

DELIMITER ;



/* Get user by id */

DELIMITER //

CREATE PROCEDURE Proc_get_user_by_id(IN Ip_user_id INT)
BEGIN
  SELECT * FROM user WHERE user_id = Ip_user_id;
END
//

DELIMITER ;



/* Insert user */

DELIMITER //

CREATE PROCEDURE Proc_insert_user(
  IN Ip_name VARCHAR(45),
  IN Ip_username VARCHAR(20),
  IN Ip_password_hash VARCHAR(100),
  IN Ip_phone_number VARCHAR(20),
  IN Ip_email VARCHAR(255),
  IN Ip_admin BOOLEAN,
  OUT Op_user_id INT
)
BEGIN
  INSERT INTO user (name, username, password_hash, phone_number, email, admin)
  VALUES (Ip_name, Ip_username, Ip_password_hash, Ip_phone_number, Ip_email, Ip_admin);
  SET Op_user_id = LAST_INSERT_ID();
END
//

DELIMITER ;



/* Update user */

DELIMITER //

CREATE PROCEDURE Proc_update_user(
  IN Ip_user_id INT,
  IN Ip_name VARCHAR(45),
  IN Ip_username VARCHAR(20),
  IN Ip_password_hash VARCHAR(100),
  IN Ip_phone_number VARCHAR(20),
  IN Ip_email VARCHAR(255),
  IN Ip_admin BOOLEAN
)
BEGIN
  UPDATE user
  SET name = Ip_name, username = Ip_username, password_hash = Ip_password_hash, phone_number = Ip_phone_number, email = Ip_email, admin = Ip_admin
  WHERE user_id = Ip_user_id;
END
//

DELIMITER ;



/* Delete user */

DELIMITER //

CREATE PROCEDURE Proc_delete_user(IN Ip_user_id INT)
BEGIN
  DELETE FROM user WHERE user_id = Ip_user_id;
END
//

DELIMITER ;
