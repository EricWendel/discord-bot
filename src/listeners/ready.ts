import { Client } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);
  });

  client.on("guildMemberAdd", member => {
    //console.log("new member join")
    member.send("Welcome to the server!").catch(console.error);
  });

};
