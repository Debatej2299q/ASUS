import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType, MimeType } from "@adiwajshing/baileys";

@Command( "withdraw", {
    description: "Withdraws gold from the bank",
    aliases: ["withdraw"],
    category: "economy",
    usage: `withdraw <amount>`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    const user = M.sender.jid;
    if (!joined)
      return void M.reply(`Specify the amount of gold to withdraw, Baka!`);
    const amount: any = joined
      .trim()
      .split(" ")[0]
      .replace(/\-/g, "trewte")
      .replace(/\./g, "retre");
    if (isNaN(amount))
      return void M.reply(`The amount should be a number, Baka!`);
    const bank = await (await this.client.getUser(user)).bank;
    if (bank < amount)
      return void M.reply(
        `🟥 *You don't have sufficient amount of gold in your bank to make this transaction*.`
      );
    await this.client.withdraw(user, amount);

    const buttons = [
      {
        buttonId: "wallet",
        buttonText: { displayText: `${this.client.config.prefix}wallet` },
        type: 1,
      },
    ];

    const buttonMessage: any = {
      contentText: `🟩 *You withdrew ${amount} gold from your bank.*`,
      footerText: "© 𝖠𝗌𝗎𝗇𝖺 2022",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}
