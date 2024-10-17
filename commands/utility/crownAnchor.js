const { SlashCommandBuilder } = require('discord.js');
const { addChips, removeChips } = require('../../data.js');
var crypto = require("crypto");

const symbols = [":spades:", ":diamonds:", ":clubs:", ":hearts:", ":anchor:", ":crown:"];

function getRandomInt(max) {
  return Math.floor(crypto.randomBytes(4).readUInt32BE() / 0xFFFFFFFF * (max + 1));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crown-anchor')
    .addNumberOption(option =>
      option.setName('bet')
        .setDescription('Amount to bet')
        .setRequired(true))
    .addNumberOption(option =>
      option.setName('symbol')
        .setDescription('Symbol to bet on 0: Spades, 1: Diamonds, 2: Clubs, 3: Hearts, 4: Anchor, 5: Crown')
        .setRequired(true))
    .addNumberOption(option =>
      option.setName('symbol2')
        .setDescription('Second symbol to bet on 0: Spades, 1: Diamonds, 2: Clubs, 3: Hearts, 4: Anchor, 5: Crown')
        .setRequired(false))
    .setDescription('Bet on Crown and Anchor!'),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    const max = 5;

    const randomSymbols = [getRandomInt(max), getRandomInt(max), getRandomInt(max)];

    var res = `Result: ${symbols[randomSymbols[0]]} ${symbols[randomSymbols[1]]} ${symbols[randomSymbols[2]]}`;

    const bet = interaction.options.getNumber('bet');
    if (bet <= 0) {
      await interaction.reply("Invalid bet amount!");
      return;
    }
    const removeRes = await removeChips(bet + (interaction.options.getNumber('symbol2') ? bet : 0), interaction.user.id);
    if (removeRes == -1) {
      await interaction.reply("Not enough chips!");
      return;
    }

    const symbol = interaction.options.getNumber('symbol');
    const symbol2 = interaction.options.getNumber('symbol2');
    if ((symbol < 0 || symbol > max) && (symbol2 && (symbol2 < 0 || symbol2 > max))) {
      await interaction.reply("Invalid symbol!");
      return;
    }

    var winCount = 0;

    if (randomSymbols.includes(symbol)) winCount++;
    if (randomSymbols.includes(symbol2)) winCount++;

    winCount += randomSymbols.filter(x => x == symbol || x == symbol2).length * 1.1;

    res = res + `\nYou bet $${bet} on ${symbols[symbol]}` + (symbol2 ? ` and ${symbols[symbol2]}` : ``);
    res = res + `\nYou won $${bet * winCount}!`;

    const addRes = await addChips(bet * winCount, interaction.user.id);
    res = res + `\nYou now have $${(addRes).toFixed(2)}`;

    await interaction.reply(res);
  },
};