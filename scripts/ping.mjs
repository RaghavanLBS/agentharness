// Smoke test: one tiny request to confirm the API key and SDK work.
// Run: ANTHROPIC_API_KEY=$(cat <key file>) node scripts/ping.mjs
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

const response = await client.messages.create({
  model: "claude-haiku-5-5",
  max_tokens: 1024,
  output_config: { effort: "low" },
  messages: [{ role: "user", content: "Reply with exactly: pong" }],
});

if (response.stop_reason === "refusal") {
  console.log("refused:", response.stop_details);
} else {
  const text = response.content.find((b) => b.type === "text")?.text;
  console.log("model:", response.model);
  console.log("reply:", text);
  console.log("tokens in/out:", response.usage.input_tokens, "/", response.usage.output_tokens);
}
