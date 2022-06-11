const axios = require('axios');

const user = [
    {
        fullName: 'Mati Monas',
        email: 'mati@gmail.com',
        password: 'mati',
        date_birth: '2022-05-10',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Buenos Aires',
        stack: 'Back End Enginer'
    },
    {   
        fullName: 'Juan Pablo Camus',
        email: 'juanpablo@gmail.com',
        password: 'juampi',
        date_birth: '1980-02-23',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Buenos Aires',
        stack: 'Front End Developer'
    },
    {   
        fullName: 'Alberto Ortolani',
        email: 'beto@gmail.com',
        password: 'beto123',
        date_birth: '2000-11-02',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Buenos Aires',
        stack: 'Mobile Developer'
    },
    {   
        fullName: 'Daniel Sanchez',
        email: 'dani@gmail.com',
        password: 'dsfdsfsf1654',
        date_birth: '1987-07-06',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Buenos Aires',
        stack: 'Back End Enginer'
    },
    {   
        fullName: 'Agustin Banegas',
        email: 'agus@gmail.com',
        password: 'agus',
        date_birth: '1995-12-28',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Buenos Aires',
        stack: 'Back End Developer'
    },
    {   
        fullName: 'Paloma Vaira',
        email: 'palo@notevoyadecir.com',
        password: '26465456',
        date_birth: '2000-05-10',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Buenos Aires',
        stack: 'Software Enginer'
    },
    {   
        fullName: 'Elon Musk',
        email: 'elon@millonario.com',
        password: '26465456',
        date_birth: '2022-05-10',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Buenos Aires',
        stack: 'Software Enginer'
    },{   
        fullName: 'Carolina Leoni',
        email: 'caro@gmail.com',
        password: '2abc6465456',
        date_birth: '1995-12-28',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Cañada de Gomez',
        stack: 'Front End Developer'
    },{   
        fullName: 'Joan Alexander Quispe Cusi',
        email: 'jaqc@gmail.com',
        password: '2abc6465456',
        date_birth: '1995-12-28',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Peru',
        city: 'Lima',
        stack: 'Front End Developer'
    },{   
        fullName: 'Cristian Villalba',
        email: 'csv@gmail.com',
        password: '2abc6465456',
        date_birth: '1995-12-28',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        country: 'Argentina',
        city: 'Chaco',
        stack: 'Front End Developer'
    },
    {
        fullName: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
    }
]

