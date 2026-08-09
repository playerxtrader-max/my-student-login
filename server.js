const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

// คำสั่งนี้ทำให้เซิร์ฟเวอร์แสดงไฟล์ index.html เป็นหน้าแรกอัตโนมัติ
app.use(express.static(__dirname));

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // อ่านข้อมูลผู้ใช้จากไฟล์ users.json
    let users = {};
    try {
        users = JSON.parse(fs.readFileSync('users.json'));
    } catch (error) {
        console.error('Error reading users.json:', error);
    }

    if (users[username] && users[username] === password) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));