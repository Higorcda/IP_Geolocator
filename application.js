
const express     =            require('express');
const { engine }  = require('express-handlebars');
const body_parser =        require('body-parser');
const session     =    require('express-session');
const flash       =      require('connect-flash');
const path        =               require('path');
const dotenv      =             require('dotenv');

const application = express();

/* -- Router -- */ global.router = express.Router();

dotenv.config();

application.use
(
    session({ secret: process.env.SERVER_SESSION_SECRET_KEY, resave: true, saveUninitialized: true })
);

application.use(flash());

application.use( (request, response, next) => { response.locals.failure = request.flash('failure'); next(); });

application.engine(  'handlebars', engine());
application.set('view engine', 'handlebars');

application.use(body_parser.urlencoded({ extended: false }));
application.use(                         body_parser.json());

application.use(express.static(path.join(__dirname, process.env.SERVER_STATIC_FOLDER)));

/* Routes */

require(    './routes/index.js');
require('./routes/geolocate.js');

application.use('/', global.router);

/* --- */

application.listen
(
    process.env.SERVER_LISTENING_PORT, console.log(`\nServer Listening on ${process.env.SERVER_LISTENING_PORT} Port`)
);