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

    var embedhelpfun =  new discord.MessageEmbed()
        .setTitle("help")
        .setColor("#03fc0f")
        .addFields(
            {name:"sps", value: "`Speel steen papier schaar tegen de bot`"}
        )
        .setFooter("help")
        .setTimestamp()

        var embedhelpmod =  new discord.MessageEmbed()
            .setTitle("Help")
            .setColor("#03fc0f")
            .addFields(
                {name:"embed", value: "`maak een embed in een bepaald kanaal`"},
                {name: "kick", value: "`hiermee kan een staff lid iemand kicken`"},
                {name: "ban", value: "`hiermee kan een staff lid iemand bannen`"},
                {name: "clear", value: "`verwijder een aantal berichten`"}
            )
            .setFooter("Help")
            .setTimestamp()

        var embedhelpticket =  new discord.MessageEmbed()
            .setTitle("help")
            .setColor("#03fc0f")
            .addFields(
                {name:"ticket", value: "`maak een ticket aan`"},
                {name: "close", value: "`sluit een ticket dit kan alleen een stafflid`"},
                {name: "add", value: "`voeg iemand toe aan een ticket`"},
                {name: "remove", value: "`verwijder iemand uit een ticket`"}
            )
            .setFooter("help")
            .setTimestamp()

    message.channel.send(embedPrompt).then(async msg => {

        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["😉", "⭐", "🎫", "😁", "❌"])

        if(emoji == "😉") {

            msg.reactions.removeAll()

            msg.edit(embedhelpoverig).then((msg) =>  {
                setTimeout(function(){
                msg.edit(embedhelpoverig);
                }, 1)
            })

        } else if(emoji == "⭐") {

            msg.reactions.removeAll()

            msg.edit(embedhelpmod).then((msg) =>  {
                setTimeout(function(){
                msg.edit(embedhelpmod);
                }, 1)
            })

        } else if(emoji == "🎫") {

            msg.reactions.removeAll()

            msg.edit(embedhelpticket).then((msg) =>  {
                setTimeout(function(){
                msg.edit(embedhelpticket);
                }, 1)
            })

        } else if(emoji == "😁") {

            msg.reactions.removeAll()

            msg.edit(embedhelpfun).then((msg) =>  {
                setTimeout(function(){
                msg.edit(embedhelpfun);
                }, 1)
            })

        } else if(emoji == "❌") {

            msg.reactions.removeAll()

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