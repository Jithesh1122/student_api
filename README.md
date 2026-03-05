# Student API Mini Assignment

A simple Node.js REST API using the built-in `http` module.

## Features
- `GET /students`
- `POST /students`
- `DELETE /students/:id`

## Student Fields
- `id`
- `name`
- `course`

## Project Structure
- `server.js` - API implementation

## How to Run
1. Open terminal in this folder:
   - `Day_9/Student_API_Mini_Assignment`
2. Start server:
   - `node server.js`
3. Server runs at:
   - `http://localhost:3000`

## API Endpoints

### 1. Get all students
- Method: `GET`
- URL: `/students`
- Response: `200 OK`

### 2. Create a student
- Method: `POST`
- URL: `/students`
- Body (JSON):
```json
{
  "name": "Meena",
  "course": "Express"
}
```
- Success Response: `201 Created`
- Validation Error: `400 Bad Request`

### 3. Delete a student by ID
- Method: `DELETE`
- URL: `/students/:id`
- Success Response: `200 OK`
- Invalid ID: `400 Bad Request`
- Not Found: `404 Not Found`

## Quick Test with curl
```bash
curl http://localhost:3000/students

curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Meena","course":"Express"}'

curl -X DELETE http://localhost:3000/students/2
```
