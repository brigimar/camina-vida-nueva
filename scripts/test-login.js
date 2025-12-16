(async () => {
  const url = 'http://localhost:3000/api/auth/login';
  const email = process.env.TEST_EMAIL || process.env.TEST_USER || 'test+agent@local.test';
  const password = process.env.TEST_PASSWORD || process.env.TEST_PASS || 'Test1234!';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
      redirect: 'manual',
    });

    console.log('STATUS', res.status);

    for (const [k, v] of res.headers.entries()) {
      console.log('HEADER', `${k}: ${v}`);
    }

    const ct = res.headers.get('content-type') || '';

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      console.log('REDIRECT LOCATION', location);

      // Collect Set-Cookie headers (may be multiple)
      const setCookie = res.headers.get('set-cookie');
      console.log('SET-COOKIE header:', setCookie);

      // If we have cookies, try to GET /dashboard with them
      if (setCookie) {
        // Extract only the cookie name=value pairs (drop attributes like Path, Expires)
        const cookiePairs = setCookie
          .split(/,\s*/)
          .map((c) => c.split(';')[0].trim())
          .filter(Boolean)
          .join('; ');

        const dash = await fetch('http://localhost:3000/dashboard', {
          method: 'GET',
          headers: { cookie: cookiePairs },
          redirect: 'manual',
        });

        console.log('DASHBOARD STATUS', dash.status);
        console.log('DASHBOARD LOCATION', dash.headers.get('location'));
        const body = await dash.text();
        console.log('DASHBOARD BODY LEN', body.length);
        if (dash.status >= 500) {
          const fs = await import('fs');
          fs.writeFileSync('./tmp_dashboard_error.html', body, 'utf8');
          console.log('Saved dashboard HTML to ./tmp_dashboard_error.html');
        }
      }

      process.exit(0);
    }

    if (!res.ok) {
      if (ct.includes('application/json')) {
        const json = await res.json();
        console.log('BODY JSON', JSON.stringify(json, null, 2));
      } else {
        const text = await res.text();
        console.log('BODY TEXT', text);
      }
      process.exit(0);
    }

    try {
      const json = await res.json();
      console.log('BODY JSON', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('BODY RAW', await res.text());
    }
  } catch (e) {
    console.error('REQUEST ERROR', e);
    process.exit(2);
  }
})();
