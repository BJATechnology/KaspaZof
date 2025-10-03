import { useState, useEffect } from 'react'
import axios from 'axios'
import PriceChart from './components/PriceChart'
import Dashboard from './components/Dashboard'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [health, setHealth] = useState(null)
  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch health status
  const fetchHealth = async () => {
    try {
      const response = await axios.get(`${API_URL}/health`)
      setHealth(response.data)
    } catch (err) {
      console.error('Health check failed:', err)
      setError('Unable to connect to backend')
    }
  }

  // Fetch prices
  const fetchPrices = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/prices`)
      setPrices(response.data)
      setError(null)
    } catch (err) {
      console.error('Price fetch failed:', err)
      setError('Unable to fetch prices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealth()
    fetchPrices()

    // Refresh prices every 60 seconds
    const interval = setInterval(() => {
      fetchHealth()
      fetchPrices()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>🔷 KaspaZof</h1>
        <p>Local Kaspa Monitor</p>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <Dashboard health={health} prices={prices} />
            {prices && <PriceChart prices={prices} />}
          </>
        )}
      </main>

      <footer className="footer">
        <p>⚠️ For local use only - Do not expose to internet</p>
      </footer>
    </div>
  )
}

export default App
