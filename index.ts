import client from '@config/client'
import '@config/init'

import messageCollector from 'src/commands/messageCollector'

client.on('ready', () => {
  console.log('Ready')

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
      privateMessage: true,
    }

    messageCollector(collectorOptions)
  })

  client.on('webhook', (webhook) => {
    console.log(webhook)
  })
})
