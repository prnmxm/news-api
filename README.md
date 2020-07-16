# News-explorer-api
## Установка
Для установки требуется установленный Node.js и npm

1. Создайте папки у себя на компьютере
2. Скопируйте проект в вашу папку командой:   
```git clone https://github.com/prnmxm/backend-trello```
3. В корне проекта через консоль установите зависимости
```npm install```
4. Создайте .env файл в корне: 
```
NODE_ENV = production
PORT = 3000
MONGODB = mongodb://localhost:27017/news-api-prod
JWT_SECRET = JWT_SECRET
```

## Команды 
1. `npm run dev` для запуска сервера с хот релоудом
2. `npm start` для запуска сервера в прод

## Роуты
Полльзователь:
1. POST `/signup` - регистрация пользователя
2. POST `/signin` - авторизация пользователя
3. GET `/user/me` - профиль пользователя

Статьи:
1. POST `/articles` - добавить статью
2. GET `/articles` - получить все статьи текущего пользователя
3. DELETE `/aticles/:ID` - удалить статью по ID 
