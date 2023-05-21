import { Client } from "discord.js";
import { Commands } from "../Commands";

let Guilds: string[];

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    await client.application.commands.set(Commands);

    Guilds = client.guilds.cache.map(guild => guild.id);
    console.log(`${client.user.username} is online`);
  });

  client.on("messageCreate", async message => {
    if(message.author === client.user || message.guild != null){
      return;
    }

    let arrWords = message.content.split(" ");
    if(arrWords.length != 3){
      message.author.send("Please follow this format: 'FirstName Lastname Callsign'");
      return;
    }

    for (let i = 0; i < Guilds.length; i++) {
      let curGuild = client.guilds.cache.get(Guilds[i]);
      if(curGuild == null){
        continue;
      }
      let curUser;
      try{
        curUser = await curGuild.members.fetch(message.author.id);
      }
      catch{
        continue;
      }
      if(curUser){
        let curNickname = arrWords[2] + " (" + arrWords[0] + " " + arrWords[1][0] + ")";
        curUser.setNickname(curNickname);
        message.author.send("Your nickname has been set to \"" + curNickname + "\"");
      }
    }
  })

  client.on("guildMemberAdd", member => {
    //console.log("new member join")
    member.send("Welcome to the server!\n" + 
    "Please set your server nickname by sending me the following info: 'Firstname Lastname Callsign'"
    ).catch(console.error);
  });

};
