/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from "axios";

@Command( "weather", {
    aliases: ["wthr"],
    description: "Gives you the weather of the given state or city. ",
    category: "educative",
    usage: `weather [place_name]`,
    cooldown: 5,
    exp: 50,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    //if (!this.client.config.weatherAppid)
    //	return void M.reply("No weather api key set");
    if (!joined) return void M.reply("Provide me the place name, Baka!");
    const place = joined.trim();
    await axios
      .get(`https://api.popcat.xyz/weather?q=${place}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        // console.log(response);
        const text = `🔎 Weather for the place *${place}* found\n\n🌸 *Place:* ${response[0].location.name}*\n🌈 *Weather: ${response[0].current.skytext}*\n🌡️ *Temperature: ${response[0].current.temperature}°C*\n💦 *Humidity: ${response[0].current.humidity}%*\n🎐 *Wind:* ${response[0].current.windspeed}*\n`;
        M.reply(text);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        M.reply(`No such place name.`);
      });
  };
}
