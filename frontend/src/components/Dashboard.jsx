import './Dashboard.css'

function Dashboard({ health, prices }) {
  const formatPrice = (value) => {
    if (value === undefined || value === null) return 'N/A'
    return typeof value === 'number' ? value.toFixed(6) : value
  }

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Health Status Card */}
        <div className="card">
          <h3>System Status</h3>
          <div className="status-items">
            <div className="status-item">
              <span className="label">Backend:</span>
              <span className={`status ${health?.status === 'healthy' ? 'healthy' : 'error'}`}>
                {health?.status === 'healthy' ? '✓ Healthy' : '✗ Error'}
              </span>
            </div>
            <div className="status-item">
              <span className="label">Kaspad:</span>
              <span className={`status ${health?.kaspad_connected ? 'healthy' : 'warning'}`}>
                {health?.kaspad_connected ? '✓ Connected' : '⚠ Disconnected'}
              </span>
            </div>
            <div className="status-item">
              <span className="label">Wallet:</span>
              <span className={`status ${health?.wallet_initialized ? 'healthy' : 'warning'}`}>
                {health?.wallet_initialized ? '✓ Initialized' : '⚠ Not Initialized'}
              </span>
            </div>
          </div>
        </div>

        {/* Price Cards */}
        <div className="card price-card">
          <h3>💵 KAS / USD</h3>
          <div className="price-value">
            ${formatPrice(prices?.kaspa?.usd)}
          </div>
        </div>

        <div className="card price-card">
          <h3>💶 KAS / EUR</h3>
          <div className="price-value">
            €{formatPrice(prices?.kaspa?.eur)}
          </div>
        </div>

        <div className="card price-card">
          <h3>₿ KAS / BTC</h3>
          <div className="price-value">
            {formatPrice(prices?.kaspa?.btc)} BTC
          </div>
        </div>
      </div>

      {prices?.last_updated && (
        <div className="last-updated">
          Last updated: {new Date(prices.last_updated).toLocaleString()}
        </div>
      )}
    </div>
  )
}

export default Dashboard
