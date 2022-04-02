import { Client, Intents } from 'discord.js'
import 'dotenv/config'
const { TOKEN } = process.env

const client = new Client({
  partials: ['CHANNEL'],
  intents: [
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.login(TOKEN)

export default client
