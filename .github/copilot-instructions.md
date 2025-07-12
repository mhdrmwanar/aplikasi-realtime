<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Aplikasi Realtime Feedback Survey

## Project Overview
This is a real-time feedback survey application built with:
- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Features**: Real-time feedback submission, live data visualization, anonymous feedback, sentiment analysis

## Architecture
- `server/server.js` - Backend server with Socket.IO for real-time communication
- `client/index.html` - Main feedback form for users
- `client/admin.html` - Admin dashboard with live analytics and visualizations

## Key Features
1. **Real-time Feedback Submission**: Users can submit ratings (1-5 stars) and comments
2. **Anonymous Mode**: Option to submit feedback anonymously
3. **Live Visualization**: Charts showing rating distribution and sentiment analysis
4. **Word Cloud**: Dynamic word cloud from feedback comments
5. **Sentiment Analysis**: Basic sentiment classification (positive, neutral, negative)
6. **Admin Dashboard**: Real-time monitoring of all feedback data

## Development Guidelines
- Use Socket.IO for all real-time communications
- Maintain responsive design for mobile compatibility
- Implement proper error handling and user feedback
- Use in-memory storage for demo (can be extended to database)
- Follow modern JavaScript practices and CSS best practices

## Socket.IO Events
- `submitFeedback` - Submit new feedback
- `feedbackUpdate` - Broadcast updated data to all clients
- `resetData` - Admin function to clear all data
- `feedbackSubmitted` - Confirmation of successful submission

## Styling
- Modern gradient design with smooth animations
- Responsive grid layouts
- Interactive elements with hover effects
- Color-coded sentiment indicators
- Mobile-first approach
