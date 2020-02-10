
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://error-team.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const fs = require("fs");
const { TOKEN, prefix, devs } = require("./config");
const Canvas = require("canvas");
const weather = require("weather-js");
//امسح الي فوقي
const moment = require("moment");
const dateFormat = require("dateformat");
client.login(TOKEN);

//=============================== - [ Discord.js Bot ] - ===================================//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("");
  console.log("");
  console.log(
    "╔[═════════════════════════════════════════════════════════════════]╗"
  );
  console.log(`[Start] ${new Date()}`);
  console.log(
    "╚[═════════════════════════════════════════════════════════════════]╝"
  );
  console.log("");
  console.log("╔[═════════════════════════════════════]╗");
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log("");
  console.log(`Informations About ${client.user.username}:`);
  console.log("");
  console.log(`Servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`Channels! [ " ${client.channels.size} " ]`);
  console.log(`Arch! [ " ${process.arch} " ]`);
  console.log(`Platform! [ " ${process.platform} " ]`);
  console.log(`Node Version! [ " ${process.version}" ]`);
  console.log(`Prefix! [ " ${prefix}" ]`);
  console.log(`Language! [ " NodeJS " ]`);
  console.log(
    `Ram Usage! [ " ${(process.memoryUsage().rss / 1048576).toFixed()}MB " ]`
  );
  console.log("╚[════════════════════════════════════]╝");
  console.log("");
  console.log("╔[════════════]╗");
  console.log(`${client.user.username} Is Online`);
  console.log("╚[════════════]╝");
  console.log("");
  console.log("╔[════════════]╗");
  console.log("Created By: Weso Sallto7");
  console.log("╚[════════════]╝");
});






var config = {
  events: [
    {type: "CHANNEL_CREATE", logType: "CHANNEL_CREATE", limit: 1 , delay: 5000},
    {type: "CHANNEL_DELETE", logType: "CHANNEL_DELETE", limit: 1, delay: 5000},
    {type: "GUILD_MEMBER_REMOVE", logType: "MEMBER_KICK", limit: 1, delay: 5000},
    {type: "GUILD_BAN_ADD", logType: "MEMBER_BAN_ADD", limit: 1, delay: 5000},
    {type: "GUILD_ROLE_CREATE", logType: "ROLE_CREATE", limit: 1, delay: 5000},
    {type: "GUILD_ROLE_DELETE", logType: "ROLE_DELETE", limit: 1, delay: 5000},
  ]
}
client.on("error", (e) => console.error(e));
client.on("raw", (packet)=> {
  let {t, d} = packet, type = t, {guild_id} = data = d || {};
  if (type === "READY") {
    client.startedTimestamp = new Date().getTime();
    client.captures = [];
  }
  let event = config.events.find(anEvent => anEvent.type === type);
  if (!event) return;
  let guild = client.guilds.get(guild_id);
  if (!guild) return;
  guild.fetchAuditLogs({limit : 1, type: event.logType})
    .then(eventAudit => {
      let eventLog = eventAudit.entries.first();
      if (!eventLog) return;
      let executor = eventLog.executor;
      guild.fetchAuditLogs({type: event.logType, user: executor})
        .then((userAudit, index) => {
          let uses = 0;
          userAudit.entries.map(entry => {
            if (entry.createdTimestamp > client.startedTimestamp && !client.captures.includes(index)) uses += 1;
          });
          setTimeout(() => {
            client.captures[index] = index
          }, event.delay || 2000)
          if (uses >= event.limit) {
            client.emit("reachLimit", {
              user: userAudit.entries.first().executor,
              member: guild.members.get(executor.id),
              guild: guild,
              type: event.type,
            })
          }
        }).catch(console.error)
    }).catch(console.error)
});




client.on("reachLimit", (limit)=> {
    let log = limit.guild.channels.find( channel => channel.name === "log");
    log.send(`<@${limit.user.id}>`+"\ntried to hack (!)");
    limit.guild.owner.send(limit.user.username+"\ntried to hack (!)")
    limit.member.roles.map(role => {
      limit.member.removeRole(role.id)
      .catch(log.send)
    });
  });

client.on('ready', () => {
      console.log(`ON ${client.guilds.size} Servers '     ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`Don't touch Me`,"http://twitch.tv/S-F")
client.user.setStatus("dnd")
});


client.on('message',async message => {
    if (!message.guild || message.author.bot) return;
    var command = message.content.toLowerCase().split(" ")[0];
   var args = message.content.toLowerCase().split(" ");
   var user = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id === args[1]));
 
   if(command == prefix +'topinv') {
       if(!args[1] !== 'inv')
       if(message.channel.type !== "text") return;
message.guild.fetchInvites().then(res => {
       let invs = new Discord.Collection();
       res.forEach(i => {
           if(!message.guild.member(i.inviter.id)) return;
           if(!invs.has(i.inviter.id)) invs.set(i.inviter.id, i.uses);
           else invs.set(i.inviter.id, invs.get(i.inviter.id)+i.uses);
       })
       let desc = "";
 
     
       console.log(invs.sort((a, b) => b - a))
       desc += invs.sort((a, b) => b - a).firstKey(10).map((id, index) => "#" + (index+1) + " | " + (message.guild.member(id) ? message.guild.member(id) : "``Unknown``") + " invites: `" + invs.sort((a, b) => b - a).array()[index] + "`").join("\n");
       let embed = new Discord.RichEmbed()
       .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
       .setTitle(" INVITES [ 1/1 ]")
       .setTimestamp()
       .setColor('Default')
       .setFooter(message.author.tag, message.author.avatarURL)
       .setDescription(desc);
       message.channel.send(embed);    
})
   }
       });




 
 
 
 
 
 
 
const profile = JSON.parse(fs.readFileSync("profile.json", "utf8"));
 
 
 client.on('message', message => {
          if(!profile[message.author.id]) profile[message.author.id] ={
              points: 0,
              level: 1,
              rep: 0,
              tite: "No Title"
          };
          if(message.author.bot) return;
          profile[message.author.id].points = Math.floor(profile[message.author.id].points+1);
          if(profile[message.author.id].points > 250) {
              profile[message.author.id].points = 0
              profile[message.author.id].level = Math.floor(profile[message.author.id].level+1);
              message.channel.send(`**${message.author.username}, You leveld up to __${profile[message.author.id].level}__**`)
          }
          fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
      })
 
    client.on('message', message => {
        let tit = message.content.split(" ").slice(1).join(" ");
        if(message.content.startsWith(prefix + "title")) {
        if(!profile[message.author.id].tite) profile[message.author.id].tite = "Hey im using Super"
        if(!tit) {
            message.channel.send("**Usage: <title <something>**");
        } else {
            profile[message.author.id].tite = tit
            message.channel.send(`:ok:`)
        }
        }
        fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
    })
 
client.on('message', message => {
 
    if(message.content.startsWith(prefix + 'rep')) {
      if(!message.channel.guild) return;
                    moment.locale('en');
                  var getvalueof = message.mentions.users.first()
                    if(!getvalueof) return message.channel.send(`**:mag: |  ${message.author.username}, the user could not be found.    **`);
                       if(getvalueof.id == message.author.id) return message.channel.send(`**${message.author.username}, you cant give yourself a reputation !**`)
    if(profile[message.author.id].reps != moment().format('L')) {
            profile[message.author.id].reps = moment().format('L');
            profile[getvalueof.id].rep = Math.floor(profile[getvalueof.id].rep+1);
         message.channel.send(`** :up:  |  ${message.author.username} has given ${getvalueof} a reputation point!**`)
        } else {
         message.channel.send(`**:stopwatch: |  ${message.author.username}, you can raward more reputation  ${moment().endOf('day').fromNow()} **`)
        }
       }
       fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
});
 
    client.on("message", message => {
  if (message.author.bot) return;
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + "profile")) {
                               let user = message.mentions.users.first();
         var men = message.mentions.users.first();
            var heg;
            if(men) {
                heg = men
            } else {
                heg = message.author
            }
          var mentionned = message.mentions.members.first();
             var h;
            if(mentionned) {
                h = mentionned
            } else {
                h = message.member
            }
            var ment = message.mentions.users.first();
            var getvalueof;
            if(ment) {
              getvalueof = ment;
            } else {
              getvalueof = message.author;
            }
   var mentionned = message.mentions.users.first();
  let mention = message.mentions.users.first() || message.author;
 
    var client;
      if(mentionned){
          var client = mentionned;
      } else {
          var client = message.author;
 
      }
if (!profile[getvalueof.id]) profile[getvalueof.id] = {points: 0,reps: "No Reps", credits: 1, level: 1,tite: "Earth Bot User", rep: 0, lastDaily: "NOT COLLECTED"};
            let Image = Canvas.Image,
            canvas = new Canvas.createCanvas(300, 300),
            ctx = canvas.getContext('2d');
            fs.readFile("Pic.jpg", function (err, Background) { //امتداد الصورة
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 300, 300); // حجم الصورة
 
})
 
 
 
 
                let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                        ctx.fontSize = '40px'; // عرض الخط
                        ctx.fillStyle = "#000000"; // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${getvalueof.username}`, 153, 104) // احداثيات اسمك
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                        ctx.fontSize = '40px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1"; // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${getvalueof.username}`, 151, 102) // احداثيات اسمك
 
                        //credit
                        ctx.font = "bold 10px kathen" // نوع الخط وحجمه
                        ctx.fontSize = '10px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`$${credits[mention.id].credits}`, 230, 182) // احداثيات المصاري
 
 
                        ctx.font = "bold 14px kathen" // نوع الخط وحجمه
                        ctx.fontSize = '12px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[mention.id].tite}`, 150, 130) // احداثيات المصاري
 
                        //Level
                        ctx.font = "bold 24px kathen" // نوع الخط و حجمه
                        ctx.fontSize = '10px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].level}`, 70, 78) // احداثيات اللفل
 
                         //info
                        ctx.font = "bold 12px kathen" // ن
                        ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                        ctx.fillStyle = "#000000" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232) // احداثيات النقاط
 
                        //info
                        ctx.font = "bold 12px kathen" // ن
                        ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232) // احداثيات النقاط
 
                        // REP
                        ctx.font = "bold 20px  kathen";
                        ctx.fontSize = "50px";
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(`+${profile[mention.id].rep}`, 225, 76)
 
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
 
ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(75, 100, 780, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 110, 29, 82, 60);
 
