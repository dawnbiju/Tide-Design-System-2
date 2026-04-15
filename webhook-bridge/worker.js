/**
 * Tide Design System — Figma → GitHub Webhook Bridge
 *
 * Deployed as a Cloudflare Worker. Receives Figma webhook events and
 * forwards them to the GitHub repository_dispatch API, which triggers
 * the figma-sync.yml workflow.
 *
 * Environment variables (set in Cloudflare dashboard or wrangler secret):
 *   GITHUB_PAT      — GitHub Personal Access Token with `repo` write scope
 *   WEBHOOK_SECRET  — Passcode you chose when registering the Figma webhook
 *
 * Figma webhook events handled:
 *   FILE_VERSION_UPDATE  — A named version was published (recommended)
 *   FILE_UPDATE          — Any save to the file
 */

const GITHUB_REPO = 'dawnbiju/Tide-Design-System-2'
const GITHUB_EVENT = 'figma-publish'

export default {
  async fetch(request, env) {
    // ── Health check ────────────────────────────────────────────────────────
    if (request.method === 'GET') {
      return json({ status: 'ok', worker: 'figma-webhook-bridge' })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405)
    }

    // ── Parse body ──────────────────────────────────────────────────────────
    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'Invalid JSON' }, 400)
    }

    // ── Verify Figma passcode ───────────────────────────────────────────────
    // Figma sends the passcode in the body as `passcode`
    if (env.WEBHOOK_SECRET && body.passcode !== env.WEBHOOK_SECRET) {
      console.warn('Figma webhook: invalid passcode')
      return json({ error: 'Unauthorized' }, 401)
    }

    // ── Only act on relevant events ─────────────────────────────────────────
    const relevantEvents = ['FILE_VERSION_UPDATE', 'FILE_UPDATE', 'LIBRARY_PUBLISH']
    if (!relevantEvents.includes(body.event_type)) {
      console.log(`Figma webhook: ignoring event ${body.event_type}`)
      return json({ status: 'ignored', event: body.event_type })
    }

    console.log(`Figma webhook: received ${body.event_type} for file ${body.file_key}`)

    // ── Forward to GitHub repository_dispatch ───────────────────────────────
    const ghResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.GITHUB_PAT}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
          'User-Agent': 'figma-webhook-bridge/1.0',
        },
        body: JSON.stringify({
          event_type: GITHUB_EVENT,
          client_payload: {
            figma_event: body.event_type,
            file_key: body.file_key,
            triggered_at: new Date().toISOString(),
          },
        }),
      },
    )

    if (!ghResponse.ok) {
      const text = await ghResponse.text()
      console.error(`GitHub dispatch failed: ${ghResponse.status} ${text}`)
      return json({ error: 'GitHub dispatch failed', status: ghResponse.status }, 502)
    }

    console.log('GitHub dispatch succeeded — figma-sync workflow triggered')
    return json({ status: 'dispatched', event: body.event_type })
  },
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
