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
  console.log(message)

  let counter = 0

  const filter = (m) => {
    return m.author.id === message.author.id
  }

  const collector = new MessageCollector(message.channel, {
    filter,
    max: questions.length,
    time: 1000 * 120, // 15s
  })

  console.log(counter)

  message.channel.send(questions[counter++])

  collector.on('collect', (m) => {
    if (counter < questions.length) {
      m.channel.send(questions[counter++])
    }
  })

  collector.on('end', (collected) => {
    console.log(`Collected ${collected.size} messages`)

    let counter = 0
    collected.forEach((value) => {
      console.log(questions[counter++], value.content)
    })
  })
}

export default messageCollector
