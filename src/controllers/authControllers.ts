module.exports.signup = (req: any, res: any) => {
  res.send('new user created!');
}

module.exports.login = (req: any, res: any) => {
  res.send('user logged in..Welcome!');
}

module.exports.logout = (req: any, res: any) => {
  res.send('user logged out..Bye!');
}