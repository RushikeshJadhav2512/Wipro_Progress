import React, { Component, createContext, useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import './index.css';

// ============================================
// Context for Global Stock State (Bonus)
// ============================================
export const StockContext = createContext();

export class StockProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      marketSummary: null,
      isConnected: false,
      selectedStock: null,
      theme: 'light'
    };
    this.socket = null;
  }

  // componentDidMount - Initialize WebSocket connection
  componentDidMount() {
    console.log('[StockDashboard] Component mounted - initializing WebSocket...');
    this.connectToServer();
  }

  // componentWillUnmount - Cleanup WebSocket
  componentWillUnmount() {
    if (this.socket) {
      console.log('[StockDashboard] Cleaning up WebSocket connection...');
      this.socket.disconnect();
    }
  }

  connectToServer = () => {
    this.socket = io('http://localhost:5001', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('[WebSocket] Connected to server');
      this.setState({ isConnected: true });
    });

    this.socket.on('disconnect', () => {
      console.log('[WebSocket] Disconnected from server');
      this.setState({ isConnected: false });
    });

    // Initial data received
    this.socket.on('initialData', (data) => {
      console.log('[WebSocket] Received initial data:', data.stocks.length, 'stocks');
      this.setState({
        stocks: data.stocks,
        marketSummary: data.marketSummary
      });
    });

    // Real-time stock updates
    this.socket.on('stockUpdate', (stock) => {
      console.log(`[WebSocket] ${stock.symbol} updated: $${stock.price}`);
      this.setState(prevState => ({
        stocks: prevState.stocks.map(s => 
          s.symbol === stock.symbol ? { ...s, ...stock } : s
        )
      }));
    });

    // Market summary updates
    this.socket.on('marketUpdate', (summary) => {
      this.setState({ marketSummary: summary });
    });
  };

  // Select a stock for detail view
  selectStock = (stock) => {
    this.setState({ selectedStock: stock });
    if (stock) {
      this.socket?.emit('subscribe', [stock.symbol]);
    }
  };

  // Toggle theme (Bonus)
  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  };

  // Refresh stock data manually
  refreshStock = (symbol) => {
    this.socket?.emit('refreshStock', symbol);
  };

  render() {
    const { children } = this.props;
    const value = {
      ...this.state,
      selectStock: this.selectStock,
      toggleTheme: this.toggleTheme,
      refreshStock: this.refreshStock,
      socket: this.socket
    };

    return (
      <StockContext.Provider value={value}>
        <div className={this.state.theme === 'dark' ? 'dark-theme' : ''}>
          {children}
        </div>
      </StockContext.Provider>
    );
  }
}

// ============================================
// Main App Component
// ============================================
function App() {
  return (
    <StockProvider>
      <StockDashboard />
    </StockProvider>
  );
}

// ============================================
// Stock Dashboard Component
// ============================================
class StockDashboard extends Component {
  static contextType = StockContext;

  constructor(props) {
    super(props);
    this.state = {
      // Controlled component state
      searchSymbol: '',
      // Uncontrolled component ref for search history
      searchHistoryRef: React.createRef(),
      showHistory: false
    };
    
    // Store search history in localStorage (uncontrolled)
    this.searchHistory = JSON.parse(localStorage.getItem('stockSearchHistory') || '[]');
  }

  // componentDidMount - Fetch initial data (already handled by context)
  componentDidMount() {
    console.log('[StockDashboard] Dashboard mounted');
  }

