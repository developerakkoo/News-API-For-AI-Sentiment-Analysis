const axios = require('axios');
const moment  = require('moment');
const fs = require('fs');
const inquirer = require('inquirer');
const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.rect);
const {questions,questions1,questions2} = require('./questions');
const csvWriter =  require('csv-writer');



const folderPath = `public/${moment().format('DD-MM-YYYY')}.csv`;
// if (!fs.existsSync(folderPath)) {
//     fs.mkdir(folderPath,(err) =>{
//         if(err){
//             console.log(err);
//         }
//         console.log("mainDir created successfully");
//     });
//     }
const writer = csvWriter.createObjectCsvWriter(
    {path:folderPath,
    header:[
        { id: 'author', title: 'Author' },
        { id: 'title', title: 'Title'},
        { id: 'description', title: 'Description' },
        { id: 'content', title: 'content' },
        { id: 'publishedAt', title: 'publishedAt' },
]});


inquirer.prompt(questions).then(answers => {
    console.log(`Hi ${answers.name}!`);
    AppStartQ()
});

function AppStartQ(){
    inquirer.prompt(questions1).then(answers => {
        if (answers.name == '1) Yes : START') {
            console.log(`okay!`); 
            start() 
        }else{
            confirmInput()
            // console.log(`Thank you :)`);
        }
    });
}

function confirmInput(){
    inquirer.prompt(questions2).then(answers => {
        if (answers.name == '1) Yes : EXIT') {
            console.log(`Thank you :)`);  
        }else{
            AppStartQ()
        }
    });
}


function start(){
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://newsapi.org/v2/everything?q=bajaj finance&from=2023-06-29&sortBy=publishedAt&apiKey=cb84eeb4d7aa4f78816169f298d2d318',
        headers: { }
    };
    axios.request(config)
    .then((response) => {
        JSON.stringify(response.data.articles)
        // console.log(JSON.stringify(response.data.articles));
        covertAndWriteDataToCsv(response.data.articles) //converting data
    })
    .catch((error) => {
        console.log(error);
    });
}

function covertAndWriteDataToCsv(data){
try {
    let metaData = []
data.forEach(data => {
    metaData.push({
        author : data.author,
        title : data.title,
        description : data.description,
        content : data.content,
        publishedAt : data.publishedAt
    });
});

/******  write to csv ********/
writer.writeRecords(metaData)
    .then(() =>{
    console.log(`DONE csv generated filePath: ${folderPath}`);
    }).catch((error) =>{
    console.log(error);
    });
} catch (error) {
    console.log(error);
    } 
}