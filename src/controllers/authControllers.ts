import { User } from '../models/user';
import { hashPassword, handleErrors } from '../utils/auth';

export const signup = async (req: any, res: any) => {
  const { email, password } = req.body;

  const hashedPassword = await hashPassword(password);
  
  try{
    await User.create({ email: email, password: hashedPassword });
    res.status(201).json({ msg: 'User created successfully!' });
  }catch(e){
    const errors = handleErrors(e);
    res.status(400).json({ errors });
  }

}

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(email, password)
  res.send('user logged in..Welcome!');
}

export const logout = (req: any, res: any) => {
  res.send('user logged out..Bye!');
}