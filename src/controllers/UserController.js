import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      console.error(`Error: ${e}`);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
        message: 'Bad Request',
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          errors: ['Not Found'],
          status: 400,
        });
      }
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
        message: 'Bad Request',
      });
    }
  }

  async create(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;

      return res.status(201).json({ id, nome, email });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
        message: 'Bad Request',
      });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;

      console.log(userId);

      if (!userId) {
        console.log('userId', req.userId);
        return res.status(400).json({
          errors: ['ID not missing'],
          message: 'Bad Request',
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          errors: ['User not found'],
          message: 'Not Found',
        });
      }

      const userUpdated = await user.update(req.body);
      const { id, nome, email } = userUpdated;
      return res.json({ id, nome, email });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
        message: 'Bad Request',
      });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req;

      if (!userId) {
        return res.status(400).json({
          errors: ['ID not missing'],
          message: 'Bad Request',
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          errors: ['User not found'],
          message: 'Not Found',
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
        message: 'Bad Request',
      });
    }
  }
}

export default new UserController();
