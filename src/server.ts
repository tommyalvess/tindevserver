import cors from 'cors';
import express from 'express';

import * as http from 'http';
import mongoose from 'mongoose';
import * as socketio from 'socket.io';
import routes from './routes';

const uri = "mongodb+srv://tomalves:admin123@cluster0.nfqjfyn.mongodb.net/?retryWrites=true&w=majority";

const app = express()

// Crie uma instância do servidor HTTP
const server = http.createServer(app);
// Crie uma instância do Socket.IO associada ao servidor HTTP
const io = new socketio.Server(server);

const connectedUsers: Record<string, string> = {};

mongoose.connect(uri);//Conectando ao banco

// Ouça eventos de conexão
io.on('connection', (socket) => {
    const { user } = socket.handshake.query;

    // Armazenar o usuário conectado
    connectedUsers[user] = socket.id;

    // Agora você pode usar connectedUsers dentro deste bloco
    console.log('Lista de usuários conectados:', connectedUsers);

     // Lembre-se de manipular a desconexão para remover o usuário desconectado se necessário
     socket.on('disconnect', () => {
        // Remover o usuário desconectado
        delete connectedUsers[user];
        console.log('Lista de usuários conectados após desconexão:', connectedUsers);
    });
    
});

app.use(cors()) //alterar o origin com o seu urls seu dominio
app.use(express.json())
app.use(routes);

server.listen(3333, () => {
    console.log('Servidor está ouvindo na porta 3333');
});

export { connectedUsers, io }; // Exporta a instância do Socket.IO

