const nkn = require('nkn-client');
const http = require('http')
const url = require('url');

const client = nkn({
    privateKey: 'SETUP_CLIENT_PRIVATE_KEY'
});

const server = http.createServer((request, response) => {
    const path = url.parse(request.url).path.split('/');
    const addr = path[1];
    if (addr == 'favicon.ico') {
        response.statusCode = 404;
        response.end();
        return;
    }
    path.splice(1, 1);
    delete request.headers.host;

    let data = '';
    request.on('data', chunk => {
        data += chunk;
    });
    request.on('end', () => {
        client.send(
            addr,
            JSON.stringify({
                method: request.method,
                path: path.join('/'),
                headers: request.headers,
                body: data
            })
        ).then(data => {
            const responseData = JSON.parse(data);
            Object.entries(responseData.headers).forEach(([k, v]) => {
                response.setHeader(k, v);
            });
            response.statusCode = responseData.statusCode;
            response.end(responseData.body);
        });
    });
})

server.listen(80);