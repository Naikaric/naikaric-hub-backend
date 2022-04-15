require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Naikaric hub API',
            description: 'API для сайта [Naikaric hub](http://www.nikitachurilin.ru)',
            version: '1.0.0',
            contact: {
                name:'Nikita Churilin',
                email: 'me@nikitachurilin.ru',
            },
            servers: [
                {
                    url: 'http://localhost:3002',
                    description: 'Development server',
                },
            ],
        },
        licence: {
            name: 'MIT',
            url: 'https://github.com/Naikaric/naikaric-hub-backend/blob/master/LICENSE',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerUiOptions = {
    swaggerOptions: {
        docExpansion: 'none',
    },
};

const app = express();

if(process.env.NODE_ENV === 'development') app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDoc(swaggerOptions), swaggerUiOptions)
);

app.use(express.static(path.join(__dirname, './build')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.options('*', cors());

require('./routes/user.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/OAuth2.routes')(app);
require('./routes/case.routes')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер успешно запущен на ${PORT} порту`);
        });
    })
    .catch(err => {
        console.error('При подключении к базе данных произошла ошибка', err);
    })
