const ping = require('ping');

const selfPing = () => {
    const now = new Date();
    if (now.getHours >= 3 && now.getHours <= 13){
        return;
    }

    ping.sys.probe('zerler-lightning-bot.herokuapp.com', () => {
        console.log('pinged myself to stay awake :)');
    });
};

exports.selfPing = selfPing;