message.channel.startTyping()
message.channel.sendFile(canvas.toBuffer())
message.channel.stopTyping()
})
})
}
});



//const Discord = require('discord.js');
//const client = new Discord.Client();
//const fs = require('fs');
//const prefix = 'v!'
const pretty = require('pretty-ms'); // npm i pretty-ms
//const Canvas = require("canvas");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

const credits = JSON.parse(fs.readFileSync("./credits.json"));
var time = require("./time.json");
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
if (args[0].toLowerCase() == `${prefix}credits` ||
args[0].toLowerCase() === `${prefix}credit` ||
args[0].toLowerCase() === `c` ||
args[0].toLowerCase() === `${prefix}c` ||
args[0].toLowerCase() === `C`

) {

    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if (!args[2]) {
      message.channel.send(
        `**${mention.username}, Your <a:emoji_23:673134050831106079>  balance is \`$${credits[mention.id].credits}\`**`
      );
    } else if (mentionn && args[2]) {
      if (isNaN(args[2])) return message.channel.send(`**:x: | Error**`);
      if (args[2] < 1) return message.channel.send(`**:x: | Error**`);
      if (mention.bot) return message.channel.send(`**:x: | Error**`);
      if (mentionn.id === message.author.id)
        return message.channel.send(`**:x: | Error**`);
      if (args[2] > credits[author].credits)
        return message.channel.send(
          `**:x: | Error , You Don't Have Enough Credit**`
        );
      if (args[2].includes("-")) return message.channel.send(`**:x: | Error**`);
      //let resulting = Math.floor(args[2] - args[2] * (5 / 100));
      //let tax = Math.floor(args[2] * (5 / 100));
      let first = Math.floor(Math.random() * 9);
      let second = Math.floor(Math.random() * 9);
      let third = Math.floor(Math.random() * 9);
      let fourth = Math.floor(Math.random() * 9);
      let num = `${first}${second}${third}${fourth}`;
      let canvas = Canvas.createCanvas(108, 40);
      let ctx = canvas.getContext("2d");
 let tax = message.content.split(" ")[1]
let Price = message.content.split(" ")[2];
 tax = tax.replace(/%5/g,"");
let resulting = Math.floor(Price-(Price*(5/100)));      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/606837977532071957/608449967199354881/20190807_010123.jpg"
      );
      ctx.drawImage(background, 5, 1, canvas.width, canvas.height);
      ctx.font = "sans-serif";
          ctx.fontSize = "200px";
          ctx.fillStyle = "#ffffff";
     // let resulting = Math.floor(Price-(Price*(5/100)));
      message.channel.send(`**${message.author.username}, You Will Trans \`${resulting}\`, Amount :\`$${args[2]}\` **
  **If You Want To Complete Trans Type: **`
)
.then(m => {
          ctx.fillText(num, canvas.width / 2.4, canvas.height / 1.7);
          message.channel.sendFile(canvas.toBuffer()).then(m => {
            message.channel
              .awaitMessages(r => r.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })
              .then(collected => {
                if (collected.first().content === num) {
                  message.channel.send(
                    `**:moneybag: | ${
                      message.author.username
                    }, Done Trans \`$${resulting}\` To ${mentionn}**`
                  );
                  mention.send(
                    `:money_with_wings: | Transfer Receipt \`\`\`You Have Received \`$${resulting}\` From User ${
                      message.author.username
                    }; (ID (${message.author.id})\`\`\``
                  );
                  m.delete();
                  credits[author].credits += Math.floor(
                    -resulting
                  );
                  credits[mentionn.id].credits += Math.floor(
                    +resulting
                  );
                  fs.writeFileSync(
                    "./credits.json",
                    JSON.stringify(credits, null, 4)
                  );
                } else {
                  m.delete();
                  message.delete();
                }
              });
          });
        });
    } else {
      message.channel.send(
        `**:x: | Error , Please Command True Ex: \`${prefix}credits [MentionUser] [Balance]\`**`
      );
    }
  }
  if (args[0].toLowerCase() === `${prefix}daily` ||
 args[0].toLowerCase() === `d` ||
 args[0].toLowerCase() === `${prefix}d` ||
args[0].toLowerCase() === `D`
) {
    let cooldown = 8.64e7;
    let Daily = time[message.author.id];
    if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
      let times = cooldown - (Date.now() - Daily);
      message.channel.send( `** <a:emoji_20:673133849173164052>  ${ message.author.username }, Your Daily Credits Refreshes in \`[${pretty(times, { verbose: true })}.]\`**`);
      fs.writeFile("./time.json", JSON.stringify(time), function(e) {
        if (e) throw e;
      });
    } else {
      let ammount = (300, 500, 100, 200, 120, 150, 350, 320, 220, 800);
      credits[author].credits += ammount;
      time[message.author.id] = Date.now();
      message.channel.send(
        `**<a:emoji_13:673133400722243594> | ${message.author.username}, You Received ${ammount} daily credits!**`
      );
      fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    }
  }
}); // Me ZIAD كم حاقد

