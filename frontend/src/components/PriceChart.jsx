import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './PriceChart.css'

function PriceChart({ prices }) {
  const [historicalData, setHistoricalData] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('usd')

  useEffect(() => {
    if (prices?.kaspa) {
      // Add new data point to historical data
      const timestamp = new Date().toLocaleTimeString()
      const newDataPoint = {
        time: timestamp,
        usd: prices.kaspa.usd || 0,
        eur: prices.kaspa.eur || 0,
        btc: (prices.kaspa.btc || 0) * 100000 // Scale BTC for visibility
      }

      setHistoricalData(prev => {
        const updated = [...prev, newDataPoint]
        // Keep only last 30 data points
        return updated.slice(-30)
      })
    }
  }, [prices])

  const getCurrencyLabel = () => {
    switch (selectedCurrency) {
      case 'usd': return 'USD'
      case 'eur': return 'EUR'
      case 'btc': return 'BTC (×100k)'
      default: return 'USD'
    }
  }

  return (
    <div className="price-chart-container">
      <div className="chart-header">
        <h2>📈 Kaspa Price History</h2>
        <div className="currency-selector">
          <button 
            className={selectedCurrency === 'usd' ? 'active' : ''}
            onClick={() => setSelectedCurrency('usd')}
          >
            USD
          </button>
          <button 
            className={selectedCurrency === 'eur' ? 'active' : ''}
            onClick={() => setSelectedCurrency('eur')}
          >
            EUR
          </button>
          <button 
            className={selectedCurrency === 'btc' ? 'active' : ''}
            onClick={() => setSelectedCurrency('btc')}
          >
            BTC
          </button>
        </div>
      </div>

      {historicalData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
              label={{ 
                value: getCurrencyLabel(), 
                angle: -90, 
                position: 'insideLeft',
                fill: 'rgba(255,255,255,0.7)'
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={selectedCurrency} 
              stroke="#60a5fa" 
              strokeWidth={2}
              dot={{ fill: '#60a5fa', r: 3 }}
              activeDot={{ r: 5 }}
              name={`KAS/${getCurrencyLabel()}`}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="chart-placeholder">
          <p>Collecting price data... Chart will appear after first update.</p>
        </div>
      )}
    </div>
  )
}

export default PriceChart
