# Blog API Demo

一個基本的網頁後端範例，可以讓前端使用後端 API 實現註冊與登入，並撰寫、修改、刪除文章。

## 目的

展現了我決定成為後端工程師，所自學的基礎知識與技術應用，並使用這些技術實作該專案。

## 專案資料夾結構

#### Controllers

- 後端路由控制

#### Services

- 主要控制邏輯

#### Models

- 資料庫連接處理

#### Config

- 使用套件設定

## Web API 設計

#### 取得 API 服務資料示範 URL

Example:`http://localhost/api/user/register`

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
