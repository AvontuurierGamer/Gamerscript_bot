const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "793774861276676136";

    if(!message.member.hasPermission("KICK_MEMBER")) return message.reply(`${message.author} je kan dit niet doen!`);

    if(message.channel.parentID == categoryID) {
        message.channel.delete();

    var embedCreateTicket = new discord.MessageEmbed()
        .setTitle("Ticket, " + message.channel.name)
        .setDescription("Het ticket is gemarkeerd als **compleet**.")
        .setFooter("Ticket gesloten");

    var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
    if (!ticketChannel) return message.reply("Kanaal bestaat niet");

    ticketChannel.send(embedCreateTicket);

    } else {

        message.channel.send("dit moet in een ticket.");

    }
    
}
    

module.exports.help = {
    name: "close"
}