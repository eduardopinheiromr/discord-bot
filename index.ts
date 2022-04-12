import client from '@config/client'
import '@config/init'
import { screenshot } from '@services/scrapeImage'
import { Message, MessageCollector, WebhookClient } from 'discord.js'

import messageCollector from 'src/commands/messageCollector'

client.on('ready', () => {
  console.log('Ready')

  // client.on('messageCreate', (message) => {
  //   if (!message.webhookId) return

  //   console.log(message)
  // })

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
  // const wcGithub = new WebhookClient({
  //   url: 'https://discord.com/api/webhooks/959629496137437245/zBNx0xIzVcr5WUEx_8PqCgcC79NxLgichC79tavvUVwUTPH-PAyjJ7swsjVZWEwkQshd',
  // })

  // wcGithub.send({

  // })

  client.on('messageCreate', async (message) => {
    if (message.author.username === 'GitHub') {
      console.log(message.embeds[0].url)
      await screenshot(message.embeds[0].url, (result) => {
        message.channel.send({ files: [result.url] })
      })
      // message.channel.send({ files: ['https://i.imgur.com/XxxXxXX.jpg'] })
    }
  })
})