  // componentDidUpdate - React to state changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchSymbol !== this.state.searchSymbol) {
      console.log(`[StockDashboard] Search symbol changed: ${this.state.searchSymbol}`);
    }
  }

  // Controlled component handler
  handleSearchChange = (e) => {
    const value = e.target.value.toUpperCase();
    this.setState({ searchSymbol: value });
  };

  // Handle form submission
  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchSymbol.trim()) {
      this.addToHistory(this.state.searchSymbol);
      const { stocks, selectStock } = this.context;
      const stock = stocks.find(s => s.symbol === this.state.searchSymbol);
      if (stock) {
        selectStock(stock);
      } else {
        alert(`Stock ${this.state.searchSymbol} not found. Available: AAPL, GOOGL, MSFT, AMZN, TSLA, META, NVDA, JPM`);
      }
    }
  };

  // Add to uncontrolled search history
  addToHistory = (symbol) => {
    if (!this.searchHistory.includes(symbol)) {
      this.searchHistory = [symbol, ...this.searchHistory].slice(0, 10);
      localStorage.setItem('stockSearchHistory', JSON.stringify(this.searchHistory));
    }
  };

  // Handle clicking a history item
  handleHistoryClick = (symbol) => {
    this.setState({ searchSymbol: symbol, showHistory: false });
    const { stocks, selectStock } = this.context;
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      selectStock(stock);
    }
  };

  // Clear search history
  clearHistory = () => {
    this.searchHistory = [];
    localStorage.setItem('stockSearchHistory', '[]');
    this.forceUpdate();
  };

  render() {
    const { stocks, marketSummary, isConnected, selectedStock, theme, toggleTheme } = this.context;
    const { searchSymbol, showHistory } = this.state;

    return (
      <div className="container-fluid py-4">
        {/* Header */}
        <header className="mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="h3 mb-1">📈 Stock Market Dashboard</h1>
              <p className="text-muted mb-0">
                Real-time stock prices with WebSocket updates
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className={`badge ${isConnected ? 'bg-success' : 'bg-danger'}`}>
                {isConnected ? '🟢 Live' : '🔴 Disconnected'}
              </span>
              <button 
                className="btn btn-outline-secondary"
                onClick={toggleTheme}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>
        </header>

        {/* Search Section - Controlled Component */}
        <section className="mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">🔍 Search Stock</h5>
              <form onSubmit={this.handleSearchSubmit} className="position-relative">
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter stock symbol (e.g., AAPL, GOOGL, MSFT)"
                    value={searchSymbol}
                    onChange={this.handleSearchChange}
                    onFocus={() => this.setState({ showHistory: true })}
                    onBlur={() => setTimeout(() => this.setState({ showHistory: false }), 200)}
                  />
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
                
                {/* Uncontrolled Component - Search History Dropdown */}
                {showHistory && this.searchHistory.length > 0 && (
                  <div 
                    className="search-history position-absolute w-100 mt-1 bg-white border rounded shadow-sm"
                    style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
                  >
                    <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                      <small className="text-muted">Recent Searches</small>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={this.clearHistory}
                      >
                        Clear
                      </button>
                    </div>
                    {this.searchHistory.map((symbol, index) => (
                      <div 
                        key={index}
                        className="search-history-item p-2"
                        onClick={() => this.handleHistoryClick(symbol)}
                      >
                        <span>{symbol}</span>
                        <small className="text-muted">Click to view</small>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Market Summary */}
        {marketSummary && (
          <section className="mb-4">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="card text-center hover-card">
                  <div className="card-body">
                    <h6 className="text-muted">Total Stocks</h6>
                    <h4 className="mb-0">{marketSummary.totalStocks}</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center hover-card border-success">
                  <div className="card-body">
                    <h6 className="text-success">Gainers</h6>
                    <h4 className="mb-0 text-success">{marketSummary.gainersCount}</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center hover-card border-danger">
                  <div className="card-body">
                    <h6 className="text-danger">Losers</h6>
                    <h4 className="mb-0 text-danger">{marketSummary.losersCount}</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center hover-card">
                  <div className="card-body">
                    <h6 className="text-muted">Total Volume</h6>
                    <h4 className="mb-0">{(marketSummary.totalVolume / 1000000).toFixed(1)}M</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Top Gainers & Losers */}
        {marketSummary && (
          <section className="mb-4">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header bg-success text-white">
                    <h6 className="mb-0">🚀 Top Gainers</h6>
                  </div>
                  <div className="card-body">
                    {marketSummary.topGainers.map((stock, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <div>
                          <strong>{stock.symbol}</strong>
                          <small className="text-muted d-block">{stock.name}</small>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">${stock.price}</div>
                          <small className="text-success">+{stock.changePercent.toFixed(2)}%</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header bg-danger text-white">
                    <h6 className="mb-0">📉 Top Losers</h6>
                  </div>
                  <div className="card-body">
                    {marketSummary.topLosers.map((stock, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <div>
                          <strong>{stock.symbol}</strong>
                          <small className="text-muted d-block">{stock.name}</small>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">${stock.price}</div>
                          <small className="text-danger">{stock.changePercent.toFixed(2)}%</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Selected Stock Detail */}
        {selectedStock && (
          <section className="mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  {selectedStock.symbol} - {selectedStock.name}
                </h5>
                <span className={`badge ${selectedStock.change >= 0 ? 'bg-success' : 'bg-danger'}`}>
                  {selectedStock.change >= 0 ? '▲ Up' : '▼ Down'} {Math.abs(selectedStock.changePercent).toFixed(2)}%
                </span>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-3">
                    <div className="text-center">
                      <h2 className={`display-4 fw-bold ${selectedStock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                        ${selectedStock.price.toFixed(2)}
                      </h2>
                      <p className="text-muted">Current Price</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <h4 className="fw-bold">{selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)}</h4>
                      <p className="text-muted">Change</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <h4 className="fw-bold">${selectedStock.high.toFixed(2)}</h4>
                      <p className="text-muted">Day High</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <h4 className="fw-bold">${selectedStock.low.toFixed(2)}</h4>
                      <p className="text-muted">Day Low</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Stocks Table */}
        <section>
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">📊 All Stocks</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Symbol</th>
                      <th>Name</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Change</th>
                      <th className="text-end">% Change</th>
                      <th className="text-end hide-mobile">Volume</th>
                      <th className="text-end hide-mobile">Open</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => (
                      <tr 
                        key={stock.symbol}
                        onClick={() => this.context.selectStock(stock)}
                        className={selectedStock?.symbol === stock.symbol ? 'table-primary' : ''}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <strong>{stock.symbol}</strong>
                        </td>
                        <td className="text-muted">{stock.name}</td>
                        <td className="text-end fw-bold">
                          ${stock.price.toFixed(2)}
                        </td>
                        <td className={`text-end ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                        </td>
                        <td className="text-end">
                          <span className={`badge ${stock.changePercent >= 0 ? 'bg-success' : 'bg-danger'}`}>
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </span>
                        </td>
                        <td className="text-end hide-mobile">
                          {(stock.volume / 1000000).toFixed(1)}M
                        </td>
                        <td className="text-end hide-mobile">
                          ${stock.open.toFixed(2)}
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              this.context.selectStock(stock);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-4 text-center text-muted">
          <p className="mb-0">
            Stock Market Dashboard | Built with React & WebSocket
          </p>
          <small>
            Prices are simulated for demonstration purposes
          </small>
        </footer>
      </div>
    );
  }
}

export default App;

