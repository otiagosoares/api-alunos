import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async create(req, res) {
    try {
      const { email = '', password = '' } = req.body;
      console.log(req.body);

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Nao autorizado'],
        });
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuario nao encontrado'],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          errors: ['Senha invalida'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      res.json({
        token,
        status: 'ok',
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new TokenController();
