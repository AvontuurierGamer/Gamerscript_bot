const discord = require("discord.js");

module.exports.run = async (client, message,args) => {

    const amountStars = args[0];
    if(!amountStars || amountStars < 1 || amountStars > 5) return message.reply("geef aantal sterren tussen de 1 en de 5 op!");

    var tekst = args.splice(1, args.lenght).join(" ");

    var channel = message.member.guild.channels.cache.get("793772042372775956");

    if(!channel) return message.channel.send("Kanaal bestaat niet");

    var stars = "";
    for (let i = 0; i < amountStars; i++) {

        stars+= ":star: ";

    }

    message.delete();
    
    const embed = new discord.MessageEmbed()
        .setTitle(`${message.author.username} heeft een review geschreven`)
        .setColor("#00ff00")
        .setImage(message.author.avatarURL())
        .addField("Sterren: ", stars)
        .addField("Review: ", tekst);

    message.channel.send("✅ je hebt een review geschreven");

    channel.send(embed);

}

module.exports.help = {
    name: "review"
}