import { Command, Arguments, Permission, discordErrorHandler, Roles } from "../../defs";
import { Message } from "discord.js";
import * as SteamReviews from "../../steam-reviews";

const message =
	`Abrindo as entradas para o sorteio de R$20,00 na carteira da Steam. Mande print dos likes nas reviews listadas para ganhar entradas para o sorteio. <@&${Roles.community}>

Reviews para dar like:
`;

export default <Command>{
	async run(msg: Message, args: Arguments, raw: string[]) {
		if (!(msg.member?.hasPermission("ADMINISTRATOR") || msg.author.id === "327576484396924929" /*id do gabe*/))
			return;

		args.shift();
		if (args.length < 2)
			return msg.reply("tem que ter pelo menos 2 argumentos, né?").catch(discordErrorHandler);

		SteamReviews.reset();
		let text = message;
		while (args.length > 1) {
			if (args[0].kind !== "MEMBER")
				break;
			const member = args[0].value;

			if (args[1].kind !== "STRING")
				break;
			const link = args[1].value;

			text += `➡️ ${link}\n`;
			SteamReviews.pointTo(member.id);

			args.shift();
			args.shift();
		}

		SteamReviews.update();

		msg.channel.send(text);
		msg.delete();
	},
	aliases: ["cr_start"],
	syntaxes: ["<@user> <url> ..."],
	description: "Dá entrada para um usuário no giveaway.",
	help: "Dá entrada para um usuário no giveaway.",
	examples: ["@luigipo"],
	permissions: Permission.NONE
}