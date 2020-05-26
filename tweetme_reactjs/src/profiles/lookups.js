import { lookUp } from '../lookups'

export const apiProfileDetail = (username, callback) => {
    lookUp('GET', `/profiles/${username}/`, callback)
}
export const apiProfileFollowToggle = (username, action, callback) => {
    const data = { "action": `${action && action}`.toLowerCase() }
    lookUp('POST', `/profiles/${username}/follow`, callback, data)
}