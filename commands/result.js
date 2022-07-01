const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { match } = require('assert');
const { MessageEmbed, Client, Intents, Guild, GuildEmojiManager, GuildApplicationCommandManager, DiscordAPIError } = require('discord.js');
const { url } = require('inspector');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
]})
const { OMT_ID, GUILD_ID } = require("../config.json");
const { isApplicationCommandGuildInteraction } = require('discord-api-types/utils/v9');
const GuildEmoji = require('discord.js/src/structures/GuildEmoji');
const { Console } = require('console');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('result')
        .setDescription('Generate Results Post')
        .addStringOption(option =>
            option.setName('matchid')
                .setDescription('ID of the match')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('round')
            .setDescription('The stage the match took place in')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('playera')
                .setDescription('Name of Player A')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('playerb')
            .setDescription('Name of Player B')
            .setRequired(true))
        .addNumberOption(option => 
            option.setName('playeraid')
            .setDescription('ID of player A')
            .setRequired(true))
        .addNumberOption(option => 
            option.setName('playerbid')
            .setDescription('ID of player B')
            .setRequired(true))
        .addNumberOption(option => 
            option.setName('playerascore')
            .setDescription('score of player A')
            .setRequired(true))
        .addNumberOption(option => 
            option.setName('playerbscore')
            .setDescription('score of player B')
            .setRequired(true))
        .addNumberOption(option =>
            option.setName('mplink')
            .setDescription('Last 10 digits of the mp link of the match')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('playeraban1')
            .setDescription('First Ban of Player A')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('playerbban1')
            .setDescription('First Ban of Player B')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('playeraban2')
            .setDescription('Second Ban of Player A')
            .setRequired(false))
        .addStringOption(option =>
            option.setName('playerbban2')
            .setDescription('Second Ban of Player B')
            .setRequired(false)),


    async execute(interaction){

        if(interaction.channel.id != "974328866531311696"){
            return interaction.reply({content: 'You are not allowed to use this command or you have used this command in the wrong channel.', ephemeral:true})
        }

        let message = await interaction.reply({ content: 'Generating Results...', fetchReply: true })
        let referee = await interaction.user.tag
        let matchID = interaction.options.getString('matchid')
        let round = interaction.options.getString('round')
        let playerAname = interaction.options.getString('playera')
        let playerBname = interaction.options.getString('playerb')
        let playerAID = interaction.options.getNumber('playeraid')
        let playerBID = interaction.options.getNumber('playerbid')
        let playerAscore = interaction.options.getNumber('playerascore')
        let playerBscore = interaction.options.getNumber('playerbscore')
        let playerAban1 = interaction.options.getString('playeraban1')
        var playerAban2 = interaction.options.getString('playeraban2')
        let playerBban1 = interaction.options.getString('playerbban1')
        var playerBban2 = interaction.options.getString('playerbban2')
        let mplink = interaction.options.getNumber('mplink')
        console.log(playerAban2)
        console.log(playerBban2)
        if(playerAban2 === null){
           playerAsecondban = '_ _'
        } else {
            playerAsecondban = playerAban2
        }

        if(playerBban2 === null){
            playerBsecondban = '_ _'
        } else {
            playerBsecondban = playerAban2
        }

        if(playerAscore === playerBscore){
            return message.edit('Error, check the scores')
        };
        client.login(process.env.DJStoken)
        let guild = await client.guilds.fetch(GUILD_ID)
        
        let emoji1 = await guild.emojis.create(`http://a.ppy.sh/${playerAID}`, 'profile1');
        let playerApfp = guild.emojis.cache.find(emoji => emoji.name === 'profile1')

        let emoji2 = await guild.emojis.create(`http://a.ppy.sh/${playerBID}`, 'profile2');
        let playerBpfp = guild.emojis.cache.find(emoji => emoji.name === 'profile2');

        switch (playerAscore){

            case 1:
                finalA = '🔴'
                break;
            
            case 2:
                finalA = '🔴🔴'
                break;
            
            case 3:
                finalA = '🔴🔴🔴'
                break;

            case 4:
                finalA = '🔴🔴🔴🔴'
                break;
            
            case 5:
                finalA = '🔴🔴🔴🔴🔴'
                break;

            case 6:
                finalA = '🔴🔴🔴🔴🔴🔴'
                break;
            
            case 7:
                finalA = '🔴🔴🔴🔴🔴🔴🔴'
                break;
            
            default:
                finalA = '_ _'
                break;    
        }

        switch (playerBscore){

            case 1:
                finalB = '🔵'
                break;
            
            case 2:
                finalB = '🔵🔵'
                break;
            
            case 3:
                finalB = "🔵🔵🔵"
                break;

            case 4:
                finalB = '🔵🔵🔵🔵'
                break;
            
            case 5:
                finalB = '🔵🔵🔵🔵🔵'
                break;
            
            case 6:
                finalB = '🔵🔵🔵🔵🔵🔵'
                break;
              
            case 7:
                finalB = '🔵🔵🔵🔵🔵🔵🔵'
                break;

            default:
                finalB = '_ _'
                break;    
        }
        if(playerAscore > playerBscore){
            playerA = `__${playerAname}__ 👑`
            playerB = playerBname
            winnerpfp = `http://a.ppy.sh/${playerAID}`
        } else if(playerBscore > playerAscore){
            playerA = playerAname
            playerB = `__${playerBname}__ 👑`
            winnerpfp = `http://a.ppy.sh/${playerBID}`
        }
        console.log(playerAban2)
        console.log(playerBban2)

        const result = new MessageEmbed()
        .setColor('#ffe05e') 
        .setAuthor({name: `Match ${matchID}`, iconURL: 'https://cdn.discordapp.com/attachments/656389510199771146/962211384140128266/discord_icon.png'})
        .setTitle(`${round}`)
        .setThumbnail(winnerpfp)
        .addField(`${playerApfp} ${playerA}`,`${finalA}`,true).addField(`${playerBpfp} ${playerB}`,`${finalB}`,true)
        .addFields(
            { name: 'MP Link', value: `https://osu.ppy.sh/mp/${mplink}`  },
            { name: 'Bans:', value: '_ _'},
            { name: `${playerAname}`, value: `${playerAban1} \n ${playerAsecondban}`},
            { name: `${playerBname}`, value: `${playerBban1} \n ${playerBsecondban}`}
        )
        .setTimestamp()
        .setFooter({ text: `osu! Malaysia Tournament 2022 • Referee: ${referee}`})
        
        let channel = await client.channels.fetch('565765676652953600')

        await channel.send({embeds: [result]}).catch(console.error)

        await message.edit(`Results for ${matchID} sent!`).catch(console.error)

        await emoji1.delete()
            .then(console.log('emote1 has been deleted'))
    
        await emoji2.delete()
            .then(console.log('emote2 has been deleted'))

        
        }

}