const { Sequelize, Op } = require('sequelize');
const CompanyAccount = require('./models/CompanyAccount')
const UserAccount = require('./models/UserAccount');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Job = require('./models/Job')
const AppliedJob = require('./models/AppliedJob')
const Technology = require('./models/Technology')
const Language = require('./models/Language')
require('dotenv').config();
const { user, company, jobs, techs, languages} = require('./data.js')

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
Language(db)

const {company_account, user_account, experience, education, job, applied_job, technology, language} = db.models

/////////// RELACIONES DE JOBS //////////////

job.belongsToMany(company_account, {through: "company_job"})
company_account.belongsToMany(job, {through: "company_job"})

// company_account.hasMany(job)
// job.belongsTo(company_account)

user_account.belongsToMany(job, {through: "user_favorites"})
job.belongsToMany(user_account, {through: "user_favorites"})

technology.belongsToMany(job, {through: "technology_job"})
job.belongsToMany(technology, {through: "technology_job"})

job.hasMany(applied_job)
applied_job.belongsTo(job)

///////////RELACIONES DE USER ACCOUNT//////////////

user_account.hasMany(applied_job)
applied_job.belongsTo(user_account)

user_account.belongsToMany(technology, {through: "technology_user"})
technology.belongsToMany(user_account, {through: "technology_user"})

language.belongsToMany(user_account, {through: "language_user"})
user_account.belongsToMany(language, {through: "language_user"})

user_account.hasMany(experience)
experience.belongsTo(user_account)

user_account.hasMany(education)
education.belongsTo(user_account)

//////////////// LOAD DATABASE ///////////////

async function loadDb(){
  let langs = await languages
  let users = await user_account.findAll();
  if(users.length > 0) return null

  language.bulkCreate(langs)

  techs.map((u) => {
    technology.create({
      name: u.name
    })
  })

  company.map((u) => {
    company_account.create({
      name: u.name,
      email: u.email,
      password: u.password,
      country: u.country,
      city: u.city,
      logo: u.logo,
      description: u.description,
      speciality: u.speciality,
      size: u.size,
      foundation: u.foundation,
      web_site: u.web_site,
      banner: u.banner,
      profileType: 'company'
    })
  })

  //RELACIONES CON USERS
  user.map(async (u) => {

    let us
    u.email !== 'admin@admin.com' ?
    us = await user_account.create({
      fullName: u.fullName,
      email: u.email,
      password: u.password,
      date_birth:u.date_birth,
      profile_pic:u.profile_pic,
      description:u.description,
      profileType: 'develop',
      country: u.country,
      city: u.city,
      stack: u.stack
    }) : 
    us = await user_account.create({
      fullName: u.fullName,
      email: u.email,
      password: u.password,
      date_birth:u.date_birth,
      profile_pic:u.profile_pic,
      description:u.description,
      profileType: 'admin'
    })

    for (let i = 0; i < 5; i++) {
      await us.addLanguage(i)
    }

    for (let i = 0; i < 4; i++) {
      await us.addTechnology(us.id + i)
    }
  })

  //RELACIONES CON JOBS
  jobs.map(async (u) => {

    let j

    j = await job.create({
      position: u.position,
      description: u.description ,
      time: u.time ,
      salary_range: u.salary_range ,
      english_level: u.english_level ,
      requirements: u.requirements ,
      seniority: u.seniority,
    })

 
    await j.addTechnology(j.dataValues.id + 1)
    await j.addTechnology(j.dataValues.id + 2)
    await j.addTechnology(j.dataValues.id + 3)
    

    
    await j.addCompany_account(j.dataValues.id)
    

    for (let i = 0; i < company.length; i++) {
      await j.addUser_account(i)
    }

  })

}
module.exports = {
  ...db.models,
  db,
  Op,
  loadDb
}