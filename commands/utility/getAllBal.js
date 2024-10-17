const { SlashCommandBuilder } = require('discord.js');
const { getAllBal } = require('../../data.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get-all-bal')
    .setDescription('Get all balances'),
  async execute(interaction) {
    const balances = await getAllBal();
    let message = '```';
    balances.forEach((user) => {
      message += `${user.id}: $${user.chips}\n`;
    });
    message += '```';
    await interaction.reply(message);
  },
};