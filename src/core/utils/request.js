export async function request(url, method = "GET", data = null){
    const headers = {}
    let body
    if(data){
        headers["Content-type"] = "application/json"
        body = JSON.stringify(data)
    }
    try{
        const response = await fetch(url, {method, headers, body})
        return await response.json()
    }catch(err){
        console.log(err);
    }
}