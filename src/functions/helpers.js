const getNow = () => {
    let now = new Date()
    now.setHours(now.getHours() - 3);
    return now.toUTCString()
}

const log = (string, body) => {
    console.log(getNow() + " - " + string)
    if (body) {
        console.log(body)
    }
}

module.exports = {
    log,
}