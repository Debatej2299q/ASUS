import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType } from "@adiwajshing/baileys";

@Command( "give", {
    description: "Give gold to someone.",
    aliases: ["give"],
    category: "economy",
    usage: `give <amount> [tag/quote]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined)
      return void M.reply(`Specify the amount of gold to give, Baka!`);
    const bruhh: any = joined.trim().split(" ");
    const amount: number = bruhh[0]
      .replace(/\-/g, "trewte")
      .replace(/\./g, "retre");
    if (isNaN(amount))
      return void M.reply(`The amount should be a number, Baka!`);
    const user = M.sender.jid;
    const target =
      M.quoted && M.mentioned.length === 0
        ? M.quoted.sender
        : M.mentioned[0] || null;
    if (!target || target === M.sender.jid)
      return void M.reply(`Good luck giving the gold of yours to yourself.`);
    const wallet = await (await this.client.getUser(user)).wallet;
    if (amount > wallet)
      return void M.reply(
        `🟥 *You need ${amount - wallet} gold more to make this transaction*.`
      );
    await this.client.reduceGold(user, amount);
    await this.client.addGold(target!, amount);
    await M.reply(
      `You gave *${amount} gold* to *@${
        target?.split("@")[0]
      }*🎉`,
      MessageType.text,
      undefined,
      [user || "", target!]
    );
  };
}
