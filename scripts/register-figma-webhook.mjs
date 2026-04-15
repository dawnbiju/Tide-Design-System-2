#!/usr/bin/env node
/**
 * register-figma-webhook.mjs
 *
 * Registers a Figma webhook pointing at your Cloudflare Worker bridge.
 * Run once after deploying the worker.
 *
 * Usage:
 *   FIGMA_TOKEN=xxx \
 *   FIGMA_TEAM_ID=xxx \
 *   WEBHOOK_URL=https://tide-figma-webhook-bridge.<your-subdomain>.workers.dev \
 *   WEBHOOK_SECRET=your-secret \
 *   node scripts/register-figma-webhook.mjs
 *
 * Required env vars:
 *   FIGMA_TOKEN    — Figma Personal Access Token (read scope)
 *   FIGMA_TEAM_ID  — Your Figma team ID (see instructions below)
 *   WEBHOOK_URL    — Public URL of your deployed Cloudflare Worker
 *   WEBHOOK_SECRET — A secret string you choose (must match WEBHOOK_SECRET in worker)
 *
 * How to find your Figma team ID:
 *   Open Figma → click your team name in the left sidebar →
 *   look at the URL: figma.com/files/team/{TEAM_ID}/...
 */

const {
  FIGMA_TOKEN,
  FIGMA_TEAM_ID,
  WEBHOOK_URL,
  WEBHOOK_SECRET,
} = process.env

// ── Validate ──────────────────────────────────────────────────────────────────
const missing = ['FIGMA_TOKEN', 'FIGMA_TEAM_ID', 'WEBHOOK_URL', 'WEBHOOK_SECRET']
  .filter(k => !process.env[k])

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`)
  process.exit(1)
}

// ── List existing webhooks (so we can avoid duplicates) ───────────────────────
async function listWebhooks() {
  const res = await fetch(`https://api.figma.com/v2/webhooks`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  })
  if (!res.ok) throw new Error(`Figma list webhooks failed: ${res.status}`)
  const data = await res.json()
  return data.webhooks ?? []
}

// ── Register a new webhook ────────────────────────────────────────────────────
async function registerWebhook(eventType) {
  const res = await fetch('https://api.figma.com/v2/webhooks', {
    method: 'POST',
    headers: {
      'X-Figma-Token': FIGMA_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: eventType,
      team_id: FIGMA_TEAM_ID,
      endpoint: WEBHOOK_URL,
      passcode: WEBHOOK_SECRET,
      status: 'ACTIVE',
      description: `Tide DS — triggers GitHub figma-sync on ${eventType}`,
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Failed to register ${eventType}: ${JSON.stringify(data)}`)
  }
  return data
}

// ── Delete a webhook ──────────────────────────────────────────────────────────
async function deleteWebhook(webhookId) {
  const res = await fetch(`https://api.figma.com/v2/webhooks/${webhookId}`, {
    method: 'DELETE',
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  })
  if (!res.ok) throw new Error(`Failed to delete webhook ${webhookId}: ${res.status}`)
}

// ── Main ──────────────────────────────────────────────────────────────────────
const EVENT_TYPES = ['FILE_VERSION_UPDATE', 'LIBRARY_PUBLISH']

console.log('🔍 Fetching existing Figma webhooks...')
const existing = await listWebhooks()

// Remove any stale webhooks pointing at our URL
const stale = existing.filter(w => w.endpoint === WEBHOOK_URL)
if (stale.length) {
  console.log(`🗑  Removing ${stale.length} existing webhook(s) for this endpoint...`)
  await Promise.all(stale.map(w => deleteWebhook(w.id)))
}

// Register fresh webhooks for each event type
console.log(`📡 Registering webhooks → ${WEBHOOK_URL}`)
for (const eventType of EVENT_TYPES) {
  const result = await registerWebhook(eventType)
  console.log(`  ✓ ${eventType} — webhook ID: ${result.id}`)
}

console.log(`
✅ Done! Figma will now POST to your worker whenever:
   • A named version is created in the file  (FILE_VERSION_UPDATE)
   • A library is published                   (LIBRARY_PUBLISH)

Your worker will forward these to GitHub, triggering the figma-sync workflow.
`)
