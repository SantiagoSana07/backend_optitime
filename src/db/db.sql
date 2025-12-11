-- ==========================================
--   SCHEMA COMPLETO - COMPATIBLE CON MYSQL
-- ==========================================

-- Desactivar checks mientras se crean tablas
SET FOREIGN_KEY_CHECKS = 0;

-- =====================
--     USERS
-- =====================
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- =====================
--     CATEGORIES
-- =====================
CREATE TABLE IF NOT EXISTS categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =====================
--     TASKS
-- =====================
CREATE TABLE IF NOT EXISTS tasks (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pendiente', 'en_progreso', 'completada') DEFAULT 'pendiente',
  due_date DATE,
  category_id INT,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =====================
--     EXCEPTIONS
-- =====================
CREATE TABLE IF NOT EXISTS exceptions (
  id INT NOT NULL AUTO_INCREMENT,
  task_id INT,
  reason VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (task_id) REFERENCES tasks(id)
);

-- =====================
--     DAILY JOURNALS
-- =====================
CREATE TABLE IF NOT EXISTS daily_journals (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  date DATE DEFAULT (CURRENT_DATE),
  entry TEXT NOT NULL,
  rating TINYINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =====================
--     WEEKLY REPORTS
-- =====================
CREATE TABLE IF NOT EXISTS weekly_reports (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  week_start DATE NOT NULL,
  completion_rate DECIMAL(5,2),
  top_failure_reason VARCHAR(255),
  recommendations TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Reactivar checks
SET FOREIGN_KEY_CHECKS = 1;
