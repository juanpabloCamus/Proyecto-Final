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


//const {CompanyAccount, UserAccount, Experience, Education, Job, AppliedJob, Technology} = db.models

/////////// RELACIONES DE JOBS //////////////

CompanyAccount.belongsToMany(Job, {through: "company_job"})
Job.belongsToMany(CompanyAccount, {through: "company_job"})

UserAccount.belongsToMany(Job, {through: "user_favorites"})
Job.belongsToMany(UserAccount, {through: "user_favorites"})

Technology.belongsToMany(Job, {through: "technology_job"})
Job.belongsToMany(Technology, {through: "technology_job"})

Job.hasMany(AppliedJob)
AppliedJob.belongsTo(Job)

///////////RELACIONES DE USER ACCOUNT//////////////

UserAccount.hasMany(AppliedJob)
AppliedJob.belongsTo(UserAccount)

Technology.belongsToMany(UserAccount, {through: "technology_job"})
UserAccount.belongsToMany(Technology, {through: "technology_job"})

UserAccount.hasMany(Experience)
Experience.belongsTo(UserAccount)

UserAccount.hasMany(Education)
Education.belongsTo(UserAccount)

// Country.belongsToMany(Turist_activity, {through: "country_ta"})
// Turist_activity.belongsToMany(Country, {through: "country_ta"})

module.exports = {
  ...db.models,
  db,
  Op
}