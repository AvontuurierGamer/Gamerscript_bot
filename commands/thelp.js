const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("help")
        .addField("overig = 😉")
        .addField("mod = ⭐")
        .addField("ticket = 🎫")
        .addField("fun = 😁")
        .addField("anuleren = ❌")
        .setFooter("help")
        .setTimestamp()

    var embedhelpoverig = new discord.MessageEmbed()
        .setTitle("Help")
            .setColor("#03fc0f")
            .addFields(
                {name: "!userinfo", value: "`zie speler informatie`"},
                {name: "!suggest", value: "`schrijf een suggestie`"},
                {name: "!review", value: "`schrijf een review`"},
            )
            .setFooter("Help")
            .setTimestamp()

    message.channel.send(embedPrompt).then(async msg => {

        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["😉", "⭐", "🎫", "😁", "❌"])

        if(emoji == "😉") {

            msg.edit(embedhelpoverig).then((msg) =>  {
                setTimeout(function(){
                msg.edit(embedtest);
                }, 1)
            })

        } else if(emoji == "⭐") {

        } else if(emoji == "🎫") {

        } else if(emoji == "😁") {

        } else if(emoji == "❌") {
            
            message.delete();

            message.send("geanuleerd").then(msg => msg.delete({timeout: 5000}));
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
    name: "help"
}