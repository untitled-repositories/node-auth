# Boilerplate Node app

```
//config.js
var config = {};

config.port = 3001;
config.db = 'mongodb://user:passwd@host:port/app';
config.secret = 'this is the secret secret secret 12356';
config.tokenExpiration = 60 * 60 * 24; // 1day in seconds

config.email = 'romil@romil.ee';
config.developer_email = 'romil@tlu.ee';
config.errorMails = true; // email developer on critical error

config.realm = 'http://localhost:3001'; //main url used by google auth
config.public_url = 'http://untitled.untitled'; // redirect url after login

config.googleAuth = {
    clientID: '',
    clientSecret: '',
    callbackURL: ''
};

config.log = {
    level: 7,
    appName: 'app'
};

module.exports = config;
```


DB

```
use app
db.createUser(
  {
    user: "Admin",
    pwd: "Password",
    roles: [ { role: "readWrite", db: "app" } ]
  }
)

```
