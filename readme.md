# WordLand Backend

This is the backend for **WordLand**, an online book site where you can create your own virtual library and download PDF books. The backend is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure sign-up and login using JWT.
- **Book Management**: API endpoints for managing books in the virtual library.
- **PDF Downloads**: API endpoints for downloading PDF versions of books.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**
    ```bash
    git clone https://github.com/MG-9205/WordLandBackEnd.git
    cd wordland-backend
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

4. **Run the development server**
    ```bash
    npm run dev
    ```

5. **API Documentation**

    Access the API documentation at `http://localhost:5000/api-docs`.

## Usage

- **Sign up/Login**: Use the provided API endpoints to create a new account or log in.
- **Manage Books**: Use the API endpoints to add, update, delete, and retrieve books.
- **Download PDF**: Use the API endpoints to download PDF versions of books.

## License

This project is licensed under the MH CODER License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to contact us at:
- GitHub: [MG-9205](https://github.com/MG-9205)
