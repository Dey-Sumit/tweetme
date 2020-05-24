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
    const xhttp = new XMLHttpRequest()
    const url = `http://localhost:8000/api${endpoint}`
    xhttp.responseType = "json"
    xhttp.open(method, url)
    xhttp.setRequestHeader("Content-Type", "application/json")

    const csrftoken = getCookie('csrftoken');
    if (csrftoken) {
        xhttp.setRequestHeader("X-CSRFToken", csrftoken)
    }
    if (method === "POST") {
        xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    }
    xhttp.onload = function () {
        // if not logged in,redirect to login page
        if (xhttp.status === 403 && xhttp.response) {
            const detail = xhttp.response.detail
            if (detail === "Authentication credentials were not provided.") {
                window.location.href = "account/login?showLoginRequired=true"
            }
        }
        callback(xhttp.response, xhttp.status)
    }
    xhttp.onerror = (e) => {
        console.log("error", e)
        callback({
            'msg': 'error on request'
        }, 400)
    }
    let JsonData;
    if (data) {
        JsonData = JSON.stringify(data)
    }
    xhttp.send(JsonData)
}
