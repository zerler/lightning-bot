var http = require("http");

const survive = () => {
    const now = new Date();

    if (now.getHours() < 3 || now.getHours() > 13){
        http.get("http://zerler-lightning-bot.herokuapp.com");
        console.log('keeping myself alive :)');
    } else {
    	console.log(`bedtime!! it's ${now.getHours()}:${now.getMinutes()}`);
    }
};

exports.survive = survive;