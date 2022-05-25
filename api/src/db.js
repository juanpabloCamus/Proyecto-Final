const { Sequelize, Op } = require('sequelize');
const CompanyAccount = require('./models/CompanyAccount')
const UserAccount = require('./models/UserAccount');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Job = require('./models/Job')
const AppliedJob = require('./models/AppliedJob')
const Technology = require('./models/Technology')
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
Job(db);
AppliedJob(db);
Technology(db);


const {company_account, user_account, experience, education, job, applied_job, technology} = db.models

/////////// RELACIONES DE JOBS //////////////

company_account.belongsToMany(job, {through: "company_job"})
job.belongsToMany(company_account, {through: "company_job"})

user_account.belongsToMany(job, {through: "user_favorites"})
job.belongsToMany(user_account, {through: "user_favorites"})

technology.belongsToMany(job, {through: "technology_job"})
job.belongsToMany(technology, {through: "technology_job"})

job.hasMany(applied_job)
applied_job.belongsTo(job)

///////////RELACIONES DE USER ACCOUNT//////////////

user_account.hasMany(applied_job)
applied_job.belongsTo(user_account)

technology.belongsToMany(user_account, {through: "technology_job"})
user_account.belongsToMany(technology, {through: "technology_job"})

user_account.hasMany(experience)
experience.belongsTo(user_account)

user_account.hasMany(education)
education.belongsTo(user_account)

// Country.belongsToMany(Turist_activity, {through: "country_ta"})
// Turist_activity.belongsToMany(Country, {through: "country_ta"})

module.exports = {
  ...db.models,
  db,
  Op
}