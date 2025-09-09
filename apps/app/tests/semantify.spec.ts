import { test, expect } from '@playwright/test'

const demoHtml = `<div class="wrapper"><div class="header"><div class="logo">Brand</div><div class="menu"><a href="#">Home</a><a href="#">About</a></div></div><div class="hero"><div class="title">Hello World</div><div class="subtitle">Welcome to our div-soup page</div></div><div class="content"><div class="section"><h2>Section One</h2><p>Some content here.</p><a class="btn">Learn more</a></div><div class="sidebar">Side notes...</div></div><div class="footer">© 2025 Demo</div></div>`

test.describe('semantify API', () => {
  test('upgrades div-soup to semantic tags', async ({ request }) => {
    const res = await request.post('/api/semantify', {
      data: { html: demoHtml },
      headers: { 'content-type': 'application/json' },
    })
    expect(res.ok()).toBeTruthy()
    const json = await res.json()
    const out: string = json.html
    expect(out).toContain('<header')
    expect(out).toContain('<nav')
    expect(out).toContain('<main')
    expect(out).toContain('<section')
    expect(out).toContain('<aside')
    expect(out).toContain('<footer')
    expect(out).toContain('<button')
  })
})
