const Discord = require('discord.js');

const client = new Discord.Client();

const discordServer = require('./src/constants');
const Moderation = require('./src/Components/Moderation');

const isEvalEnabled = false;
const specialInvite = 'p9WN6Rx';
const roleToAdd = "585871344718184458";
const shitpostChannel = "playground";
const admins = ["373670846792990720", "330403904992837632", "412797158622756864", "457020706857943051", "290130764853411840", "141958545397645312"];

const invites = {};

const wait = require('util').promisify(setTimeout);

// Argumentos padrões: (Message, Arguments)
const Commands = {
	mute: Moderation.mute,
	unmute: Moderation.unmute,
	ban: Moderation.ban,
	kick: Moderation.kick,
	/*setprefix: function (msg, args) {
		if (!isAdmin(msg.author)) return;
		if (args.length < 2) {
			msg.channel.send(`${msg.author} Essa sintaxe para este comando é inválida.`);
			return;
		}

		prefix = args[1];
		channel.send(`Prefixo alterado para \`${args[1]}\``);
	},*/
	ping: async msg => {
		if (msg.channel.name !== shitpostChannel) return;
		const m = await msg.channel.send("...");
		m.edit(`\`Bot Latency:\` ${m.createdTimestamp - msg.createdTimestamp}ms\n\`API Latency:\` ${Math.round(client.ping)}ms`);
	},
	ulon: function (msg) {
		if (msg.channel.name !== shitpostChannel) return;
		const qnt = Math.floor(Math.random() * 200 + 2);
		msg.channel.send("UL" + "O".repeat(qnt) + "N")
			.catch(console.error);
	},
	// eval: function (msg, args) {
	// 	if (!isEvalEnabled || !isAdmin(msg.author)) break;
	// 	const toEval = args.slice(1, args.length).join(' ');
	// 	try {
	// 		const evl = eval(toEval);
	// 		msg.channel.send(`${msg.author} \`${evl}\``);
	// 	} catch (e) {
	// 		msg.channel.send("" + e);
	// 	}
	// },
	curso: function (msg) {
		msg.channel.send(`${msg.author} Aqui está o link do curso: ${discordServer.cursoLink}`);
	}
};

client.on('ready', () => {
	wait(1000);

	client.guilds.forEach(g => {
		g.fetchInvites().then(guildInvites => {
			invites[g.id] = guildInvites;
		});
	});

	console.log("Online");
	client.user.setPresence({ game: { name: "o curso do NoNe!", url: discordServer.cursoLink, type: 3 }, status: "online" })
		.then(console.log)
		.catch(console.error);

	const minute = 1000 * 60;
	const curr = Date.now();
	setTimeout(Moderation.autoUnmute, minute - (curr - Math.floor(curr / minute) * minute), client);
});

client.on('guildMemberAdd', member => {
	member.guild.fetchInvites().then(guildInvites => {
		const ei = invites[member.guild.id];
		invites[member.guild.id] = guildInvites;
		const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		//const inviter = invite.inviter.id;

		if (invite !== null && invite.code === specialInvite) {
			member.addRole(roleToAdd);
		}
	});
});

// Comandos
client.on('message', async msg => {
	let justMentioned = false;
	msg.mentions.members.forEach(m => {
		if (m.id === client.user.id && msg.content.split(' ').length === 1) justMentioned = true;
	});

	if (justMentioned) {
		msg.channel.send(`O prefixo atual é \`${discordServer.prefix}\``);
		return;
	}

	if (msg.content.slice(0, discordServer.prefix.length) !== discordServer.prefix) return;

	const args = msg.content.slice(discordServer.prefix.length, msg.content.length).split(' ');

	if (Commands[args[0]] === undefined) {
		msg.channel.send(`${msg.author} Comando desconhecido.`);
		return;
	}

	Commands[args[0]](msg, args);
});

client.login('NjMwODkyNjY5Mzg3OTMxNjQ5.XZvwgA.giplHaiI73t62ThkYwMqKygpgIM');
