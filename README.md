# nkn-http-proxy
Allows to browse HTTP websites through NKN network  
Consists of two parts: `client` and `server`

## client
This should be run on the computer that wants to access NKN websites.

Firstly setup your private key inside `client.js`  
Then run this inside `client` directory
```shell
npm install
node client
```

You can add IP `127.0.0.1` with hostname `nkn` to `hosts`: https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/

Then you will be able to access NKN websites like this:  
`http://nkn/publicKey`  
or  
`http://nkn/identifier.publicKey`  
or  
`http://nkn/registeredName`  
or  
`http://nkn/identifier.registeredName`

## server
This should be run on the computer that hosts website to make that website available through NKN.

Firstly setup your private key inside `server.js`  
Then run this inside `server` directory
```shell
npm install
node server
```
