const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message, Client, Intents } = require('discord.js');
const client = new Client({intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
]})
const { OMT_ID, GUILD_ID } = require("../config.json");
const { isApplicationCommandGuildInteraction } = require('discord-api-types/utils/v9');
const { getSystemErrorName } = require('util');
const { execute } = require('./result');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('yes')
        .addStringOption(option =>
            option.setName('channelid')
            .setDescription('send message')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('content')
            .setDescription('message content')
            .setRequired(true)),

    async execute(interaction) {
        if(interaction.user.id != "226298201773178884") return

        await interaction.reply('Sending Message')

        let channelid = interaction.options.getString('channelid')
        let content = interaction.options.getString('content')

        await client.login(process.env.DJStoken)

        let channel = await client.channels.fetch(channelid)

        await channel.send(content)


    }
            

}