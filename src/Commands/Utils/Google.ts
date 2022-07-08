/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from "axios";

@Command( "google", {
    aliases: ["g", "search"],
    description: "Search on the web ",
    category: "utils",
    usage: `google [query]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!this.client.config.gkey) return void M.reply("No google API key set");
    if (!joined) return void M.reply("🔎 Provide a search term");
    const term = joined.trim();
    await axios
      .get(
        `https://www.googleapis.com/customsearch/v1?q=${term}&key=${this.client.config.gkey}&cx=baf9bdb0c631236e5`
      )
      .then((res) => {
        if (res.status !== 200) return void M.reply(`🔍 Error: ${res.status}`);
        let result = ``;
        let index = 1;
        for (const item of res.data?.items) {
          result += `*👾${index}.Title* : ${item.title}\n*🔗Link* : ${item.link}\n*📖Snippet* : ${item.snippet}\n\n`;
          index++;
        }
        // return void M.reply(`🔍Command Used : ${Command.count} times\n Result for *${term}*\n\n\n ${result}`)
        return void M.reply(`🔍 Result for *${term}*\n\n\n ${result}`);
      })
      .catch((err) => {
        M.reply(`🔍 Error: ${err}`);
      });
  };
}
