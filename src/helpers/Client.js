const url = window.location.pathname.split("/")

const client = url[3]
const user = url[4]

export {client, user}