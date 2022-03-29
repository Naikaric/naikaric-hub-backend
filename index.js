require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const db = require('./models');

const PORT = process.env.PORT;
const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200,
    origin: async(origin, callback) => {
        try {
         const origins = await db.origins.findAll({ attributes: ['host'], raw: true });
         const originsArray = origins.map(el => el.host);

         originsArray.push(origin);
         
         callback(null, originsArray);
        } catch (error) {
            callback(error, null);
        }
    },
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.options('*', cors());

require('./routes/user.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/OAuth2.routes')(app);

db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер успешно запущен на ${PORT} порту`);
        });
    })
    .catch(err => {
        console.error('При подключении к базе данных произошла ошибка', err);
    })