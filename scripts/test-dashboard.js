(async () => {
  try {
    const res = await fetch('http://localhost:3000/dashboard', {
      method: 'GET',
      headers: { cookie: 'sb=true' },
      redirect: 'manual',
    });

    console.log('STATUS', res.status);
    console.log('LOCATION', res.headers.get('location'));
    const text = await res.text();
    console.log('LEN', text.length);
  } catch (e) {
    console.error('ERR', e);
    process.exit(2);
  }
})();
