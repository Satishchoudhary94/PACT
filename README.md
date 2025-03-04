# PACT - Placement and Career Training Platform

A comprehensive platform for students to access job opportunities, internship details, and career resources.

## Features

- Job and Internship Listings
- Resume Builder
- Interview Experiences
- Events Calendar
- Admin Dashboard
- User Profiles

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- UI Framework: Material-UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pact.git
cd pact
```

2. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

3. Install Backend Dependencies:
```bash
cd ../backend
npm install
```

4. Create .env files:

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pact
JWT_SECRET=your_jwt_secret_key_here
```

5. Start the Development Servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 