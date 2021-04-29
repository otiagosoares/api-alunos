import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    try {
      const novoAluno = await Aluno.create({
        nome: 'Tiago',
        sobrenome: 'Soares',
        email: 'email@email.com',
        idade: 31,
        peso: 78.100,
        altura: 1.74,
      });
      res.json(novoAluno);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new HomeController();
