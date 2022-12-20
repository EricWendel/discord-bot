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
      content = "Error: can't find guild id";
      await interaction.followUp({
        ephemeral: true,
        content,
      });
      return;
    }
    const Guild = interaction.guild;
    if (!Guild) {
      content = "Error: can't find guild";
      await interaction.followUp({
        ephemeral: true,
        content,
      });
      return;
    }
    if (!interaction.options.data[0].user?.id) {
      content = "Error: can't find user id";
      await interaction.followUp({
        ephemeral: true,
        content,
      });
      return;
    }
    const Member = Guild.members.cache.get(
      interaction.options.data[0].user?.id
    );
    if (!Member) {
      content = "Error: can't find member";
      await interaction.followUp({
        ephemeral: true,
        content,
      });
      return;
    }

    if (Member.voice.channel) {
      content = `${Member.user.tag} is connected to ${Member.voice.channel.name}!`;
    } else {
      content = `${Member.user.tag} is not connected to a voice channel.`;
    }

    await interaction.followUp({
      content,
    });
  },
};
