const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/teamtime", async ({ ack, respond }) => {
  await ack();

  await respond("Timezone bot is alive 🚀");
});

(async () => {
  await app.start(process.env.PORT || 3000);
})();
