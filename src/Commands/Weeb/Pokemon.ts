import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import oakdexPokedex from "oakdex-pokedex";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

@Command( "pokemon", {
    description: `Gives you the data of the given pokemon.`,
    aliases: ["pkmn"],
    category: "weeb",
    usage: `pokemon [name/id]`,
    cooldown: 5,
    exp: 50,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const name = joined.trim().split(" ")[0].toLowerCase();
    if (!name)
      return void M.reply(
        `Do you want me to give you the data of an unknown pokemon, Baka!`
      );
    const pkmon = new pokedex();
    const data = await pkmon.getPokemonByName(name).catch(() => null);
    if (!data) return void (await M.reply(`No such pokemon name or id, Baka!`));
    const pkmn = await oakdexPokedex.findPokemon(data.id);
    let text = "";
    text += `💫 *Name: ${pkmn.names.en}*\n`;
    text += `〽️ *Pokedex ID: ${data.id}*\n`;
    text += `⚖ *Weight: ${pkmn.weight_eu}*\n`;
    text += `🔆 *Height: ${pkmn.height_eu}*\n`;
    text += `🌟 *Base Experience: ${data.base_experience}*\n`;
    text += `📛 *Abilities: ${pkmn.abilities[0].name}, ${pkmn.abilities[1].name}*\n`;
    text += `🎀 *Type:  ${pkmn.types}*\n`;
    text += `📈 *Leveling Rate: ${pkmn.leveling_rate}*\n`;
    text += `💮 *Colour: ${pkmn.color}*\n`;
    if (pkmn.evolution_from !== null)
      text += `🌸 *Evolved from: ${pkmn.evolution_from}*\n`;
    text += `✳ *HP: ${data.stats[0].base_stat}*\n`;
    text += `⚔ *Attack: ${data.stats[1].base_stat}*\n`;
    text += `🔰 *Defense: ${data.stats[2].base_stat}*\n`;
    text += `☄ *Special Attack: ${data.stats[3].base_stat}*\n`;
    text += `🛡 *Special Defense:${data.stats[4].base_stat}*\n`;
    text += `🎐 *Speed: ${data.stats[5].base_stat}*\n\n`;
    text += `💬 *Summary: ${pkmn.pokedex_entries.Gold.en}*`;
    const buffer = await request
      .buffer(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
      )
      .catch((e) => {
        return void M.reply(e.message);
      });
    while (true) {
      try {
        M.reply(
          buffer || "✖ An error occurred. Please try again later",
          MessageType.image,
          undefined,
          undefined,
          `${text}`,
          undefined
        ).catch((err) => {
          console.log(`${err}`);
          M.reply(`✖ An error occurred. Please try again later.`);
        });
        break;
      } catch (err) {
        M.reply(`✖ An error occurred. Please try again later.`);
        console.log(`${err}`);
      }
    }
    return void null;
  };
}
