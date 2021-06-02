class HomeController {
  async index(req, res) {
    try {
      res.json('Home');
    } catch (error) {
      console.error(error);
    }
  }
}

export default new HomeController();
