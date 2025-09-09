const server = Bun.serve({
  port: 3200,
  fetch(req) {
    const url = new URL(req.url)
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(Bun.file('index.html'), {
        headers: { 'content-type': 'text/html; charset=utf-8' },
      })
    }
    return new Response('Not Found', { status: 404 })
  },
})

console.log(`Demo listening on http://localhost:${server.port}`)
