import { Request, Response } from 'express';
import Dev from '../models/Dev';

export default class DislikeController {

    async store(req: Request, res: Response){
        const { user } = req.headers;
        const { devId } = req.params;

        console.log(user);
        
    
        const loggedDev = await Dev.findById(user);

        let targetDev = null
    
        try {
          targetDev = await Dev.findById(devId);
        } catch (error) {
          return res.status(400).json({ error: 'Dev not exists' });
        }
                
        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.status(201).json(loggedDev);
    }
}