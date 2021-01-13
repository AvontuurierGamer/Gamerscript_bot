const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var suggest = args.join(' ');
    if(!suggest) return message.channel.send("geen suggest meegegeven");

    var suggestEmbed = new discord.MessageEmbed()
        .setTitle(`Suggestie bij ${message.author.username}`)
        .setColor("#ff0000")
        .addField("Suggestie", suggest)
        .setFooter("Suggest")
        .setTimestamp()
        .setImage(message.author.avatarURL())

    var channel = message.member.guild.channels.cache.get("797351953021009960")

    if(!channel) return message.channel.send("Kanaal bestaat niet");

    message.delete();

    channel.send(suggestEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });
    
}        

module.exports.help = {
    name: "suggest"
}