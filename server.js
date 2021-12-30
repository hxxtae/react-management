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
})
connection.connect();

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// Npdejs Web server implement
