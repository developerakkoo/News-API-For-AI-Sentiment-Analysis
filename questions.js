module.exports ={
    questions : [
        {
        type: 'input',
        name: 'name',
        message: "Welcome to News data collection App, What's your name?",
        },
    ],
    questions1 : [
        {
        name: 'name',
        type: 'list',
        message: "You want run this app ?  (Use arrow key)",
        choices: ["1) Yes : START", "2) No : CLOSE"]
        },
    ],
    questions2 :[
        {
        name: 'name',
        type: 'list',
        message: "You want to exit ? (Use arrow key)",
        choices: ["1) Yes : EXIT", "2) No : Start App"]
        },
    ]
}