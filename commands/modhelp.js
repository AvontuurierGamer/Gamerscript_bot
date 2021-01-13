const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    message.delete();

    var botEmbed =  new discord.MessageEmbed()
            .setTitle("Help-mod")
            .setColor("#03fc0f")
            .addFields(
                {name:"embed", value: "`maak een embed in een bepaald kanaal`"},
                {name: "kick", value: "`hiermee kan een staff lid iemand kicken`"},
                {name: "ban", value: "`hiermee kan een staff lid iemand bannen`"},
                {name: "clear", value: "`verwijder een aantal berichten`"}
            )
            .setFooter("Help-mod")
            .setTimestamp()


        return message.channel.send(botEmbed);
    }
    

module.exports.help = {
    name: "help-mod"
}