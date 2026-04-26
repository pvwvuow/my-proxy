export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).send('استفاده: ?url=https/example.com&apos;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    const data = await response.text();
    
    res.setHeader('Access-Control-Allow-Origin', '*&apos;
    res.status(200).send(data);
    
  } catch (error) {
    res.status(500).send('خطا: ' + error.message);
  }
}
