 (async () => {
  const fs = await import('fs');

  // Try process.env first, otherwise try to read .env.local
  let env = process.env;
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const dot = fs.readFileSync('./.env.local', 'utf8');
      dot.split(/\r?\n/).forEach((line) => {
        const m = line.match(/^\s*([A-Za-z0-9_]+)=(.*)$/);
        if (m) {
          const k = m[1];
          let v = m[2] || '';
          v = v.replace(/^\"|\"$/g, '');
          process.env[k] = v;
        }
      });
      env = process.env;
    } catch (e) {
      // ignore
    }
  }

  const projectUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:3000';
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const email = env.TEST_EMAIL || 'test+agent@local.test';
  const password = env.TEST_PASSWORD || 'Test1234!';

  if (!serviceKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is required in env or .env.local to create a test user.');
    process.exit(2);
  }

  // Normalize project URL to remove trailing slash
  const base = projectUrl.replace(/\/$/, '');
  const adminUrl = `${base.replace(/^https?:/, 'https:')}/auth/v1/admin/users`;

  try {
    const res = await fetch(adminUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
      body: JSON.stringify({ email, password, email_confirm: true }),
    });

    const text = await res.text();
    console.log('STATUS', res.status);
    console.log(text);
    if (res.status === 200 || res.status === 201) {
      console.log('User created:', email, password);
      process.exit(0);
    }
    process.exit(1);
  } catch (e) {
    console.error('ERROR', e);
    process.exit(2);
  }
})();
