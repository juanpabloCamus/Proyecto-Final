const axios = require('axios');

const user = [
    {
        fullName: 'Mati Monas',
        last_name: 'Monas',
        email: 'matimonas97@notevoyadecir.com',
        password: '2646545645sa46d',
        date_birth: '2022-05-10',
        profile_pic: 'https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {   
        fullName: 'Juan Pablo Camus',
        email: 'juanpablo@gmail.com',
        password: 'sdasdasd545',
        date_birth: '1980-02-23',
        profile_pic: 'https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {   
        fullName: 'Alberto Ortolani',
        email: 'betitorompehuevos@uruguayprovincia.com',
        password: 'sfee45454',
        date_birth: '2000-11-02',
        profile_pic: 'https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {   
        fullName: 'Daniel Sanchez',
        email: 'dani@gmail.com',
        password: 'dsfdsfsf1654',
        date_birth: '1987-07-06',
        profile_pic: 'https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {   
        fullName: 'Agustin Banegas',
        email: 'agus@notevoyadecir.com',
        password: '2abc6465456',
        date_birth: '1995-12-28',
        profile_pic: 'https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {   
        fullName: 'Paloma Vaira',
        email: 'palo@notevoyadecir.com',
        password: '26465456',
        date_birth: '2000-05-10',
        profile_pic: 'https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {   
        fullName: 'Elon Musk',
        email: 'elon@millonario.com',
        password: '26465456',
        date_birth: '2022-05-10',
        profile_pic: 'https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
]

const company = [
    {
        name:'Microsoft',
        email:'microsoft@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'California',
        logo:"https://www.insights.la/wp-content/uploads/2015/04/Microsoft-logo-m-box-880x660.png",
        description:'A software company',
        speciality: 'OS & Software',
        size: '+50000',
        foundation: '1970-10-25',
        web_site: 'microsoft.com',
        banner: 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/banner.png',
    },
    {
        name:'Apple',
        email:'apple@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'Palo Alto, CA',
        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/640px-Apple-logo.png",
        description:'iPhone forever',
        speciality: 'OS & devices',
        size: '0 - 500',
        foundation: '1970-10-25',
        web_site: 'apple.com',
        banner: 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/banner.png',
    },
    {
        name:'Google',
        email:'Google@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'New York',
        logo:"https://1000marcas.net/wp-content/uploads/2020/02/logo-Google.png",
        description:'A search company',
        speciality: 'Search Engine',
        size: '0 - 500',
        foundation: '1970-10-25',
        web_site: 'google.com',
        banner: 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/banner.png',
    },
    {
        name:'Tesla',
        email:'Tesla@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'Los Angeles',
        logo:"https://1000marcas.net/wp-content/uploads/2019/12/Tesla-logo.png",
        description:'A electric cars company',
        speciality: 'Electric Cars',
        size: '5000 - 10000',
        foundation: '1970-10-25',
        web_site: 'tesla.com',
        banner: 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/banner.png',
    },
    {
        name:'Nasa',
        email:'nasa@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'Miami',
        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png",
        description:'A space company',
        speciality: 'To the moon',
        size: '2000 - 5000',
        foundation: '1970-10-25',
        web_site: 'nasa.com',
        banner: 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/banner.png',
    },
    {
        name:'Meta',
        email:'meta@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'Boston',
        logo:"https://neuronamagazine.com/wp-content/uploads//2022/03/Meta-Logo.png",
        description:'A social network company',
        speciality: 'Social Networks',
        size: '10000 - 50000',
        foundation: '1970-10-25',
        web_site: 'meta.com',
        banner: 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/banner.png',
    },
    {
        name:'Nintendo',
        email:'nintendo@gmail.com',
        password:'dasd45a46',
        country:'Japan',
        city:'Tokyo',
        logo:"https://1000marcas.net/wp-content/uploads/2019/12/logo-Nintendo.png",
        description:'A software company',
        speciality: 'Videogames',
        size: '500 - 2000',
        foundation: '1970-10-25',
        web_site: 'nintendo.com',
        banner: 'https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/banner.png',
    },
]

const jobs = [
    {
        position:'NodeJs Developer',
        description:'Deberas construir un server para nuestra nueva APP',
        english_level:'Basic',
        salary_range:'1000$ - 3000$',
        requirements: 'Ponerse a hardcodear 24/7 pibe, laburar los finde semanas',
        seniority: 'Senior'
    },
    {
        position:'React Native Developer',
        description:'Deberas construir una APP para nuestra empresa',
        salary_range:'3000$ - 6000$',
        requirements: 'Ponerse a hardcodear 24/7 pibe, laburar los finde semanas',
        seniority: 'Junior',
        time: 'Full-Time'
    },
    {
        position:'Full Stack Dev',
        description:'Deberas construir un SPA para la empresa',
        english_level:'Conversational',
        salary_range:'1000$ - 3000$',
        requirements: 'Ponerse a hardcodear 24/7 pibe, laburar los finde semanas',
        seniority: 'Semi-Senior',
        time: 'Part-Time'
    },
    {
        position:'Blockchain Developer',
        description:'Deberas construir un smart contract en la red de Etherium',
        english_level:'Advanced or Native',
        salary_range:'1000$ - 3000$',
        requirements: 'Ponerse a hardcodear 24/7 pibe, laburar los finde semanas',
        seniority: 'Semi-Senior'
    },
    {
        position:'Mobile - IOS Dev',
        description:'Deberas construir una APP que desplegable en la app store',
        salary_range:'3000$ - 6000$',
        requirements: 'Ponerse a hardcodear 24/7 pibe, laburar los finde semanas',
        seniority: 'Junior',
    },
    {
        position:'Backend Dev',
        description:'Deberas construir un server para nuestra nueva APP',
        salary_range:'3000$ - 6000$',
        requirements: 'Ponerse a hardcodear 24/7 pibe, laburar los finde semanas',
        seniority: 'Senior'
    },
    {
        position:'Software Enginner',
        description:'Deberas construir un sistema para la empresa',
        salary_range:'3000$ - 6000$',
        requirements: 'Ponerse a hardcodear 24/7 pibe, laburar los finde semanas',
        seniority: 'Junior',
    },
]

const techs = [
    {
        name: 'JavaScript'
    },
    {
        name: 'HTML'
    },
    {
        name: 'CSS'
    },
    {
        name: 'React'
    },
    {
        name: 'NodeJS'
    },
    {
        name: 'PHP'
    },
    {
        name: 'Python'
    },
    {
        name: 'NextJS'
    },
    {
        name: 'CSharp'
    },
    {
        name: 'C'
    },
    {
        name: 'Cplusplus'
    },
    {
        name: 'TypeScript'
    },
    {
        name: 'Cplus'
    },
    {
        name: 'Assembler'
    },
    {
        name: 'Java'
    },
    {
        name: 'Pascal'
    },
    {
        name: 'SQL'
    },
    {
        name: 'Ruby'
    },
    {
        name: 'Swift'
    }
]

const options = {
    method: 'GET',
    url: 'https://microsoft-translator-text.p.rapidapi.com/languages',
    params: {'api-version': '3.0'},
    headers: {
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
      'X-RapidAPI-Key': '9d3f099d39msh1a9c6f7625046bdp1dddc3jsna5bac18f6940'
    }
};
async function lang(){
    let data
    await axios.request(options).then(r => data = r.data.translation)
    let lang = []
    for (const property in data) {
        let obj = {}
        obj.name = data[property].name
        lang.push(obj);
    }
    return lang
}
const languages = lang();

module.exports = {
    user,
    company,
    jobs,
    techs,
    languages
}