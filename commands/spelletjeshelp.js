const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    message.delete();

    var botEmbed =  new discord.MessageEmbed()
            .setTitle("help-fun")
            .setColor("#03fc0f")
            .addFields(
                {name:"sps", value: "`Speel steen papier schaar tegen de bot`"}
            )
            .setFooter("help-fun")
            .setTimestamp()


        return message.channel.send(botEmbed);
    }
    

module.exports.help = {
    name: "help-fun"
}