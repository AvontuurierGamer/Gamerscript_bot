const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "799325758022877234";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            ticketBestaat = true;

            message.reply("You already have a ticket");

            return;
        }
        
    });

    if(ticketBestaat) return;
    
    var embed = new discord.MessageEmbed()
        .setTitle("Hello " + message.author.username)
        .setFooter("Ticket is created");

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
                        .setTitle(`**${message.author.username}**`)
                        .setColor("#ff8c00")
                        .setDescription("Welcome Ask your question here! Our staff team will help you!")

                    settendParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("");
            });
        }
    ).catch(err => {
        message.channel.send("");
    });

}
    

module.exports.help = {
    name: "ticket"
}