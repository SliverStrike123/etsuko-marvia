const fs = require('node:fs')
const { Client, Intents, GuildManager, Guild, Collection} = require('discord.js');
const client = new Client({ intents: 
  [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.login(process.env.DJStoken);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const command = client.commands.get(interaction.commandName);

	  if (!command) return;

	  try {
		  await command.execute(interaction);
	  }   catch (error) {
		      console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

  });
  
