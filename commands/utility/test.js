const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command'),
  async execute(interaction) {
    // await interaction.reply("Testing...");
    // for (let i = 0; i < 10; i++) {
    //   await wait(1000);
    //   await interaction.editReply(`Testing... ${i}`);
    // }
    interaction.reply(`Websocket heartbeat: ${client.ws.ping}ms.`);
  },
};