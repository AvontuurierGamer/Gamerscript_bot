const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    message.delete();

    var botEmbed =  new discord.MessageEmbed()
            .setTitle("Help")
            .setColor("#03fc0f")
            .addFields(
                {name: "!userinfo", value: "`zie speler informatie`"},
                {name: "!suggest", value: "`schrijf een suggestie`"},
                {name: "!review", value: "`schrijf een review`"},
            )
            .setFooter("Help")
            .setTimestamp()


        return message.channel.send(botEmbed);
    }
    

module.exports.help = {
    name: "help-overig"
}