const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Data storage (in-memory untuk demo)
let feedbackData = {
  responses: [],
  statistics: {
    total: 0,
    ratings: {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    },
    sentiments: {
      positive: 0,
      neutral: 0,
      negative: 0
    }
  },
  wordCloud: {}
};

// Fungsi untuk analisis sederhana sentiment
function analyzeSentiment(text) {
  const positiveWords = ['bagus', 'baik', 'hebat', 'luar biasa', 'excellent', 'good', 'great', 'amazing', 'awesome', 'fantastic', 'wonderful', 'perfect', 'love', 'like'];
  const negativeWords = ['buruk', 'jelek', 'tidak baik', 'bad', 'terrible', 'awful', 'hate', 'dislike', 'poor', 'worst', 'horrible'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

// Fungsi untuk update word cloud
function updateWordCloud(text) {
  // Filter kata-kata umum yang tidak penting
  const stopWords = ['dan', 'atau', 'yang', 'untuk', 'dari', 'dengan', 'pada', 'di', 'ke', 'ini', 'itu', 'adalah', 'the', 'and', 'or', 'of', 'to', 'in', 'a', 'an', 'is', 'are', 'was', 'were'];
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  words.forEach(word => {
    feedbackData.wordCloud[word] = (feedbackData.wordCloud[word] || 0) + 1;
  });
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/admin.html'));
});

app.get('/api/feedback', (req, res) => {
  res.json(feedbackData);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Kirim data terbaru ke client yang baru connect
  socket.emit('feedbackUpdate', feedbackData);
  
  // Handle feedback submission
  socket.on('submitFeedback', (data) => {
    try {
      const { rating, comment, anonymous } = data;
      
      // Validasi data
      if (!rating || rating < 1 || rating > 5) {
        socket.emit('error', 'Rating harus antara 1-5');
        return;
      }
      
      // Generate anonymous ID
      const feedbackId = Date.now() + Math.random().toString(36).substr(2, 9);
      
      // Buat feedback object
      const feedback = {
        id: feedbackId,
        rating: parseInt(rating),
        comment: comment || '',
        anonymous: anonymous || false,
        timestamp: new Date().toISOString(),
        sentiment: comment ? analyzeSentiment(comment) : 'neutral'
      };
      
      // Simpan feedback
      feedbackData.responses.push(feedback);
      
      // Update statistics
      feedbackData.statistics.total++;
      feedbackData.statistics.ratings[rating]++;
      feedbackData.statistics.sentiments[feedback.sentiment]++;
      
      // Update word cloud jika ada comment
      if (comment && comment.trim()) {
        updateWordCloud(comment);
      }
      
      // Broadcast update ke semua client
      io.emit('feedbackUpdate', feedbackData);
      
      // Konfirmasi ke pengirim
      socket.emit('feedbackSubmitted', { success: true, id: feedbackId });
      
      console.log('New feedback received:', feedback);
      
    } catch (error) {
      console.error('Error processing feedback:', error);
      socket.emit('error', 'Terjadi kesalahan dalam memproses feedback');
    }
  });
  
  // Handle request untuk reset data (admin only)
  socket.on('resetData', () => {
    feedbackData = {
      responses: [],
      statistics: {
        total: 0,
        ratings: {
          1: 0, 2: 0, 3: 0, 4: 0, 5: 0
        },
        sentiments: {
          positive: 0,
          neutral: 0,
          negative: 0
        }
      },
      wordCloud: {}
    };
    
    io.emit('feedbackUpdate', feedbackData);
    console.log('Data has been reset');
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Feedback Form: http://localhost:${PORT}`);
  console.log(`Admin Dashboard: http://localhost:${PORT}/admin`);
});
