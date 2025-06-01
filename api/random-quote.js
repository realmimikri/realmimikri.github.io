export default async function handler(req, res) {
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  const zenRes = await fetch('https://zenquotes.io/api/quotes', {
    headers: {
      'X-Forwarded-For': clientIP,
    }
  });

  const data = await zenRes.json();
  res.status(200).json(data);
}