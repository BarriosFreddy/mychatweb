const app = require('express')();
const databaseConfig = require('./config/DatabaseConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const Constants = require('./constants/Constants');
const http = require("http");
const socketIo = require("socket.io");
const ConversationService = require('./services/ConversationService');

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

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
	console.log("Client connected");

	ConversationService.setSocket(socket);
	ConversationService.setIOServer(io);

	socket.on('joinMe', (conversationId) => {
		console.log('conversationId', conversationId);
		socket.join(conversationId, () => {
			console.log('User joined');
		});
		socket.on('messages', data => {
			console.log('data from frontend', data);
			socket.broadcast.to(conversationId).emit('messages', data);
		});
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

server.listen(Constants.COMUNICATION_PORT, () => console.log(`Listening on port 4000 - comunication`));

app.listen(process.env.PORT || Constants.API_PORT, () => console.log('Listening on 3000 - API'))

