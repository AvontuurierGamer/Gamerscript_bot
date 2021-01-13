const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    message.delete();

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Je hebt hier geen toegang tot");

    var seperator = "|";

    if(args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("gebruik")
            .setColor("#00ee00")
            .setDescription(`Maak een embed door gebruik te maken van: \n !embed title ${seperator} bericht ${seperator} kleur ${seperator} kanaal`);

        return message.reply(embed).then(msg => msg.delete({timeout: 5000}));

    }

    var argsList = args.join(" ").split(seperator);

    if(argsList[2] === undefined) argsList[2] = "#eeeeee";
    if(argsList[3] === undefined) argsList[3] = "📢•mededelingen";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "Geen inhoud meegegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()

    }

    var embedEmbed = new discord.MessageEmbed()
        .setTitle(`${options.titel}`)
        .setColor(options.kleur)
        .setDescription(`${options.bericht}`)
        .setTimestamp();
        
    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!channel) return message.reply("kanaal bestaat niet");

    channel.send(embedEmbed);
    
}
    

module.exports.help = {
    name: "embed"
}