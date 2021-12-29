//@ts-check



console.clear();

const puppeteer = require('puppeteer');


const Discord = require('discord.js');

const config = require("./Data/config.json");

const intents = new Discord.Intents(32767);

const client = new Discord.Client({intents});

const { MessageEmbed } = require('discord.js');

var sessionStarted = new Boolean(false);

var messageArr = new Array();

//let event = new Event('click');




const helpEmb = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription(" ");


    
const sessionEmb = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription(" ")
    .addFields({name: "Song Title", value: " "},
    {name: "Artist", value: " "},
    {name: "Link", value: " "}
    );


    class Session {

        Session(songName, artist) {
            this.songName = songName;
            this.artist = artist;
        } 

        setFields(){
            sessionEmb.fields = [];
            

            switch (messageArr.length - 1) {
                case 0:
                    
                    break;
                case 1:
                    sessionEmb.addFields
                    (
                    
                    {name: "Song Title", value: this.songName, inline:false},
                    {name: "Artist", value: 'Unknown', inline:false}
        
                    );
                    break;
                case 2:
                    sessionEmb.addFields
                    (
                    
                    {name: "Song Title", value: this.songName, inline:false},
                    {name: "Artist", value: this.artist, inline:false}
        
                    );
                    break;
            
                default:
                    break;
            }





        }

        
    
    }
    
    var session1 = new Session();

client.on('ready', () => {
    console.log('I\'m here');
    console.log(process.env.ENVIRONMENT);
});

client.on("messageCreate", message => {
    if (message.content.charAt(0) == config.prefix){
        message.content = message.content.slice(1);
        messageArr = message.content.split(" ");
        switch (messageArr[0]) {
            case "help":
                helpEmb.setDescription(
                    `Here are some commands you can use to get started:
                            !start starts a karaoke session
                            !start ghost starts a karaoke session without notifying others 
                            Once a karaoke session is started, you can use !fill to ask me to fill in the next line`);
                message.channel.send({ embeds: [helpEmb] });
                break;
            case "start":
                message.channel.send("Session started");
                sessionStarted = true;
    
                session1.songName = messageArr[1];
                session1.artist = messageArr[2];
                
                session1.setFields();
    
                message.channel.send({embeds: [sessionEmb]});
                searchLyrics("https://www.google.com/search?q=" + session1.songName + " " + session1.artist);

                break;
            
            case "fill":

                break;
            
            case "closeBrowser":
                break;
                
            default:
    
                break;
            
                
        }
    }
    

});






async function searchLyrics(url){
    const browser = await puppeteer.launch
        ({
        headless : (process.env.ENVIRONMENT == "CLOUD")
        });

    const page = await browser.newPage(); 
    
    await page.goto(url);
}



client.login(process.env["TOKEN"]);    //Change this value to whatever your discord token is. For security reasons, I'm going to be storing it in Heroku. 

