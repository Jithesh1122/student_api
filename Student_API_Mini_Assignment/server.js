const http = require("http");

const PORT = 3000;

const students = [
  { id: 1, name: "Asha", course: "MERN" },
  { id: 2, name: "Ravi", course: "Node.js" },
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      if (!data) {
        return resolve({});
      }

      try {
        return resolve(JSON.parse(data));
      } catch (error) {
        return reject(new Error("Invalid JSON payload"));
      }
    });

    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && requestUrl.pathname === "/students") {
    return sendJson(res, 200, students);
  }

  if (req.method === "POST" && requestUrl.pathname === "/students") {
    try {
      const payload = await parseBody(req);
      const name = typeof payload.name === "string" ? payload.name.trim() : "";
      const course = typeof payload.course === "string" ? payload.course.trim() : "";

      if (!name || !course) {
        return sendJson(res, 400, { message: "Fields required: name, course" });
      }

      const student = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        course,
      };

      students.push(student);
      return sendJson(res, 201, student);
    } catch (error) {
      return sendJson(res, 400, { message: error.message });
    }
  }

  if (req.method === "DELETE" && requestUrl.pathname.startsWith("/students/")) {
    const studentId = Number(requestUrl.pathname.split("/")[2]);

    if (!Number.isInteger(studentId) || studentId < 1) {
      return sendJson(res, 400, { message: "Invalid student id" });
    }

    const index = students.findIndex((student) => student.id === studentId);
    if (index === -1) {
      return sendJson(res, 404, { message: "Student not found" });
    }

    const removedStudent = students.splice(index, 1)[0];
    return sendJson(res, 200, {
      message: "Student deleted",
      student: removedStudent,
    });
  }

  return sendJson(res, 404, { message: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Student API running on http://localhost:${PORT}`);
});