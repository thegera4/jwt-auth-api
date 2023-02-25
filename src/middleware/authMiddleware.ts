import jwt from 'jsonwebtoken';
import { User } from '../models/user';
require('dotenv').config();

export const requireAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;

  if(token){
    jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decodedToken: any) => {
      if(err){
        console.log(err.message);
        res.redirect('/auth');
      }else{
        console.log(decodedToken);
        next();
      }
    });
  }else{
    res.redirect('/auth');
  }

}

export const checkCurrentUser = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;

  if(token){
    jwt.verify(token, process.env.SECRET_KEY as string, async (err: any, decodedToken: any) => {
      if(err){
        console.log(err.message);
        res.locals.user = null;
        next();
      }else{
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  }else{
    res.locals.user = null;
    next();
  }
}