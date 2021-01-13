const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "793774861276676136";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            ticketBestaat = true;

            message.reply("Je hebt al een ticket");

            return;
        }
        
    });

    if(ticketBestaat) return;
    
    var embed = new discord.MessageEmbed()
        .setTitle("Hoi " + message.author.username)
        .setFooter("Ticket word aangemaakt");

    message.channel.send(embed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settendParent) => {

                    settendParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGE: false,
                        VIEW_CHANNEL: false
                    });
                    settendParent.updateOverwrite(message.author.id, {
                        SEND_MESSAGES: true,
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGE: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle(`Hoi ${message.author.username}`)
                        .setDescription("stel hier je vraag");

                    settendParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("er is iets misgegaan");
            });
        }
    ).catch(err => {
        message.channel.send("er is iets misgegaan");
    });

}
    

module.exports.help = {
    name: "ticket"
}