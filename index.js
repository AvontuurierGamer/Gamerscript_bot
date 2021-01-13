const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelFile = require("./data/level.json");

const fs = require("fs");

const client = new discord.Client();

client.commands = new discord.Collection();

client.login(botConfig.token);

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("kon geen files vinden");
        return;
    }

    jsFiles.forEach(f => {

        var fileGet = require(`./commands/${f}`);
        console.log(`de file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);
    });

    client.on("ready", async () => {

        console.log(`${client.user.username} is online`);

        client.user.setActivity("!help", {
            type: "WATCHING"
        });

    });
    
    client.on('guildMemberAdd', async newMember => {
   
        const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.id === '793769602739470340')
        welcomeChannel.send('test')

        let msgEmbed = new Discord.MessageEmbed()
            .setTitle (`test`)
  
    if (newMember.bot) return; 

    message.channel.send(msgEmbed)
});

});


client.on("message", async message => {
    if (message.author.bot) {
        return;
    }

    if (message.channel.type === "dm") {
        return;
    }

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    RandomXp(message);

    if (!message.content.startsWith(prefix)) return;

    var args = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, args);

});

client.login(process.env.token); 

function RandomXp(message) {

    var randomNumber = Math.floor(Math.random() * 15) + 1;

    var idUser = message.author.id;

    if(!levelFile[idUser]) {
        levelFile[idUser] = {
            xp: 0,
            level: 0
        }
    }

    levelFile[idUser].xp += randomNumber;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;

    var nextLevelXp = levelUser * 300;

    if(nextLevelXp == 0) nextLevelXp = 100;

    if(xpUser >= nextLevelXp) {

        levelFile[idUser].level += 1;

        var embedLevel = new discord.MessageEmbed()
            .setDescription("**Level up**")
            .setColor("#00ff00")
            .addField("Nieuw level: ", levelFile[idUser].level);
        message.channel.send(embedLevel);

    }

}

fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {
    if (err) console.log(err);
});