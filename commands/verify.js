const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var categoryID = "793769602739470338";

    if(message.channel.parentID != categoryID) return message.reply("dit kan alleen in #verify");

    const Role1 = message.guild.roles.cache.get("797135226672775200");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Antwoord binnen 30 seconden!")
        .setDescription(``)

    var embedEnd = new discord.MessageEmbed()
        .setColor("#00accf")
        .setTitle(`${message.author} joint de server!`)

    message.channel.send(embedPrompt).then(async msg => {

        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["✅","❌"])

        if(emoji == "✅") {

            msg.delete();

            const welkom = message.guild.channel.cache.getName('👋•welkom');

            message.channel(welkom).send("Welkom"); 

            message.member.roles.add(Role1);

        } else if(emoji == "❌") {

            msg.delete();

            message.reply("geanuleerd").then(msg => msg.delete({ timeout: 3000 }));
        }

    });
    
}

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}
    

module.exports.help = {
    name: "verify"
}