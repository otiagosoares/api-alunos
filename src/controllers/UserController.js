import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
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
      const { id } = req.params;
      const user = await User.findByPk(id);
      return res.json(user);
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
      const { nome, email, password } = req.body;
      const novoUser = await User.create({
        nome, email, password,
      });
      return res.status(201).json(novoUser);
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
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID not missing'],
          message: 'Bad Request',
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          errors: ['User not found'],
          message: 'Not Found',
        });
      }

      const userUpdated = await user.update(req.body);
      return res.json(userUpdated);
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
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID not missing'],
          message: 'Bad Request',
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          errors: ['User not found'],
          message: 'Not Found',
        });
      }

      const userDestroied = await user.destroy();
      return res.json(userDestroied);
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
