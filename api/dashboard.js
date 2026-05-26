import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  await sql`
    CREATE TABLE IF NOT EXISTS dashboard_data (
      id TEXT PRIMARY KEY DEFAULT 'main',
      data JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  if (req.method === 'GET') {
    const rows = await sql`SELECT data FROM dashboard_data WHERE id = 'main'`;
    return res.json(rows[0]?.data || {});
  }

  if (req.method === 'POST') {
    const body = req.body;
    await sql`
      INSERT INTO dashboard_data (id, data)
      VALUES ('main', ${JSON.stringify(body)})
      ON CONFLICT (id)
      DO UPDATE SET data = ${JSON.stringify(body)}, updated_at = NOW()
    `;
    return res.json({ ok: true });
  }
}
