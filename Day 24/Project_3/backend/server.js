/**
 * Stock Market Dashboard - Backend Server
 * Day 24/Project_3 - Coding Challenge 2
 * 
 * Features:
 * - Express server with WebSocket (Socket.io)
 * - Real-time stock price updates
 * - Simulated stock data with market trends
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// CORS configuration
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ==================== Stock Data Store ====================

// Initial stock data
const stocks = {
    'AAPL': { 
        symbol: 'AAPL', 
        name: 'Apple Inc.',
        price: 178.72, 
        change: 2.34, 
        changePercent: 1.33,
        volume: 54230000,
        high: 180.50,
        low: 176.80,
        open: 177.00
    },
    'GOOGL': { 
        symbol: 'GOOGL', 
        name: 'Alphabet Inc.',
        price: 141.80, 
        change: -0.45, 
        changePercent: -0.32,
        volume: 23410000,
        high: 143.20,
        low: 140.50,
        open: 142.00
    },
    'MSFT': { 
        symbol: 'MSFT', 
        name: 'Microsoft Corp.',
        price: 378.91, 
        change: 4.56, 
        changePercent: 1.22,
        volume: 31240000,
        high: 380.00,
        low: 375.20,
        open: 376.00
    },
    'AMZN': { 
        symbol: 'AMZN', 
        name: 'Amazon.com Inc.',
        price: 178.25, 
        change: 1.89, 
        changePercent: 1.07,
        volume: 45670000,
        high: 179.50,
        low: 176.00,
        open: 177.00
    },
    'TSLA': { 
        symbol: 'TSLA', 
        name: 'Tesla Inc.',
        price: 248.48, 
        change: -5.23, 
        changePercent: -2.06,
        volume: 98760000,
        high: 255.00,
        low: 245.30,
        open: 252.00
    },
    'META': { 
        symbol: 'META', 
        name: 'Meta Platforms Inc.',
        price: 505.95, 
        change: 8.34, 
        changePercent: 1.68,
        volume: 18230000,
        high: 508.00,
        low: 498.50,
        open: 500.00
    },
    'NVDA': { 
        symbol: 'NVDA', 
        name: 'NVIDIA Corp.',
        price: 875.28, 
        change: 15.67, 
        changePercent: 1.82,
        volume: 52340000,
        high: 880.00,
        low: 860.50,
        open: 865.00
    },
    'JPM': { 
        symbol: 'JPM', 
        name: 'JPMorgan Chase & Co.',
        price: 198.45, 
        change: 1.23, 
        changePercent: 0.62,
        volume: 12340000,
        high: 199.50,
        low: 196.80,
        open: 197.00
    }
};

// Stock price history for charts (bonus)
const priceHistory = {};

// Initialize price history
Object.keys(stocks).forEach(symbol => {
    priceHistory[symbol] = [];
    const basePrice = stocks[symbol].price;
    // Generate 30 days of history
    for (let i = 30; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * basePrice * 0.1;
        priceHistory[symbol].push({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            price: basePrice + variation + (30 - i) * 0.5
        });
    }
});

// Connected clients
const connectedClients = new Set();

// ==================== Helper Functions ====================

function generateRandomPriceChange(basePrice) {
    const maxChange = basePrice * 0.02; // Max 2% change
    const change = (Math.random() - 0.5) * 2 * maxChange;
    return change;
}

function updateStockPrice(symbol) {
    const stock = stocks[symbol];
    if (!stock) return null;
    
    const priceChange = generateRandomPriceChange(stock.price);
    const newPrice = Math.max(1, stock.price + priceChange);
    const change = newPrice - (stock.price - stock.change);
    const changePercent = (change / (newPrice - change)) * 100;
    
    stocks[symbol] = {
        ...stock,
        price: parseFloat(newPrice.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        high: Math.max(stock.high, newPrice),
        low: Math.min(stock.low, newPrice),
        updatedAt: new Date().toISOString()
    };
    
    // Update history
    priceHistory[symbol].push({
        date: new Date().toISOString(),
        price: stocks[symbol].price
    });
    // Keep last 100 entries
    if (priceHistory[symbol].length > 100) {
        priceHistory[symbol].shift();
    }
    
    return stocks[symbol];
}

function getMarketSummary() {
    const symbols = Object.keys(stocks);
    const gainers = [];
    const losers = [];
    let totalVolume = 0;
    
    symbols.forEach(symbol => {
        const stock = stocks[symbol];
        totalVolume += stock.volume;
        if (stock.changePercent > 0) {
            gainers.push(stock);
        } else {
            losers.push(stock);
        }
    });
    
    gainers.sort((a, b) => b.changePercent - a.changePercent);
    losers.sort((a, b) => a.changePercent - b.changePercent);
    
    return {
        totalStocks: symbols.length,
        gainersCount: gainers.length,
        losersCount: losers.length,
        topGainers: gainers.slice(0, 3),
        topLosers: losers.slice(0, 3),
        totalVolume,
        marketStatus: 'open' // Simulated
    };
}

// ==================== REST API Endpoints ====================

// Get all stocks
app.get('/api/stocks', (req, res) => {
    const stockList = Object.values(stocks);
    res.json(stockList);
});

// Get single stock
app.get('/api/stocks/:symbol', (req, res) => {
    const stock = stocks[req.params.symbol.toUpperCase()];
    if (stock) {
        res.json(stock);
    } else {
        res.status(404).json({ error: 'Stock not found' });
    }
});

// Get market summary
app.get('/api/market', (req, res) => {
    res.json(getMarketSummary());
});

// Get price history for chart
app.get('/api/history/:symbol', (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    if (priceHistory[symbol]) {
        res.json(priceHistory[symbol]);
    } else {
        res.status(404).json({ error: 'Stock not found' });
    }
});

// ==================== Socket.io Events ====================

io.on('connection', (socket) => {
    console.log(`[Server] Client connected: ${socket.id}`);
    connectedClients.add(socket.id);
    
    // Send initial data
    socket.emit('initialData', {
        stocks: Object.values(stocks),
        marketSummary: getMarketSummary()
    });
    
    // Handle stock subscription
    socket.on('subscribe', (symbols) => {
        symbols.forEach(symbol => {
            socket.join(`stock:${symbol}`);
        });
        console.log(`[Server] Client ${socket.id} subscribed to: ${symbols.join(', ')}`);
    });
    
    // Handle stock unsubscription
    socket.on('unsubscribe', (symbols) => {
        symbols.forEach(symbol => {
            socket.leave(`stock:${symbol}`);
        });
    });
    
    // Handle manual price refresh request
    socket.on('refreshStock', (symbol) => {
        const updatedStock = updateStockPrice(symbol);
        if (updatedStock) {
            io.emit('stockUpdate', updatedStock);
        }
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
        connectedClients.delete(socket.id);
        console.log(`[Server] Client disconnected: ${socket.id}`);
    });
});

// ==================== Simulate Real-Time Updates ====================

// Update stock prices every 2 seconds
setInterval(() => {
    const symbols = Object.keys(stocks);
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const updatedStock = updateStockPrice(randomSymbol);
    
    if (updatedStock) {
        // Broadcast to all clients
        io.emit('stockUpdate', updatedStock);
        
        // Send market summary update every 5 updates
        const updateCount = Date.now() % 10;
        if (updateCount === 0) {
            io.emit('marketUpdate', getMarketSummary());
        }
    }
}, 2000);

// Serve frontend for any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// ==================== Start Server ====================
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log('════════════════════════════════════════════════════════');
    console.log('📈 Stock Market Dashboard Server');
    console.log('════════════════════════════════════════════════════════');
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log(`🔌 WebSocket server ready for real-time updates`);
    console.log(`📊 Stocks tracked: ${Object.keys(stocks).join(', ')}`);
    console.log(`📡 Update interval: 2 seconds`);
    console.log('════════════════════════════════════════════════════════');
});

