import { Client } from 'discord.js'

export default (client: Client, privateMessage?: PrivateMessage) => {
  const allUsers = client.users.cache

  allUsers.forEach((user) => {
    client.users.fetch(user).then((user) => {
      user.send('Hello World!')
    })
  })
}
