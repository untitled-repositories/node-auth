var config = {};

config.port = 3001;
config.db = 'mongodb://untitled:untitled@127.0.0.1:26016/untitled';
config.secret = 'this is the secret secret secret 12356';
config.tokenExpiration = 60 * 60 * 24; // 1day in seconds

config.email = 'romil@romil.ee';
config.developer_email = 'romil@tlu.ee';
config.errorMails = true; // email developer on critical error

config.realm = 'http://localhost:3001'; //main url used by google auth
config.public_url = 'http://untitled.romil.local'; // redirect url after login

config.googleAuth = {
    clientID: '899947760166-vkuraobalr9kfdofubvgbd0kfv7h6ihs.apps.googleusercontent.com',
    clientSecret: 'jUk_nliZ8jFpfgJvVpxeUwDj',
    callbackURL: 'http://localhost:3001/api/google/oauth2callback'
};

config.log = {
    level: 7,
    appName: 'app'
};

module.exports = config;
