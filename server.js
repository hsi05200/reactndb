const fs = require('fs'); // 데이터베이스 연결을 위한 추가코드
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json'); // 데이터베이스 연결을 위한 추가코드
const conf = JSON.parse(data); // 데이터베이스 연결을 위한 추가코드
const mysql = require('mysql'); // 데이터베이스 연결을 위한 추가코드

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
})
connection.connect();

//프로필이미지 파일업로드용 ( npm install -save multer 설치필요)
const multer = require('multer'); 
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES(null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));