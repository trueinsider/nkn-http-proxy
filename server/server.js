const nkn = require('nkn-client');
const http = require('http')

const client = nkn({
    privateKey: 'SETUP_SERVER_PRIVATE_KEY'
});

client.on('message', async (_, payload) => {
    const options = JSON.parse(payload);
    const data = options.body;
    delete options.body;
    let resolve;
    const promise = new Promise(value => {
        resolve = value;
    });
    const request = http.request(options, response => {
        let data = '';
        response.on('data', chunk => {
            data += chunk;
        });
        response.on('end', () => {
            resolve(JSON.stringify({
                statusCode: response.statusCode,
                headers: response.headers,
                body: data
            }));
        });
    });
    request.write(data);
    request.end();
    return await Promise.resolve(promise);
});