const company = [
    {
        name:'Microsoft',
        email:'microsoft@gmail.com',
        password:'micro',
        country:'United States',
        city:'California',
        logo:"https://developer.microsoft.com/es-es/media/ms-logo.png",
        description:'Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.',
        speciality: 'OS & Software',
        size: '+50000',
        foundation: '1975-04-04',
        web_site: 'microsoft.com',
        banner: 'https://www.feynmangroup.com/wp-content/uploads/2015/04/MicrosoftLogo-1024x376.jpg',
        profileType:'company'
    },
    {
        name:'Apple',
        email:'apple@gmail.com',
        password:'app',
        country:'United States',
        city:'Cupertino, CA',
        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/640px-Apple-logo.png",
        description:'Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services headquartered in Cupertino, California, United States',
        speciality: 'OS & devices',
        size: '0 - 500',
        foundation: '1970-10-25',
        web_site: 'apple.com',
        banner: 'https://www.bram.us/wordpress/wp-content/uploads/2021/05/apple-banner.jpg',
    },
    {
        name:'Google',
        email:'Google@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'New York',
        logo:"https://1000marcas.net/wp-content/uploads/2020/02/logo-Google.png",
        description:'Google LLC is an American multinational technology company that focuses on artificial intelligence, search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics',
        speciality: 'Search Engine',
        size: '0 - 500',
        foundation: '1970-10-25',
        web_site: 'google.com',
        banner: 'https://www.cardanmarketing.com/wp-content/uploads/2019/11/img-adwords1-min.jpg',
    },
    {
        name:'Tesla',
        email:'Tesla@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'Los Angeles',
        logo:"https://1000marcas.net/wp-content/uploads/2019/12/Tesla-logo.png",
        description:'Tesla, Inc. is an American automotive and clean energy company based in Austin, Texas. Tesla designs and manufactures electric vehicles, battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services. ',
        speciality: 'Electric Cars',
        size: '5000 - 10000',
        foundation: '1970-10-25',
        web_site: 'tesla.com',
        banner: 'https://pulse.icdm.com.my/wp-content/uploads/2020/02/art69_article-banner.png',
    },
    {
        name:'Nasa',
        email:'nasa@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'Miami',
        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png",
        description:'The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civil space program, aeronautics research, and space research.',
        speciality: 'To the moon',
        size: '2000 - 5000',
        foundation: '1970-10-25',
        web_site: 'nasa.com',
        banner: 'https://krmangalam.com/wp-content/uploads/2018/09/banner-nasa-page.jpg',
    },
    {
        name:'Meta',
        email:'meta@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'Boston',
        logo:"https://neuronamagazine.com/wp-content/uploads//2022/03/Meta-Logo.png",
        description:'Meta Platforms, Inc., doing business as Meta and formerly known as Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company is the parent organization of Facebook, Instagram, and WhatsApp, among other subsidiaries.',
        speciality: 'Social Networks',
        size: '10000 - 50000',
        foundation: '1970-10-25',
        web_site: 'meta.com',
        banner: 'https://hablandoclaro.pe/storage/images/2021/Movilidad%20Sostenible/meta-banner-meta.jpg',
    },
    {
        name:'Nintendo',
        email:'nintendo@gmail.com',
        password:'dasd45a46',
        country:'Japan',
        city:'Tokyo',
        logo:"https://1000marcas.net/wp-content/uploads/2019/12/logo-Nintendo.png",
        description:'Nintendo is an international leader in the interactive entertainment industry, and develops, produces and markets software and hardware. Our games and our TV-linked and mobile consoles set the standards in terms of games fun and challenging, family-friendly entertainment. The goal of our work is to make people smile.',
        speciality: 'Videogames',
        size: '500 - 2000',
        foundation: '1970-10-25',
        web_site: 'nintendo.com',
        banner: 'https://cache.tradeinn.com/images/brand-page/banner_3686_16.jpg',
    },
]

const jobs = [
    {
        position:'NodeJs Developer',
        description:'Deberas construir un server para nuestra nueva APP',
        english_level:'Basic',
        salary_range:'1000$ - 3000$',
        requirements: `Compromiso con el trabajo que se le asigna. Trabajo de forma eficiente.`,
        seniority: 'Senior'
    },
    {
        position:'React Native Developer',
        description:'Deberas construir una APP para nuestra empresa',
        salary_range:'3000$ - 6000$',
        requirements: `Compromiso con el trabajo que se le asigna. Trabajo de forma eficiente.`,
        seniority: 'Junior',
        time: 'Full-Time'
    },
    {
        position:'Full Stack Dev',
        description:'Deberas construir un SPA para la empresa',
        english_level:'Conversational',
        salary_range:'1000$ - 3000$',
        requirements: `Compromiso con el trabajo que se le asigna. Trabajo de forma eficiente.`,
        seniority: 'Semi-Senior',
        time: 'Part-Time'
    },
    {
        position:'Blockchain Developer',
        description:'Deberas construir un smart contract en la red de Etherium',
        english_level:'Advanced or Native',
        salary_range:'1000$ - 3000$',
        requirements: `Compromiso con el trabajo que se le asigna. Trabajo de forma eficiente.`,
        seniority: 'Semi-Senior'
    },
    {
        position:'Mobile - IOS Dev',
        description:'Deberas construir una APP que desplegable en la app store',
        salary_range:'3000$ - 6000$',
        requirements: `Compromiso con el trabajo que se le asigna. Trabajo de forma eficiente.`,
        seniority: 'Junior',
    },
    {
        position:'Backend Dev',
        description:'Deberas construir un server para nuestra nueva APP',
        salary_range:'3000$ - 6000$',
        requirements: `Compromiso con el trabajo que se le asigna. Trabajo de forma eficiente.`,
        seniority: 'Senior'
    },
    {
        position:'Software Enginner',
        description:'Deberas construir un sistema para la empresa',
        salary_range:'3000$ - 6000$',
        requirements: `Compromiso con el trabajo que se le asigna. Trabajo de forma eficiente.`,
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


module.exports = {
    user,
    company,
    jobs,
    techs
}