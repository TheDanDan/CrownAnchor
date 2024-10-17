const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const crypto = require("crypto");

const symbols = [":spades:", ":diamonds:", ":clubs:", ":hearts:", ":anchor:", ":crown:"];
const TEST = 10000;
const chosen = 0;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command'),
  async execute(interaction) {
    var count = 0;
    const symbolCount = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < TEST; i++) {
      count -= 1;

      const randomSymbols = [0,0,0];

      randomSymbols[0] = Math.floor(crypto.randomBytes(4).readUInt32BE() / 0xFFFFFFFF * (5 + 1));
      randomSymbols[1] = Math.floor(crypto.randomBytes(4).readUInt32BE() / 0xFFFFFFFF * (5 + 1));
      randomSymbols[2] = Math.floor(crypto.randomBytes(4).readUInt32BE() / 0xFFFFFFFF * (5 + 1));

      symbolCount[randomSymbols[0]] += 1;
      symbolCount[randomSymbols[1]] += 1;
      symbolCount[randomSymbols[2]] += 1;

      if (randomSymbols.includes(chosen)) count++;
      count += randomSymbols.filter(x => x == chosen).length;
    }
    console.log(symbolCount);
    await interaction.reply(`Result for ${TEST} runs: \nEV:${count/TEST} \nSymbol Count:${symbolCount} `);
  },
};