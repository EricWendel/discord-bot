require("dotenv").config();
import { Client, ClientOptions, GatewayIntentBits } from "discord.js";
import { Client as dbClient, Query } from "ts-postgres";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

console.log("Bot is starting...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const dbstuff = async () => {
  // add these db properties to .env later
  const databaseClient = new dbClient({
    user: "discord",
    password: "discord",
    database: "discord",
  });
  await databaseClient.connect();

  try {
    const result = databaseClient.query("SELECT * FROM users");
    //const result = await databaseClient.execute(query1);
    for await (const row of result) {
      console.log(row);
    }
  } finally {
    await databaseClient.end();
  }
};

ready(client);
interactionCreate(client);

client.login(process.env.TOKEN);

//dbstuff();

//console.log(client);
