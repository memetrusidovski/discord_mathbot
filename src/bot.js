require('dotenv').config();
const Discord = require('discord.js');
const Canvas = require('canvas');
const m  = require( "./mathjax.js");
var { derivative, evaluate } = require("mathjs");


const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');

});

client.on('guildMemberAdd', async (member,message) => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general-math');
	x = await evaluate(message);

	eq = await m(message);
	console.log(x);
	//console.log(derivative(message,'x'), "<----");

	const wid = parseInt(eq[1].a.slice(0,2)) *20;
	const hght = parseInt(eq[1].b.slice(0,2)) *20;
    const canvas = Canvas.createCanvas(wid, hght);
	const ctx = canvas.getContext('2d');

	console.log(wid, "    ", hght);

	const fv = new Buffer(eq[0]); 
	

	// Since the image takes time to load, you should await it
	const background = await Canvas.loadImage(fv);
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	// Use helpful Attachment class structure to process the file for you
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Your Question Formatted is: `, attachment);
	channel.send(x, 'the value is: ', x);
});

client.on('message', message => {
	if (message.author.bot) return;

	if (message.content === 'n') {
		client.emit('guildMemberAdd', message.member);
	}
	
	client.emit('guildMemberAdd',message.member, message.content);
});

client.login(process.env.DISCORDJS_BOT_TOKEN);