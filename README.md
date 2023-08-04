# Blog API Demo

一個基本的網頁後端範例，可以讓使用者註冊與登入，並撰寫、修改、刪除文章。

## 目的

展現了我決定成為 Node.js Junior 後端工程師，所自學的基礎知識與技術應用，並使用這些技術實作該專案。

## 方案檔資料夾說明範例

#### Routes

- 後端路由控制

#### Controllers

- 主要控制邏輯

#### Models

- 資料庫 Schemas

## Web API 服務使用範例

#### User

| Method | Url               | 功能       |
| ------ | ----------------- | ---------- |
| POST   | api/user/register | 使用者註冊 |
| POST   | api/user/login    | 使用者登入 |

#### Blog

| Method | Url                   | 功能               |
| ------ | --------------------- | ------------------ |
| GET    | api/blog/             | 取得全部文章       |
| GET    | api/blog/:id          | 取得特定文章       |
| GET    | api/blog/user/:userId | 取得特定使用者文章 |
| POST   | api/blog/             | 新增文章           |
| PUT    | api/blog/:id          | 修改特定文章       |
| DELETE | api/blog/:id          | 刪除特定文章       |

## 雲端部屬

### 雲端環境

- 資料庫:AWS RDS
- 主機:AWS EC2

## 套件說明

### Javascript 套件

- Express
- bcrypt
- cors
- joi
- sequelize
- passport
- passport-jwt
- dotenv
