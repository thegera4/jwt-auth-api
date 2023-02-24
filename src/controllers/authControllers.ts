import { User } from '../models/user';
import { hashPassword, handleErrors, createToken } from '../utils/auth';

export const signup = async (req: any, res: any) => {
  const { username, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const maxAge = 3 * 24 * 60 * 60;
  
  try{
    const createdUser = await User.create({ username: username, email: email, password: hashedPassword });
    const token = createToken(createdUser._id, maxAge);
    //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'strict', secure: true });
    res.status(201).json({ msg: 'User created successfully!', token });
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