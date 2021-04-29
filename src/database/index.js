import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';

const models = [Aluno];
const conn = new Sequelize(databaseConfig);

models.forEach((model) => model.init(conn));
