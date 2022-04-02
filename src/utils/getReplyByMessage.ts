import { messages } from '@constants/messages'

export const getReplyByMessage = (message: string) => {
  const messageToLowerCase = message.toLowerCase()

  const customMessage = messages.find(
    ({ message }) => message === messageToLowerCase
  )

  return customMessage
}
