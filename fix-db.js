const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://leads_tracker_user:Ur1lAfhoqnEW9j6LzE0jZPCiDkUxuQzq@dpg-d7guudsp3tds73a6pelg-a.frankfurt-postgres.render.com/leads_tracker?sslmode=require",
});

async function fix() {
  try {
    await client.connect();
    console.log('Connected to Render DB');

    await client.query('DROP TYPE IF EXISTS "LeadStatus" CASCADE;');
    await client.query(`CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'WON', 'LOST');`);
    
    console.log('✅ LeadStatus Enum created successfully!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

fix();