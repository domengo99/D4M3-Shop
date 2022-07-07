const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
})

client.login(process.env.token);

client.on("ready", () => {
    console.log("ONLINE");
})

//BENVENUTO
client.on("guildMemberAdd", (member) => {
    client.channels.cache.get("988372356097540136").send("Ciao " + member.toString() + " Benvunuto in **" + member.guild.name + "**\rSei il **" + member.guild.memberCount + "° membro**");
})

//ADDIO
client.on("guildMemberRemove", (member) => {
    client.channels.cache.get("994603320947789865").send("Ciao ciao" + member.toString() + ", torna presto!");
})


//PAROLE PROIBITE
client.on("messageCreate", message => {
    if (message.channel.type == "DM") return

    if (message.member.roles.cache.has("idRuolo1") || message.member.roles.cache.has("idRuolo2")) return

    var parolacce = ["cazzo", "dio", "c4zz0", "d10", "madonna", "papa", "porca", "puttana", "troia", "tenor", "negrp", "negri"]
    var trovata = false;
    var testo = message.content;

    parolacce.forEach(parola => {
        if (message.content.toLowerCase().includes(parola.toLowerCase())) {
            trovata = true;
            testo = testo.replace(eval(`/${parola}/g`), "###");
        }
    })

    if (trovata) {
        message.delete();
        var embed = new Discord.MessageEmbed()
            .setTitle("Hai detto una parolaccia")
            .setDescription("Hai scritto un messaggio con parole bloccate\rIl tuo messaggio: " + testo)

        message.channel.send({ embeds: [embed] })
    }
})




client.on("message", (message) => {
    if (message.content == "!Annuncio") {
        message.channel.send("Nuovo giveaway!! @everyone")
            .then(messaggio => {
                messaggio.react("✅");
                messaggio.react("❌");

                var filtro = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id == message.author.id;

                messaggio.awaitReactions(filtro, { max: 1, time: 10000 })
                    .then(collected => {
                        var reazione = collected.first().emoji.name;
                        if (reazione == "👍") {
                            message.channel.send("Hai selezionato SI");
                        }
                        if (reazione == "👎") {
                            message.channel.send("Hai selezionato NO");
                        }

                    }).catch(collected => {
                        return message.channel.send("Tempo scaduto!");
                    })




            })
    }
})
