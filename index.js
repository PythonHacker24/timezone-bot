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

(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log("⚡️ Slack bot running");
  } catch (err) {
    console.error(err);
  }
})();
