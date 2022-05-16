const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client, Intents, ChannelManager, TextChannel, Guild, GuildEmojiManager, GuildApplicationCommandManager, DiscordAPIError, Message } = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
]})
const { OMT_ID, GUILD_ID } = require("../config.json");
const GuildEmoji = require('discord.js/src/structures/GuildEmoji');
const { isApplicationCommandGuildInteraction } = require('discord-api-types/utils/v9');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('forfeit')
		.setDescription('Match Results for forfeits')
		.addStringOption(option =>
            option.setName('matchid')
                .setDescription('ID of the match')
                .setRequired(true))
		.addStringOption(option =>
			option.setName('forfeit')
				.setDescription('Name of player for forfeited')
				.setRequired(true))
		.addStringOption(option => 
			option.setName('winner')
				.setDescription('Name of Winner')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('forfeitid')
				.setDescription('Player ID of player who forfeit'))
		.addNumberOption(option => 
			option.setName('winnerid')
				.setDescription('Player ID of winner')),

	async execute(interaction) {
		if(interaction.channel.id != "974328866531311696"){
            return interaction.reply({content: 'You are not allowed to use this command or you have used this command in the wrong channel.', ephemeral:true})
        }

		let message = await interaction.reply({ content:'Generating Results...', fetchReply:true });
		let matchID = await interaction.options.getString('matchid')
		let forfeit = await interaction.options.getString('forfeit')
		let winner = await interaction.options.getString('winner')
		let forfeitID = await interaction.options.getNumber('forfeitid')
		let winnerID = await interaction.options.getNumber('winnerid')

		client.login(process.env.DJStoken)

		let guild = await client.guilds.fetch(GUILD_ID)
		let omt = await client.guilds.fetch(OMT_ID)

		const result = new MessageEmbed()
			.setColor('#ffe05e')
			.setAuthor({name: `${matchID}`, iconURL: 'https://cdn.discordapp.com/attachments/656389510199771146/962211384140128266/discord_icon.png'})
			.setTitle(`Win By Default for ${winner}`)
			.setThumbnail(`http://a.ppy.sh/${winnerID}`)
			.addField(`${forfeit} has forfeited the match`, '_ _', true)
			.setImage('https://tenor.com/view/mudkip-pokemon-gif-24125499')
			.setTimestamp()
            .setFooter({ text: `osu! Malaysia Tournament 2022` })

			let channel = await client.channels.fetch('565765676652953600')
			
			await channel.send({embeds: [result]}).catch(console.error)

			await message.edit(`Results for ${matchID} sent!`).catch(console.error)
		}
}