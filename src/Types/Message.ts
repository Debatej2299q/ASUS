import { downloadContentFromMessage } from '@adiwajshing/baileys'

export interface IArgs {
    context: string
    args: string[]
    flags: string[]
}
export interface ISimplifiedMessage {
  type: MessageType;
  content: string | null;
  args: string[];
  reply(
    content: string | Buffer,
    type?: MessageType,
    mime?: Mimetype,
    mention?: string[],
    caption?: string,
    thumbnail?: Buffer
  ): Promise<unknown>;
  mentioned: string[];
  groupMetadata: IExtendedGroupMetadata | null;
  chat: "group" | "dm";
  from: string;
  sender: {
    jid: string;
    username: string;
    isAdmin: boolean;
  };
  quoted?: {
    message?: WAMessage | null;
    sender?: string | null;
  } | null;
  WAMessage: WAMessage;
  urls: string[];
}
export type DownloadableMessage = Parameters<typeof downloadContentFromMessage>[0]
