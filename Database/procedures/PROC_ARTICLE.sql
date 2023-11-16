/* Get all articles */

DELIMITER //
CREATE PROCEDURE Proc_get_all_articles()
BEGIN
  SELECT * FROM article ORDER BY article_id DESC;
END
//
DELIMITER ;



/* Get article by id */

DELIMITER //
CREATE PROCEDURE Proc_get_article_by_id(IN Ip_article_id INT)
BEGIN
  SELECT * FROM article WHERE article_id = Ip_article_id;
END
//
DELIMITER ;



/* Insert article */

DELIMITER //
CREATE PROCEDURE Proc_insert_article(
  IN Ip_name VARCHAR(45),
  IN Ip_brand VARCHAR(45),
  IN Ip_stock INT,
  IN Ip_purchase_price INT,
  IN Ip_sale_price INT,
  IN Ip_weight VARCHAR(20),
  IN Ip_provider_id INT,
  IN Ip_category_id INT,
  OUT Op_article_id INT
)
BEGIN
  INSERT INTO article (name, brand, stock, purchase_price, sale_price, weight, provider_id, category_id)
  VALUES (Ip_name, Ip_brand, Ip_stock, Ip_purchase_price, Ip_sale_price, Ip_weight, Ip_provider_id, Ip_category_id);
  SET Op_article_id = LAST_INSERT_ID();
END
//
DELIMITER ;



/* Update article */

DELIMITER //
CREATE PROCEDURE Proc_update_article(
  IN Ip_article_id INT,
  IN Ip_name VARCHAR(45),
  IN Ip_brand VARCHAR(45),
  IN Ip_stock INT,
  IN Ip_purchase_price INT,
  IN Ip_sale_price INT,
  IN Ip_weight VARCHAR(20),
  IN Ip_provider_id INT,
  IN Ip_category_id INT
)
BEGIN
  UPDATE article
  SET name = Ip_name,
      brand = Ip_brand,
      stock = Ip_stock,
      purchase_price = Ip_purchase_price,
      sale_price = Ip_sale_price,
      weight = Ip_weight,
      provider_id = Ip_provider_id,
      category_id = Ip_category_id
  WHERE article_id = Ip_article_id;
END
//
DELIMITER ;



/* Delete article */

DELIMITER //
CREATE PROCEDURE Proc_delete_article(IN Ip_article_id INT)
BEGIN
  DELETE FROM article WHERE article_id = Ip_article_id;
END
//
DELIMITER ;
