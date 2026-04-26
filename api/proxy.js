export default async function handler(req, res) {
  // فقط GET رو قبول کن
  if (req.method !== 'GET') {
    return res.status(405).send('فقط GET مجاز است');
  }

  const { url } = req.query;
  
  if (!url) {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Proxy</title>
      </head>
      <body>
        <h1>🌐 Proxy Service</h1>
        <p>استفاده: <code>?url=https://example.com</code></p>
        <form method="get">
          <input type="text" name="url" placeholder="https://example.com" style="width:300px">
          <button type="submit">برو</button>
        </form>
      </body>
      </html>
    `);
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const contentType = response.headers.get('content-type');
    const data = await response.text();
    
    res.setHeader('Content-Type', contentType || 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).send(data);
    
  } catch (error) {
    res.status(500).send(`
      <h1>خطا</h1>
      <p>${error.message}</p>
    `);
  }
}
