import { WebSocketServer} from 'ws'; 

const portNum = 3000;
const wss = new WebSocketServer({ port: portNum});

wss.on('connection', function connection (ws) {
    ws.on('message', function message(data) {
        console.log('received: %s ', data);
        const jsonObj  = JSON.parse(data);
        const jsonStr = JSON.stringify(jsonObj);
        wss.clients.forEach(
             client => client.send(jsonStr))
    });
    console.log('connected');
});
console.log('Web Socket Server Started: ', portNum);
