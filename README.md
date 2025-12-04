# URL Shortener

A simple URL shortening service built with Node.js, Express, and MongoDB. This application allows users to create short URLs from long URLs and track access statistics.

## Features

- ✅ Shorten long URLs
- ✅ Custom short URL IDs
- ✅ Access count tracking
- ✅ URL redirection
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ MongoDB Atlas integration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Environment**: dotenv
- **Utilities**: nanoid for unique ID generation

## Project Structure

```
url_shortening/
├── models/
│   └── url.js          # MongoDB schema for URLs
├── routes/
│   ├── index.js        # Redirect routes
│   └── urls.js         # URL CRUD operations
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── app.js              # Main application file
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/s-nayan/url_shortening.git
   cd url_shortening
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URL=mongodb+srv://your_username:your_password@cluster.mongodb.net/
   BASE=http://localhost:3333
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3333`

## API Endpoints

### Create Short URL
```http
POST /url/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/very-long-url",
  "urlId": "custom-id" // optional
}
```

### Get All URLs
```http
GET /url
```

### Get Specific URL
```http
GET /url/:urlId
```

### Update URL
```http
PUT /url/:urlId
Content-Type: application/json

{
  "originalUrl": "https://updated-url.com"
}
```

### Delete URL
```http
DELETE /url/:urlId
```

### Redirect to Original URL
```http
GET /:urlId
```

## Usage Example

1. **Create a short URL:**
   ```bash
   curl -X POST http://localhost:3333/url/shorten \
     -H "Content-Type: application/json" \
     -d '{"originalUrl": "https://github.com/s-nayan/url_shortening"}'
   ```

2. **Access the short URL:**
   ```bash
   curl http://localhost:3333/{generated-urlId}
   ```

## Database Schema

```javascript
{
  urlId: String,      // Unique identifier for the short URL
  originalUrl: String, // Original long URL
  shortUrl: String,   // Complete short URL
  accessCount: Number, // Number of times accessed
  createdAt: Date,    // Creation timestamp
  updatedAt: Date     // Last update timestamp
}
```

## Environment Variables

- `MONGO_URL`: MongoDB connection string
- `BASE`: Base URL for the application (default: http://localhost:3333)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Nayan** - [s-nayan](https://github.com/s-nayan)

## Acknowledgments

- Built with Express.js framework
- Uses MongoDB Atlas for cloud database
- Nanoid library for generating unique IDs
