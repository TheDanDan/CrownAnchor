const { SlashCommandBuilder } = require('discord.js');
const { getAllBalances } = require('../../data.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get-all-bal')
    .setDescription('Get all balances'),
  async execute(interaction) {
    const balances = await getAllBalances();
    message = "";
    balances.forEach((user) => {
      if (user.chips > 0.01) message += `${user.id}: $${user.chips}\n`;
    });
    await interaction.reply({ content: message, ephemeral: true });
  },
};