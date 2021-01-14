const discord = require("discord.js");
const botConfig = require("./botconfig.json");

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

    if (!message.content.startsWith(prefix)) return;

    var args = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, args);

});

client.login(process.env.token);