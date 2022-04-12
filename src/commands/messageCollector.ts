import { Message, MessageCollector } from 'discord.js'

type TMessageCollector = {
  triggerText: string
  message: Message
  questions: string[]
  privateMessage?: boolean
}

const messageCollector = ({
  triggerText,
  message,
  questions,
  privateMessage,
}: TMessageCollector) => {
  if (message.content !== triggerText) return

  if (privateMessage && message.channel.type !== 'DM') return

  let counter = 0

  const filter = (m: Message) => {
    return m.author.id === message.author.id
  }

  const collector = new MessageCollector(message.channel, {
    filter,
    max: questions.length,
    time: 1000 * 60 * 2, // 2 minutes
  })

  message.channel.send(questions[counter++])

  collector.on('collect', (m) => {
    if (counter < questions.length) {
      m.channel.send(questions[counter++])
    }
  })

  collector.on('end', (collected) => {
    console.log(`Collected ${collected.size} messages`)

    let counter = 0

    const answers = collected.map((m) => {
      return {
        question: questions[counter++],
        answer: m.content,
      }
    })

    console.log({ answers })
  })
}

export default messageCollector
