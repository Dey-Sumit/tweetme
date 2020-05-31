
//handle auth error and redirect to /login
// if (detail === "Authentication credentials were not provided.") {
//     if (window.location.href.indexOf("login") === -1) {
//         window.location.href = "account/login?showLoginRequired=true"
//     }
// }
// && collect the token from local storage in fetch api,dont need to pass every time

export const fetch_lookup = (method, endpoint, token, callback, handleErrors, data, content) => {
    console.log(data);
    // for (var pair of data.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }


    const Token = `Token ${token}`
    console.log(Token);
    const header = content !== true ? {
        'Authorization': Token,
        'Content-Type': 'application/json'
    } : {
            'Authorization': Token,
            'content-type': 'multipart/form-data'
            // 'Content-Type': 'application/json'
        }
    // let jsonData;
    if (data) {
        data = JSON.stringify(data)
    }
    //console.log(data.get('first_name'));


    fetch(endpoint, {
        method: method,
        headers: header,
        body: data
    })
        .then(res => handleErrors(res))
        .then(res => {
            callback(res)
        })
        .catch(error => console.log(error));
}
