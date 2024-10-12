const { SlashCommandBuilder } = require('discord.js');
const { addChips } = require('../../data.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin-add-bal')
    .setDescription('Add balance to a user')
    .addNumberOption(option =>
      option.setName('amount')
        .setDescription('Amount to add')
        .setRequired(true))
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to add balance to')
        .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return await interaction.reply('You do not have permission to use this command');
    }
    const amount = interaction.options.getNumber('amount');
    const user = interaction.options.getUser('user');
    await addChips(amount, user.id);

    await interaction.reply(`Added $${amount} to ${user.username}'s balance`);
  },
};