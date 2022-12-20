import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Find: Command = {
  name: "find",
  description: "find a member in a voice channel",
  options: [
    {
      name: "user",
      description: "the user to record",
      type: 6,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    let content = "Hello there!";

    if (!interaction.guildId) {
      return;
    }
    const Guild = interaction.guild; // Getting the guild.
    if (!Guild) {
      return;
    }
    if (!interaction.options.data[0].user?.id) {
      return;
    }
    const Member = Guild.members.cache.get(
      interaction.options.data[0].user?.id
    ); // Getting the member.
    if (!Member) {
      return;
    }
    if (Member.voice.channel) {
      content = `${Member.user.tag} is connected to ${Member.voice.channel.name}!`;
    } else {
      content = `${Member.user.tag} is not connected to a voice channel.`;
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
