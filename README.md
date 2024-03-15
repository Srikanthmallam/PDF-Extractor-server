# PDF Extractor

PDF Extractor is a web application that allows users to upload PDF files, extract specific pages from them, and save the extracted pages as separate PDF files. The application provides integration with Cloudinary for storing and managing uploaded PDF files.

checkout live website [https://pdf-extractor-client-three.vercel.app/]

this is the backend repository checkout frontend repository-[https://github.com/Srikanthmallam/PDF-Extractor-client]

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features


- **PDF Upload**: Users can upload PDF files to the application.
- **Page Extraction**: Users can select specific pages from an uploaded PDF and extract them as separate PDF files. 
- **Cloudinary Integration**: Integration with Cloudinary for storing and managing uploaded PDF files.
- **User Authentication**: Secure user authentication using JWT tokens.
- **User Authorization**: Restrict access to certain features based on user roles and permissions.
- **User Profile**: Users can view their uploaded PDF files and manage them in their profile.
- **Error Handling**: Comprehensive error handling and validation to ensure smooth user experience.
- **Responsive Design**: Mobile-friendly user interface for seamless access across devices.

- - **Anonymous PDF Extraction**: Users can extract pages from PDF files without requiring to register or log in

## Installation

1. **Clone the Repository**: `git clone https://github.com/your-username/pdf-extractor.git`
2. **Navigate to the Server Directory**: `cd pdf-extractor/server`
3. **Install Dependencies**: `npm install`
4. **Set Up Environment Variables**: Create a `.env` file based on the provided `.env.example` file and fill in the necessary variables.
5. **Start the Server**: `npm start`
6. **Navigate to the Client Directory**: `cd ../client`
7. **Install Dependencies**: `npm install`
8. **Start the Client**: `npm start`

## Usage

1. **Register/Login**: Create an account or log in to access the application features.
2. **Upload PDF**: Upload a PDF file using the provided interface.
3. **Extract Pages**: Select specific pages from the uploaded PDF and extract them as separate PDF files.
4. **Manage PDFs**: View and manage uploaded PDF files in your user profile.
5. **Logout**: Securely log out from your account when done.

## Technologies Used

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Cloud Storage: Cloudinary
- Authentication: JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/new-feature`)
6. Create a pull request

## License

This project is licensed under the [MIT License](LICENSE).
