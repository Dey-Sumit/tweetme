export const lookUp = (method, endpoint, callback, data) => {
    const xhttp = new XMLHttpRequest()
    const url = `http://localhost:8000/api/${endpoint}`
    const responseType = "json"

    xhttp.responseType = responseType
    xhttp.open(method, url)
    xhttp.onload = function () {
        callback(xhttp.response, xhttp.status)
    }
    xhttp.onerror = (e) => {
        console.log(e);
        callback({
            'm': 'error on request'
        }, 400)
    }

    let JsonData;
    if (data)
        JsonData = JSON.stringify(data)

    xhttp.send(JsonData)
}


export const loadTweets = (callback) => {
    lookUp('GET', '', callback)
}