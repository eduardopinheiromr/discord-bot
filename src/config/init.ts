const { TOKEN, CLIENT_ID } = process.env

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { commands } from '@constants/commands'

const rest = new REST({ version: '9' }).setToken(TOKEN)

;(async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
})()
