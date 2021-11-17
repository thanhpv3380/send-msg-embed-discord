const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

function createMessageEmbed(content) {
  const msg = new MessageEmbed().setColor("RANDOM");
  content.title && msg.setTitle(content.title);
  content.description && msg.setDescription(content.description);
  content.fields && msg.addFields(content.fields);
  content.color && msg.setColor(content.color);
  content.thumbnail && msg.setThumbnail(content.thumbnail);
  content.image && msg.setImage(content.image);
  return msg;
}

async function editMessage({ guildId, channelId, messageId, content }) {
  const guild = await client.guilds.cache.get(guildId);
  const channel = await guild.channels.cache.get(channelId);
  const message = await channel.messages.fetch(messageId);
  message.edit({ embeds: [content] });
}

async function sendEmbedMsg({ guildId, channelId, content, mention }) {
  const guild = await client.guilds.cache.get(guildId);
  const channel = await guild.channels.cache.get(channelId);
  mention && (await channel.send("@everyone"));
  await channel.send({ embeds: [content] });
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // ========= Phần cấu hình tin nhắn ===========

  // nội dung tin nhắn
  //  {
  //    title,
  //    description,
  //    fields: [
  //      {
  //        name
  //        value
  //      }
  //    ]
  //    color,
  //    image,
  //    thumbnail
  //  }
  const content = {
    title:
      'Stickers are now available to all users. When you want your "Meow Meow" to follow an interesting cat-specific expression, this Sticker is for you - a real cat trying to express emotion.',
    image:
      "https://scontent.xx.fbcdn.net/v/t1.15752-9/s403x403/252991582_2754977428144164_5116064404883280915_n.png?_nc_cat=104&ccb=1-5&_nc_sid=aee45a&_nc_ohc=8jXGhG7RKbUAX8X6jQ0&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=d2de9b58dd948d7eba47c5ebe7d6c650&oe=61B93DA5",
  };
  // id của server
  const GUIDE_ID = "907642977818648619";

  // id của channel muốn gửi message
  const CHANNEL_ID = "910535907487146005";

  // id của tin nhắn nếu muốn sửa đổi
  const MESSAGE_ID = "910561204739661824";

  // bạn có muốn mention everyone hay ko? True | False
  const mention = false;

  //  =============

  // tạo tin nhắn
  const msgEmbed = createMessageEmbed(content);

  // sự kiến gửi tin nhắn

  sendEmbedMsg({
    guildId: GUIDE_ID,
    channelId: CHANNEL_ID,
    content: msgEmbed,
    mention,
  });

  // // sự kiến sửa tin nhắn

  // editMessage({
  //   guildId: GUIDE_ID,
  //   channelId: CHANNEL_ID,
  //   messageId: MESSAGE_ID,
  //   content: msgEmbed,
  // });
});

// token của bot
const DISCORD_BOT_TOKEN =
  "OTEwMjM2NjY1MzMzODA5MjEz.YZP59A.Bit2OkttSDglADoNYNyZ-xZt9NU";

client.login(DISCORD_BOT_TOKEN);
