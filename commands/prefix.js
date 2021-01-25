const discord = require("discord.js");
const fs = require("fs");
const { formatWithOptions } = require("util");

module.exports.run = async (client, message,args) => {

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("je hebt geen toegang.");

    if(!args[0]) return message.reply("Gebruik: prefix <prefix>");

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {
        prefix: args[0]
    };

    fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if(err) console.log(err);
    });

    var embed = new discord.MessageEmbed()
        .setTitle("Prefix")
        .setColor("#ff0000")
        .setDescription(`Prefix is aangepast naar ${args[0]}.`);

    message.channel.send(embed);

}

module.exports.help = {
    name: "prefix"
}