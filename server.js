const fs = require('fs');
const express = require('express'); // express 모듈을 불러온다.
const bodyParser = require('body-parser'); // body-parser 모듈을 불러온다.
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // 요청 본문을  json 형태로 파싱
app.use(bodyParser.urlencoded({ extended: true })); // url 형식의 데이터 전달
/*
  - true: Express 에 기본 내장된 querystring  모듈을 사용한다.
  - false: querystring 모듈의 기능이 좀 더 확장된 qs 모듈을 사용한다. (qs 모듈 별도 설치 필요)
  ※ querystring 모듈?
      -> url 주소 뒤에 붙어서 넘어오는 파라미터인 querystring을 쉽게 조작할 수 있는 기능을 제공하는 모듈이다.
 */

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.post,
  database: conf.database
});
connection.connect();

const multer = require('multer'); // 사용자가 업로드한 파일의 이름은 multer 라이브러리에 의해서 중복되지 않는 형태로 자동으로 바뀌어서 올라간다.
// -> 실제로 이런 이미지 업로드 기능은 AWS의 S3와 같은 서비스를 이용해서 저장을 하게 되면 매우 효과적이다.
const upload = multer({ dest: './upload' }); // 목적지 : ./upload
// upload 라는 이름의 폴더를 사용자가 실제로 접근해서 프로필 이미지를 확인할 수 있도록 하기 위해서
// express.static 을 이용해 ./upload 폴더를 공유할 수 있도록 한다.

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.use('/image', express.static('./upload'));
// image 폴더에서 upload 폴더에 접근할 수 있도록 한다.
// 즉 사용자 입장에서는 image 라는 이름의 경로로 접근을 하는데, 우리의 실제 서버의 /upload 폴더와
// 맵핑이 된다는 의미다.

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(rows);
    }
  );
});


app.listen(port, () => console.log(`Listening on port ${port}`));

// Npdejs Web server implement
