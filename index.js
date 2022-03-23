require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const db = require('./models');

const PORT = process.env.PORT;
const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200,
    origin: process.env.FRONTEND_HOST,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.options('*', cors());

require('./routes/user.routes')(app);
require('./routes/auth.routes')(app);

db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер успешно запущен на ${PORT} порту`);
        });
    })
    .catch(err => {
        console.error('При подключении к базе данных произошла ошибка', err);
    })