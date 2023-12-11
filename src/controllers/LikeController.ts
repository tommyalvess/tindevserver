import { Request, Response } from 'express';
import Dev from '../models/Dev';
import { connectedUsers, io } from '../server'; // Importa a instância do Socket.IO do módulo separado

export default class LikeController {

    async store(req: Request, res: Response){
        console.log(io, connectedUsers);

        const { user } = req.headers;
        const { devId } = req.params;

        console.log(user);

        const loggedDev = await Dev.findById(user);

        let targetDev = null

        try {
            targetDev = await Dev.findById(devId);
        } catch (error) {
            return res.status(400).json({ error: 'Dev not exists'});
        }
        
        if (targetDev.likes != null) {
             //Se o loggedDev q é o user logado, deu like em alguem que deu like nele, vai da match.
            if (targetDev.likes.includes(loggedDev._id)) {
                
                const loggedSocket = connectedUsers[user];
                const targetSocket = connectedUsers[devId];

                if (loggedSocket) {
                    io.to(loggedSocket).emit('match', targetDev);
                }

                if (targetSocket) {
                    io.to(targetSocket).emit('match', loggedDev);
                }

                console.log('Deu match!');
                
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.status(201).json(loggedDev);
    }
}