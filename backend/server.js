const app = require('express')();
const databaseConfig = require('./config/DatabaseConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const Constants = require('./constants/Constants');
const http = require("http");
const socketIo = require("socket.io");

// Initialize the database
databaseConfig.init();
// Enable cross-origin resources sharing CORS
app.use(cors({
	credentials: true,
	origin: true
}));
app.options('*', cors());
// Add JSON Support
app.use(bodyParser.json());

// Associate the routes
app.use('/', routes);

// Create HTTP server 
const server = http.createServer(app);
// Initilize Socket IO
const io = socketIo(server);

// Configure rooms of conversations through sockets
io.on("connection", (socket) => {
	console.log("Client connected");
	socket.on('joinMe', (conversationId) => {
		console.log('conversationId', conversationId);
		socket.join(conversationId, () => {
			console.log('User joined');
		});
		socket.on('messages', data => {
			socket.broadcast.to(conversationId).emit('messages', data);
		});
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

// Expose port for connections
server.listen(process.env.PORT || Constants.API_PORT, () => console.log('Listening on port 3000'));
