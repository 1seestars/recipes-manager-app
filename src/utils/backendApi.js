const BACKEND_URL = 'http://localhost:4000/'

export const apiCall = async (route, method, body) => {
    const url = `${BACKEND_URL}${route}`
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }

    if(body) {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)
    return response.json()
}