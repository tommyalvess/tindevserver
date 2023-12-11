import axios from 'axios';
import { Request, Response } from 'express';
import Dev from '../models/Dev';

export default class DevController {
    async index(req: Request, res: Response){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);        

        const allUsers = await Dev.find({
          $and: [
              { _id: { $ne: user } },// id nao seja igual esse aqui q passei 
              { _id: { $nin: loggedDev.likes } }, // id nao esteja dentro da lista de likes
              { _id: { $nin: loggedDev.dislikes } }, //  id nao esteja dentro da lista de dislikes
          ],
        })
        return res.status(200).send(allUsers);

    }

    async store(req: Request, res: Response){
        try {
          const { username } = req.body;

          const userExists = await Dev.findOne({ user: username });
      
          if (userExists) {
            return res.status(200).send(userExists);
          }
      
          const response = await axios.get(`https://api.github.com/users/${username}`);
      
          const { name, bio, avatar_url: avatar } = response.data;
      
          const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
          })
      
          return res.json(dev);
        } catch (error) {
          console.log(error);
          return res.status(400).send('Erro ao cadastrar.');
        }
    }
}