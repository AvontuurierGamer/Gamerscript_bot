const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var hack = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    if(!hack) return message.reply("Wie moet ik hacken?");

    var embedhack1 = new discord.MessageEmbed()
        .setTitle(`${hack} word gehackt even geduld`)
        .setColor("#ff0000")
        .setFooter("aan het hacken...")
        .setTimestamp()

    var embedhack2 = new discord.MessageEmbed()
        .setTitle(`${hack} zijn / haar discordwachtwoord is: wochntw00rd32`)
        .setColor("#ff0000")
        .setFooter("aan het hacken...")
        .setTimestamp()

    var embedhack3 = new discord.MessageEmbed()
        .setTitle(`${hack} zijn / haar mail is: ${hack}@gmail.com`)
        .setColor("#ff0000")
        .setFooter("aan het hacken...")
        .setTimestamp()

    channel.send(embedhack1).then(msg => msg.edit(embedhack2)({ timeout: 1000 })).then(msg => msg.edit(embedhack3)({ timeout: 1000 }));
    
}        

module.exports.help = {
    name: "hack"
}