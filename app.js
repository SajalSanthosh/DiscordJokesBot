const Discord = require("discord.js");
var request = require("request");

require("dotenv").config();

//Intialize the Discord API
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot is ready");
});

//Login using the bot tocken
client.login(process.env.BOT_TOKEN);

client.on("messageCreate", (msg) => {
  //check if the message contains the following commands
  if (
    msg.content.includes("Tell me a joke") ||
    msg.content.includes("joke please") ||
    msg.content.includes("one more joke")
  ) {
    //Request joke api to get a random joke
    request(
      "https://official-joke-api.appspot.com/jokes/random",
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //parse the response as JSON
          let json = JSON.parse(body);
          //Send the joke to the channel
          msg.channel.send(json["setup"]);
          msg.channel.send(json["punchline"] + "  :rofl: :joy: ");
        }
      }
    );
  }
});
