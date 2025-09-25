# BallisticsID

BallisticsID is an advanced forensic technology platform that streamlines the analysis and identification of ballistic evidence. It uses cutting-edge automated algorithms to analyze high-resolution images of bullets and cartridge cases to accurately match them with unique firearm markings. This system aids law enforcement and forensic experts in linking firearms to criminal cases quickly and accurately.

---

## Features

- Automated analysis for rapid ballistic evidence evaluation
- Comprehensive and secure database for storing ballistic images and metadata
- High-accuracy pattern matching algorithms
- User authentication with secure signup and login
- Easy upload and management of ballistic evidence
- Integration with law enforcement databases supported
- Interactive user interface with sections such as Features, Process, Testimonials, FAQ

---

## Technologies

- **Frontend:** React.js, Framer Motion, Tailwind CSS, React Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, GridFS, Multer, JWT, bcryptjs
- **Deployment:** Vercel

---

## Installation

Clone the repository:

git clone https://github.com/DebosmitaPal/Ballistic-Project.git
cd Ballistic-Project

Install backend dependencies:

cd backend
npm install

Create `.env` file in backend with:

MONGODBURI=<your-mongodb-uri>
BACKENDURL=http://localhost:5173
PORT=5000

Start backend server:

Install frontend dependencies and start frontend:

cd ../frontend
npm install
npm run dev

---
## Usage

- Access the frontend app at `http://localhost:5173`
- Signup or login to your account
- Upload high-resolution ballistic evidence images for analysis
- Navigate through informative sections like Features, Process, and FAQs
- View and manage your analysis and uploaded cases

---

## API Endpoints

- `POST /api/signup` - Register a new user
- `POST /api/login` - User login
- `POST /api/upload` - Upload ballistic evidence images
- `GET /api/images` - Get metadata of uploaded images
- `GET /api/image/:filename` - Retrieve image by filename

---

## Project Structure
```
├── backend
│   ├── server.js
│   ├── models
│   │   ├── user.js
│   │   ├── image.js
│   └── ...
│
├── frontend
│   ├── components
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Process.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   ├── Navbar.jsx
│   │   ├── LoginModal.jsx
│   │   ├── Analyze.jsx
│   │   ├── Counting.jsx
│   │   ├── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.html
│   ├── index.css
│
└── package.json

```



---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## Contact

For support or questions, contact: support@ballisticsid.com

