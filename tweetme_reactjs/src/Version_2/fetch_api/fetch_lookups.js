import { fetch_lookup } from './fetch_api'

const handleErrors = (response) => {
    if (!response.ok)//response.status!==200
        console.log("Error:chcek credentials");
    return response.json()
}

//method,endpoint,token,callback,**args
export const api_fetch_tweet_feed = (token, callback, nextUrl) => {
    let endpoint = 'http://localhost:8000/api/feed/'
    if (nextUrl !== undefined && nextUrl !== null) {
        endpoint = nextUrl
    }
    fetch_lookup('GET', endpoint, token, callback, handleErrors)
}
export const api_fetch_tweet_create = (token, callback, data) => {
    let endpoint = 'http://localhost:8000/api/create/'
    fetch_lookup('POST', endpoint, token, callback, handleErrors, { 'content': data })
}

export const api_fetch_profile_update = (token, callback, data) => {
    let endpoint = 'http://localhost:8000/api/profiles/test/posts/'
    fetch_lookup('POST', endpoint, token, callback, handleErrors, data, true)
}

export const api_fetch_tweet_action = (token, tweetId, actionType, callback) => {
    const data = { id: tweetId, action: actionType }
    fetch_lookup('POST', '/action', token, callback, data)
}