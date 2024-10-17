const { SlashCommandBuilder } = require('discord.js');
const { addChips, removeChips } = require('../../data.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('transfer-chips')
    .setDescription('Transfer chips to another user')
    .addNumberOption(option =>
      option.setName('amount')
        .setDescription('Amount to transfer')
        .setRequired(true))
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to transfer chips to')
        .setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getNumber('amount');
    if (amount < 0) {
      await interaction.reply("Invalid amount!");
      return;
    }
    const user = interaction.options.getUser('user');
    const removeRes = await removeChips(amount, interaction.user.id);
    if (removeRes == -1) {
      await interaction.reply("Not enough chips!");
      return;
    }
    await addChips(amount, user.id);

    await interaction.reply(`${interaction.user} transferred $${amount} to ${user}`);
  },
};