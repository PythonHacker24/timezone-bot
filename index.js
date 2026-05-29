const { App } = require("@slack/bolt");

console.log("TOKEN:", !!process.env.SLACK_BOT_TOKEN);
console.log("SECRET:", !!process.env.SLACK_SIGNING_SECRET);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/teamtime", async ({ ack, respond }) => {
  await ack();
  await respond("Timezone bot is alive 🚀");
});

const PORT = Number(process.env.PORT) || 3000;

(async () => {
  try {
    await app.start({ port: PORT, host: "0.0.0.0" });
    console.log(`⚡️ Slack bot running on 0.0.0.0:${PORT} (env PORT=${process.env.PORT})`);
  } catch (err) {
    console.error(err);
  }
})();
