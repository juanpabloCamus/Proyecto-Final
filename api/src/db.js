const { Sequelize, Op } = require('sequelize');
const CompanyAccount = require('../models/CompanyAccount');
const UserAccount = require('../models/UserAccount');
const Experience = require('../models/Experience');
const Education = require('../models/Education');

require('dotenv').config();

const {
    DB_USER, DB_PASSWORD, PORT,
} = process.env


const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${PORT}/proyecto_final_db`, {
    logging: false,
});

CompanyAccount(db);
UserAccount(db);
Experience(db);
Education(db);

//const {CompanyAccount, UserAccount} = db.models

module.exports = {
  ...db.models,
  db,
  Op
}