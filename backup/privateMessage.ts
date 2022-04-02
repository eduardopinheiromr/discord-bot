import { Client, Message } from 'discord.js'

export default (client: Client, triggerText: string, replyText: string) => {
  client.on('message', (message: Message) => {
    if (
      message.channel.type === 'DM' &&
      message.content.toLowerCase() === triggerText.toLowerCase()
    ) {
      message.author.send(replyText)
    }
  })
}
