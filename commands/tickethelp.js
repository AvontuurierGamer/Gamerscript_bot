const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    message.delete();

    var botEmbed =  new discord.MessageEmbed()
            .setTitle("help-ticket")
            .setColor("#03fc0f")
            .addFields(
                {name:"ticket", value: "`maak een ticket aan`"},
                {name: "close", value: "`sluit een ticket dit kan alleen een stafflid`"},
                {name: "add", value: "`voeg iemand toe aan een ticket`"},
                {name: "remove", value: "`verwijder iemand uit een ticket`"}
            )
            .setFooter("help-ticket")
            .setTimestamp()


        return message.channel.send(botEmbed);
    }
    

module.exports.help = {
    name: "help-ticket"
}