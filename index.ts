import client from '@config/client'
import '@config/init'
import { Message, MessageCollector, WebhookClient } from 'discord.js'

import messageCollector from 'src/commands/messageCollector'

client.on('ready', () => {
  console.log('Ready')

  client.on('messageCreate', (message) => {
    if (!message.webhookId) return

    console.log(message)
  })

  // client.on('messageCreate', async (message) => {
  //   if (message.content !== 'test') return

  //   if (!message.guild) return

  //   const members = await (
  //     await message.guild.members.fetch()
  //   ).filter((member) => !member.user.bot)

  //   members.forEach((member) => {
  //     const { user, displayName } = member
  //     console.log({ user, displayName })
  //   })
  // })

  client.on('messageCreate', (message) => {
    const questions = [
      'What is your name?',
      'How old are you?',
      'What country are you from?',
    ]
    const collectorOptions = {
      triggerText: 'quiz',
      message: message,
      questions: questions,
    }

    messageCollector(collectorOptions)
  })

  client.on('webhook', (webhook) => {
    console.log(webhook)
  })

  const wcGithub = new WebhookClient({
    url: 'https://discord.com/api/webhooks/959629496137437245/zBNx0xIzVcr5WUEx_8PqCgcC79NxLgichC79tavvUVwUTPH-PAyjJ7swsjVZWEwkQshd',
  })

  wcGithub.on('apiResponse', (request) => {
    console.log('apiResponse', { request })
  })

  wcGithub.on('apiRequest', (request) => {
    console.log('apiRequest', { request })
  })
})
