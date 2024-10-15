const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command'),
  async execute(interaction) {
    interaction.reply("Testing...");
    for (let i = 0; i < 10; i++) {
      await interaction.editReply(`Testing... ${i}`);
    }
  },
};