const { Sequelize, Op } = require('sequelize');
const CompanyAccount = require('./models/CompanyAccount')
const UserAccount = require('./models/UserAccount');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Job = require('./models/Job')
const AppliedJob = require('./models/AppliedJob')
const Technology = require('./models/Technology')
const OtherTechs = require('./models/OtherTechs')
const Meeting = require('./models/Meeting')
const UserNotis = require('./models/UserNotis')
const CompanyNotis = require('./models/CompanyNotis')

require('dotenv').config();
const { user, company, jobs, techs} = require('./data.js')

const {
    DB_USER, DB_PASSWORD, DB_NAME, DB_HOST
} = process.env

// const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/proyecto_final_db`, {
//     logging: false,
// });

let db =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/proyecto_final_db`,
        { logging: false, native: false }
      );

CompanyAccount(db);
UserAccount(db);
Experience(db); 
Education(db);
Job(db);
AppliedJob(db);
Technology(db);
OtherTechs(db);
Meeting(db);
UserNotis(db);
CompanyNotis(db);

const {company_account, user_account, experience, education, job, applied_job, technology, otherTechs, meeting, usernotis, compnotis} = db.models


/////////// RELACIONES DE JOBS //////////////

job.belongsToMany(company_account, {through: "company_job", timestamps:false})
company_account.belongsToMany(job, {through: "company_job", timestamps:false})

user_account.belongsToMany(job, {through: "user_favorites", timestamps:false})
job.belongsToMany(user_account, {through: "user_favorites", timestamps:false})

technology.belongsToMany(job, {through: "technology_job", timestamps:false})
job.belongsToMany(technology, {through: "technology_job", timestamps:false})

otherTechs.belongsToMany(job, {through: "otherTechs_job", timestamps:false})
job.belongsToMany(otherTechs, {through: "otherTechs_job", timestamps:false})

job.hasMany(applied_job)
applied_job.belongsTo(job)

///////////RELACIONES DE USER ACCOUNT//////////////

user_account.hasMany(applied_job)
applied_job.belongsTo(user_account)

user_account.belongsToMany(technology, {through: "technology_user", timestamps:false})
technology.belongsToMany(user_account, {through: "technology_user", timestamps:false})

user_account.hasMany(experience)
experience.belongsTo(user_account)

user_account.hasMany(education)
education.belongsTo(user_account)

user_account.hasMany(meeting)
meeting.belongsTo(user_account)

company_account.hasMany(meeting)
meeting.belongsTo(company_account)

user_account.hasMany(usernotis)
usernotis.belongsTo(user_account)

company_account.hasMany(compnotis)
compnotis.belongsTo(company_account)

//////////////// LOAD DATABASE ///////////////

async function loadDb(){
  let users = await user_account.findAll();
  if(users.length > 0) return null


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
    

    await j.addUser_account(j.dataValues.id)

  })

}
module.exports = {
  ...db.models,
  db,
  Op,
  loadDb
}