const d = ["642506040750899240", "599351862692544532", "368537351984513025", "505022273418428426"];
client.on("message", message => {
  let alias = message.content.split(" ")[0].substring(prefix.length);
  let mention = message.mentions.users.first() || message.author;
  if (alias === "cr") {
    let args = message.content.split(" ");
    if (!d.includes(message.author.id)) return;
    let args1 = message.content.split(" ").slice(1);
    if (args1 < 1) return message.reply("Write a number");
    if (!credits[mention.id]) return;
    if (!d.includes(message.author.id)) return;
    else credits[mention.id].credits += +args[1]; //
    fs.writeFileSync("./credits.json", JSON.stringify(credits));
    message.channel.send(`**Adedd Money For**: \`${args[1]}\`**.**`);
  }
});
client.on("message", message => {
  let alias = message.content.split(" ")[0].substring(prefix.length);
  let mention = message.mentions.users.first() || message.author;
  if (alias === "rc") {
    let args = message.content.split(" ");
    if (!d.includes(message.author.id)) return;
    let args1 = message.content.split(" ").slice(1);
    if (args1 < 1) return message.reply("Write a number");
    if (!credits[mention.id]) return;
    if (!d.includes(message.author.id)) return;
    else credits[mention.id].credits += -args[1];//
    fs.writeFileSync("./credits.json", JSON.stringify(credits));
    message.channel.send(`**Remove Money For**: \`${args[1]}\`**.**`);
  }
});
