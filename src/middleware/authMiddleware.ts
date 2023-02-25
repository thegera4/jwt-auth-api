import jwt from 'jsonwebtoken';
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