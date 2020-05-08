const app = require('express')();
const databaseConfig = require('./config/DatabaseConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const Constants = require('./constants/Constants');


databaseConfig.init();
app.use(cors({
	credentials: true,
	origin: true
}));
app.options('*', cors());
// Add JSON Support
app.use(bodyParser.json());

// Associate the routes
app.use('/', routes);

app.listen(process.env.PORT || Constants.PORT_BY_DEFAULT, () => console.log('listening on 3000'))

