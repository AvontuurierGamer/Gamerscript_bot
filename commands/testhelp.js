const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const Role1 = message.guild.roles.cache.get("797135226672775200");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("reageer met ⏩ om door te gaan!")
        .setFooter("test")
        .setTimestamp()

    message.channel.send(embedPrompt).then(async msg => {

        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["⏩","❌"])

        if(emoji == "⏩") {

            msg.delete();

            message.edit("test")

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
    name: "test"
}