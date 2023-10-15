/* Get all categories */

DELIMITER //
CREATE PROCEDURE Proc_get_all_categories()
BEGIN
  SELECT * FROM category;
END
//
DELIMITER ;



/* Get category by id */

DELIMITER //
CREATE PROCEDURE Proc_get_category_by_id(IN Ip_category_id INT)
BEGIN
  SELECT * FROM category WHERE category_id = Ip_category_id;
END
//
DELIMITER ;



/* Insert category */

DELIMITER //
CREATE PROCEDURE Proc_insert_category(IN Ip_name VARCHAR(45))
BEGIN
  INSERT INTO category (name) VALUES (Ip_name);
END
//
DELIMITER ;



/* Update category */

DELIMITER //
CREATE PROCEDURE Proc_update_category(IN Ip_category_id INT, IN Ip_name VARCHAR(45))
BEGIN
  UPDATE category SET name = Ip_name WHERE category_id = Ip_category_id;
END
//
DELIMITER ;



/* Delete category */

DELIMITER //
CREATE PROCEDURE Proc_delete_category(IN Ip_category_id INT)
BEGIN
  DELETE FROM category WHERE category_id = Ip_category_id;
END
//
DELIMITER ;
