import { Command, Arguments, Permission, discordErrorHandler, Time } from "../../defs";
import { Message } from "discord.js";

export default <Command>{
	async run(msg: Message, args: Arguments, raw: string[]) {
		if (!msg.member || !msg.member.voice.channel || msg.client.voice?.connections.size)
			return;

		msg.member.voice.channel.join().then(connection => {
			const dispatcher = connection.play("assets/ola-pessoal.ogg");

			const action = () => setTimeout(() => connection.disconnect(), Time.second);
			dispatcher.on("finish", action);
			dispatcher.on("error", action);
		}).catch(discordErrorHandler);
	},
	aliases: ["ola", "pessoal"],
	syntaxes: [""],
	description: "Olá pessoal.",
	help: "Olá pessoal.",
	examples: [""],
	permissions: Permission.NONE
}