import { lookUp } from './lookup-component'

export const apiTweetCreate = (data, callback) => {
    lookUp('POST', '/create/', callback, { 'content': data })
}
export const apiTweetDetail = (tweetId, callback) => {
    lookUp('GET', `/${tweetId}`, callback)
}
export const apiTweetList = (username, callback) => {
    let endpoint = '/'
    if (username)
        endpoint = `/?username=${username}`
    console.log(endpoint);

    lookUp('GET', endpoint, callback)
}

export const apiTweetAction = (tweetId, actionType, callback) => {
    const data = { id: tweetId, action: actionType }
    lookUp('POST', '/action', callback, data)
}