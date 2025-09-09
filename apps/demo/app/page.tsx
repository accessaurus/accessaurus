export default function Page() {
  return (
    <div className="wrapper">
      <div className="header"><div className="logo">Brand</div><div className="menu"><a href="#">Home</a><a href="#">About</a></div></div>
      <div className="hero"><div className="title">Hello World</div><div className="subtitle">Welcome to our div-soup page</div></div>
      <div className="content">
        <div className="section">
          <h2>Section One</h2>
          <p>Some content here.</p>
          <a className="btn">Learn more</a>
        </div>
        <div className="sidebar">Side notes...</div>
      </div>
      <div className="footer">© 2025 Demo</div>
    </div>
  )
}

