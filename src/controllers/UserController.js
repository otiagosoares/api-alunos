import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const novoUser = await User.create({
        nome: 'Tiago',
        email: 'email@email.com',
        password: '123456',
      });
      return res.json(novoUser);
    } catch (e) {
      console.error(e);
      const errors = e.errors.map((err) => err.message);
      return res.status(400).json({
        message: `Bad Request - ${errors}`,
      });
    }
  }
}

export default new UserController();
