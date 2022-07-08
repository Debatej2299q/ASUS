import { MessageType } from '@adiwajshing/baileys'
import request from '../../lib/request'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'

@Command( 'trendingyt', {
    aliases: ['ty', 'tyt'],
    description: 'Gives you the trending list of yt ',
    category: 'utils',            
    usage: `trandingyt [title]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        
        if (!joined) return void M.reply('✖ Provide an item name to search, Baka!')
        const chitoge = joined.trim()
        console.log(chitoge)
        const { data } = await axios.get(`https://api-xcoders.xyz/api/info/trend/youtube?country=${chitoge}&apikey=Zl0clXuAbx`)
        const buffer = await request.buffer(data.result.data[0].thumbnail).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '✖ An error occurred. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `${data.result.message}\n${data.result.updated_at}\n*(1)* ${data.result.data[0].title}\n ${data.result.data[0].url}\n ${data.result.data[0].channel}\n ${data.result.data[0].uploaded_at}\n ${data.result.data[0].viewers}\n ${data.result.data[0].likes}\n ${data.result.data[0].comments}\n${data.result.data[0].description}\n\n*(2)* ${data.result.data[1].title}\n ${data.result.data[1].url}\n ${data.result.data[1].channel}\n ${data.result.data[1].uploaded_at}\n ${data.result.data[1].viewers}\n ${data.result.data[1].likes}\n ${data.result.data[1].comments}\n${data.result.data[1].description}\n\n*(3)* ${data.result.data[2].title}\n ${data.result.data[2].url}\n ${data.result.data[2].channel}\n ${data.result.data[2].uploaded_at}\n ${data.result.data[2].viewers}\n ${data.result.data[2].likes}\n ${data.result.data[2].comments}\n${data.result.data[2].description} `,
                    undefined
                ).catch((e) => {
                    console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`)
                    // console.log('Failed')
                    M.reply(`✖ An error occurred. Please try again later.`)
                })
                break
            } catch (e) {
                // console.log('Failed2')
                M.reply(`✖ An error occurred. Please try again later.`)
                console.log(`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`)
            }
        }
        return void null
    }
}
