CREATE DATABASE IF NOT EXISTS sahara;
USE sahara;

CREATE TABLE IF NOT EXISTS support_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_name VARCHAR(150) NOT NULL,
  service_type VARCHAR(100),
  phone VARCHAR(30),
  website VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(30),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO support_services
(service_name,service_type,phone,website,description)
SELECT 'Emergency Support','Emergency','112','https://112.gov.in/','For immediate emergencies.'
WHERE NOT EXISTS (SELECT 1 FROM support_services WHERE service_name='Emergency Support');

INSERT INTO support_services
(service_name,service_type,phone,website,description)
SELECT 'Women Helpline','Women Support','181','https://wcd.nic.in/','Women-related support information.'
WHERE NOT EXISTS (SELECT 1 FROM support_services WHERE service_name='Women Helpline');

INSERT INTO support_services
(service_name,service_type,phone,website,description)
SELECT 'Legal Aid','Legal','','https://nalsa.gov.in/','Seek assistance through official legal-aid services.'
WHERE NOT EXISTS (SELECT 1 FROM support_services WHERE service_name='Legal Aid');