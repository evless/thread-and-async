const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;


const generateRandomOgrn = () => {
    const arr = []
    let result = ''
    for (let i = 0; i < 12; i++) {
        arr.push(getRandomInt(10))
    }

    arr[0] = getRandomInt(2)
    if (arr[0] === 0) {
        arr[0] = 5
    }

    arr[1] = getRandomInt(2)
    arr[2] = getRandomInt(9)
    arr[3] = getRandomInt(9)
    arr[4] = getRandomInt(10)

    for (let i = 0; i < 7; i++) {
        arr[i + 5] = getRandomInt(10)
    }

    result = arr.join('')
    summ = +result
    control = ((summ % 11) % 10)

    if (control === 10)
        control = 0
    
    result += control

    return result
}

module.exports = {
    withoutTimer: (index, numberUser) => {
        console.log(`Index: ${index}; User: ${numberUser};`)
        return generateRandomOgrn()
    },
    withPromise: (index, numberUser) => new Promise((resolve) =>
        setTimeout(
            () => {
                console.log(`Index: ${index}; User: ${numberUser};`)
                resolve(generateRandomOgrn())
            },
            getRandomInt(2000, 100)
        )
    )
}