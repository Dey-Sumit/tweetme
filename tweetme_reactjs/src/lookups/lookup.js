import { lookUp } from './lookup-component'

export const apiTweetCreate = (data, callback) => {
    lookUp('POST', '/create/', callback, { 'content': data })
}
export const apiTweetDetail = (tweetId, callback) => {
    lookUp('GET', `/${tweetId}`, callback)
}
export const apiTweetList = (username, callback, nextUrl) => {
    let endpoint = '/'
    if (username)
        endpoint = `/?username=${username}`
    // change the endpoint if next url is passed
    console.log(nextUrl);

    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    //"http://localhost:8000/api/?page=4",

    lookUp('GET', endpoint, callback)
}


export const apiTweetFeed = (callback, nextUrl) => {
    let endpoint = `/feed/`
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    lookUp('GET', endpoint, callback)
}
export const apiTweetAction = (tweetId, actionType, callback) => {
    const data = { id: tweetId, action: actionType }
    lookUp('POST', '/action', callback, data)
}