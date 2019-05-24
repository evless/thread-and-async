const express = require('express');
const randomOgrn = require('./random');

const app = express();

const PORT = 8081;
const asyncType = Boolean(process.env.ASYNC);
let user = 0;

const getRandomOgrns = (user) => new Promise(async (resolve) => {
    let i = 0;
    const result = [];

    while (i < (asyncType ? 10 : 100000)) {
        if (asyncType) {
            const r = await randomOgrn.withTimer(i, user)
            result.push(r)
        } else {
            result.push(randomOgrn.withoutTimer(i, user))
        }

        i++;
    }

    resolve(result)
})

app.get('/', async function(req, res) {
    res.setHeader('Content-type', 'application/json')
    
    user += 1;
    const userNumber = user;

    console.log(`Opened connect with user №${userNumber}`)
    
    const result = await getRandomOgrns(userNumber)

    console.log(`Closed connect with user №${userNumber}`)

    res.send({result})
});

app.listen(PORT, function () {
    console.log(`Example app with async listening on ${PORT} port.`)
});
