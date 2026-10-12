
const express = require('express');

const app = express();
app.use(express.json());

let students = [
  {
    id: 1,
    name: 'Rasagna',
    rollNo: '24075A0503',
    course: 'Computer Science'
  },
  {
    id: 2,
    name: 'Anita Sharma',
    rollNo: '23071A0540',
    course: 'Information Technology'
  }
];

// Test 1: GET all students
app.get('/students', (req, res) => {
  res.json({
    success: true,
    message: 'Students retrieved successfully',
    data: students
  });
});

// Test 2: GET one student
app.get('/students/:id', (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  res.json({
    success: true,
    message: 'Student retrieved successfully',
    data: student
  });
});

// Test 3: POST a new student
app.post('/students', (req, res) => {
  console.log("POST ROUTE HIT");
  const { name, rollNo, course } = req.body;

  const newStudent = {
    id: students.length
      ? Math.max(...students.map(s => s.id)) + 1
      : 1,
    name,
    rollNo,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student added successfully',
    data: newStudent
  });
});

// Test 4: PATCH student details
app.patch('/students/:id', (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  Object.assign(student, req.body);

  res.json({
    success: true,
    message: 'Student updated successfully',
    data: student
  });
});

// Test 5: DELETE a student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(
    s => s.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
