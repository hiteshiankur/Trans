# Geo Event Flow - Complete Integration Guide

## Overview

This guide covers the complete integration between the React frontend and Node.js backend for the Geo Event Flow application.

## Architecture

```
Frontend (React + TypeScript)     Backend (Node.js + Express)     Database (MongoDB)
├── src/lib/api.ts               ├── server.js                   ├── Users Collection
├── src/contexts/AuthContext.tsx ├── routes/                     ├── Events Collection
├── src/pages/                   │   ├── auth.js                 ├── Attendance Collection
├── src/components/              │   ├── employees.js            ├── Contracts Collection
└── .env                         │   ├── events.js               └── Invitations Collection
                                 │   ├── invitations.js
                                 │   ├── attendance.js
                                 │   ├── contracts.js
                                 │   └── reports.js
                                 ├── models/
                                 ├── middleware/
                                 ├── utils/
                                 └── .env
```

## Setup Instructions

### 1. Backend Setup

1. **Start MongoDB:**
```bash
docker run -d --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo
```

2. **Install Backend Dependencies:**
```bash
cd backend
npm install
```

3. **Configure Environment Variables:**
Update `backend/.env`:
```env
MONGODB_URI=mongodb://admin:admin123@localhost:27017/geo-event-flow?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

4. **Start Backend Server:**
```bash
npm run dev
```
Server will start on `http://localhost:5000`

### 2. Frontend Setup

1. **Install Frontend Dependencies:**
```bash
cd ../
npm install
```

2. **Configure Environment Variables:**
Create `.env` in root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

3. **Start Frontend Development Server:**
```bash
npm run dev
```
Frontend will start on `http://localhost:5173`

## API Integration Details

### Authentication Flow

1. **Registration:**
   - User fills registration form
   - Frontend calls `authApi.register()`
   - Backend creates user and sends OTP email
   - User verifies OTP via `authApi.verifyOtp()`
   - JWT token stored in localStorage

2. **Login:**
   - User can login with email/password or email/OTP
   - Frontend calls `authApi.login()`
   - JWT token stored and user context updated

3. **Protected Routes:**
   - All API calls include JWT token in Authorization header
   - Backend middleware validates token
   - User context maintained across app

### Key Features Integration

#### 1. Employee Management
- **Frontend:** `src/pages/Employees.tsx`
- **Backend:** `routes/employees.js`
- **Features:**
  - CRUD operations for employees
  - Role-based access control
  - Profile image upload
  - Employee statistics

#### 2. Event Management
- **Frontend:** `src/pages/Events.tsx`, `src/pages/CreateEvent.tsx`
- **Backend:** `routes/events.js`
- **Features:**
  - Create/edit/delete events
  - Location-based events with GPS coordinates
  - Invitation management
  - Event status tracking

#### 3. Invitation System
- **Frontend:** `src/pages/Invitations.tsx`
- **Backend:** `routes/invitations.js`
- **Features:**
  - Send invitations to employees
  - Accept/decline invitations
  - Email notifications
  - Invitation statistics

#### 4. Attendance Tracking
- **Frontend:** Integrated in event details pages
- **Backend:** `routes/attendance.js`
- **Features:**
  - GPS-based punch in/out
  - Location validation
  - Attendance reports
  - Real-time tracking

#### 5. Contract Management
- **Frontend:** `src/pages/Contracts.tsx`
- **Backend:** `routes/contracts.js`
- **Features:**
  - Upload contract files
  - Digital signatures
  - Contract download
  - Version control

#### 6. Reports
- **Frontend:** Integrated in admin panels
- **Backend:** `routes/reports.js`
- **Features:**
  - DOCX report generation
  - Event summaries
  - Attendance analytics
  - Export functionality

## API Service Layer

The `src/lib/api.ts` file provides a comprehensive service layer:

```typescript
// Example usage in components
import { eventsApi, attendanceApi } from '@/lib/api';

// Create event
const eventData = await eventsApi.create({
  title: 'Team Meeting',
  description: 'Weekly team sync',
  startDate: '2024-01-15T10:00:00Z',
  endDate: '2024-01-15T11:00:00Z',
  location: {
    address: '123 Main St',
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    radius: 100
  }
});

// Punch in to event
const location = await getCurrentLocation();
const attendance = await attendanceApi.punchIn(eventId, {
  coordinates: location
});
```

## Error Handling

### Frontend Error Handling
```typescript
try {
  const result = await authApi.login(email, password);
  // Handle success
} catch (error) {
  if (error instanceof ApiError) {
    // Handle specific API errors
    setError(error.message);
  } else {
    // Handle network errors
    setError('Network error occurred');
  }
}
```

### Backend Error Responses
```json
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

## Security Implementation

### JWT Authentication
- Tokens stored in localStorage
- Automatic token refresh
- Secure HTTP-only cookies (optional)
- Token expiration handling

### Role-Based Access Control
```typescript
// Frontend route protection
<ProtectedRoute requiredRoles={['admin']}>
  <AdminPanel />
</ProtectedRoute>

// Backend middleware
router.get('/admin-only', authenticateToken, requireAdmin, handler);
```

### File Upload Security
- File type validation
- Size limits
- Secure file storage
- Virus scanning (recommended for production)

## Real-time Features

### Location Tracking
```typescript
// Get user location
const location = await getCurrentLocation();

// Validate location for event
const validation = await attendanceApi.punchIn(eventId, {
  coordinates: location
});

if (!validation.locationValidation.isValid) {
  alert(`You are ${validation.locationValidation.distance}m away from the event location`);
}
```

### Email Notifications
- OTP verification emails
- Event invitation emails
- Reminder notifications
- SMTP configuration required

## Testing

### Backend API Testing
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Frontend Testing
- Component testing with React Testing Library
- API integration testing
- E2E testing with Cypress (recommended)

## Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use production MongoDB instance
3. Configure HTTPS
4. Set up file storage (AWS S3)
5. Configure email service
6. Set up monitoring and logging

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to CDN or static hosting
3. Configure environment variables
4. Set up HTTPS
5. Configure domain and CORS

## Monitoring and Analytics

### Backend Monitoring
- API response times
- Error rates
- Database performance
- File upload metrics

### Frontend Monitoring
- User interactions
- API call success rates
- Performance metrics
- Error tracking

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed:**
   - Check MongoDB is running
   - Verify connection string
   - Check authentication credentials

2. **CORS Errors:**
   - Verify FRONTEND_URL in backend .env
   - Check CORS configuration in server.js

3. **JWT Token Errors:**
   - Check JWT_SECRET configuration
   - Verify token expiration settings
   - Clear localStorage and re-login

4. **File Upload Errors:**
   - Check file size limits
   - Verify upload directory permissions
   - Check file type restrictions

5. **Email Not Sending:**
   - Verify SMTP configuration
   - Check email credentials
   - Test with different email provider

## Performance Optimization

### Backend Optimization
- Database indexing
- Query optimization
- Caching strategies
- File compression
- Rate limiting

### Frontend Optimization
- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization
- Caching strategies

## Next Steps

1. **Enhanced Security:**
   - Implement refresh tokens
   - Add 2FA authentication
   - Security headers
   - Input sanitization

2. **Advanced Features:**
   - Real-time notifications
   - WebSocket integration
   - Advanced reporting
   - Mobile app support

3. **Scalability:**
   - Microservices architecture
   - Load balancing
   - Database sharding
   - CDN integration

This integration provides a complete, production-ready foundation for the Geo Event Flow application with robust authentication, real-time location tracking, and comprehensive event management capabilities.
