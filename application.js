
const express     =            require('express');
const { engine }  = require('express-handlebars');
const body_parser =        require('body-parser');
const path        =               require('path');

const express_framework = express();

global.router = express.Router();

express_framework.engine('handlebars',   engine()); 
express_framework.set('view engine', 'handlebars');

express_framework.use(body_parser.urlencoded({ extended: false }));
express_framework.use(                         body_parser.json());

express_framework.use(express.static(path.join(__dirname, 'assets')));

// --

require(    './routes/index.js');
require('./routes/geolocate.js');

express_framework.use('/', global.router);

// --

express_framework.listen(3012, console.log('\n* Server running...'));