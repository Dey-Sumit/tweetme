import { lookUp } from './lookup-component'

export const apiTweetCreate = (data, callback) => {
    lookUp('POST', '/create/', callback, { 'content': data })
}

export const apiTweetList = (callback) => {
    console.log("looking up GET");

    lookUp('GET', '/', callback)
}

export const apiTweetAction = (tweetId, actionType, callback) => {
    const data = { id: tweetId, action: actionType }
    lookUp('POST', '/action', callback, data)
}