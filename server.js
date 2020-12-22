const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
  res.send([
    {
      id: 1,
      image: 'https://placeimg.com/50/50/1',
      name:'홍길동',
      birthday: '961222',
      gender: '남자', 
      job: '대학생'
    },
    {
      id: 2,
      image: 'https://placeimg.com/50/50/2',
      name:'사임당',
      birthday: '921011',
      gender: '여자',
      job: '회사원'
    },
    {
      id: 3,
      image: 'https://placeimg.com/50/50/3',
      name:'일지매',
      birthday: '930218',
      gender: '남자',
      job: '학원강사'
    }
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));