const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const loginRoutes = require('./routes/loginRoutes');
app.use('/api/login', loginRoutes);

const studentRoutes = require('./routes/studentRoutes');
app.use('/api/student', studentRoutes);

const facultyRoutes = require('./routes/facultyRoutes');
app.use('/api/faculty', facultyRoutes);

const adminRoutes = require("./routes/adminRoutes"); // ✅ Add this
app.use("/api", adminRoutes); 

const adminAttendanceRoutes = require("./routes/adminAttendanceRoutes");
app.use("/api/admin", adminAttendanceRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

