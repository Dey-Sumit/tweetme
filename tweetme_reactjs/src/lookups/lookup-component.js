function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const lookUp = (method, endpoint, callback, data) => {
    console.log("look up called");

    const xhttp = new XMLHttpRequest()
    const url = `http://localhost:8000/api${endpoint}`
    xhttp.responseType = "json"
    const csrftoken = getCookie('csrftoken');
    xhttp.open(method, url)
    xhttp.setRequestHeader("Content-Type", "application/json")

    if (csrftoken) {
        // xhttp.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
        // xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        xhttp.setRequestHeader("X-CSRFToken", csrftoken)
    }
    if (method === "POST") {
        xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    }
    xhttp.onload = function () {
        callback(xhttp.response, xhttp.status)
    }
    xhttp.onerror = (e) => {
        console.log(e);
        callback({
            'msg': 'error on request'
        }, 400)
    }
    let JsonData;
    if (data) {
        JsonData = JSON.stringify(data)
        //  console.log('JsonData', JsonData);
    }
    xhttp.send(JsonData)
}
