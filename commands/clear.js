const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt hier geen toestemming voor");

    if(!args[0]) return message.reply("Geef aantal op");

    if(Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if(args[0] <= 0) {
                message.reply("ik kan geen 0 berichten verwijderen").then(msg => msg.delete({timeout: 3000}));
            } else if(args[0] == 1) {
                message.reply("ik heb 1 bericht verwijderd").then(msg => msg.delete({timeout: 3000}));
            } else {
                message.reply(`ik heb ${args[0]} berichten verwijderd`).then(msg => msg.delete({timeout: 3000}));
            }

        })

    }else{
        return message.reply("geef een getal op");
    }

}
    

module.exports.help = {
    name: "clear"
}