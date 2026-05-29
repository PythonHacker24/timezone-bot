const { App } = require("@slack/bolt");

console.log("TOKEN:", !!process.env.SLACK_BOT_TOKEN);
console.log("SECRET:", !!process.env.SLACK_SIGNING_SECRET);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const TEAM = [
  { emoji: "🇮🇳", name: "Aditya Patil", location: "India", tz: "Asia/Kolkata" },
  { emoji: "🇺🇸", name: "Julia", location: "Miami", tz: "America/New_York" },
  { emoji: "🇺🇸", name: "Sam Kaplan", location: "San Francisco", tz: "America/Los_Angeles" },
  { emoji: "🇺🇸", name: "Andrew", location: "New York", tz: "America/New_York" },
];

function currentTime(tz) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

app.command("/teamtime", async ({ ack, respond }) => {
  await ack();

  const lines = TEAM.map(
    (m) => `${m.emoji}  *${m.name}* — ${currentTime(m.tz)}  _(${m.location})_`
  );

  await respond({
    response_type: "ephemeral",
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "🌍 Team Timezones", emoji: true },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: lines.join("\n") },
      },
    ],
  });
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
