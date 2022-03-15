const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const fs = require('fs')
const bcrypt = require("bcrypt")
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const { CLIENT_RENEG_LIMIT } = require("tls");
console.log(process.env.DATABASE_LOCAL)
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => {
  console.log('database connected successfuly');
}).catch(err =>
  console.log(err)
)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
}); //details of the xampp server

const examSchema = new mongoose.Schema({
  examKey: {
    type: String,
    required: true,

  },
  teacherId: {
    type: String,
    required: true
  },
  questions: [
    {
      question: {
        type: String
      }
    }
  ],
  options: [
    {
      A: {
        type: String,
        required: true,
      },
      B: {
        type: String,
        required: true,
      },
      C: {
        type: String,

      },
      D: {
        type: String,
      },
      E: {
        type: String,

      }
    }

  ],
  answers: [
    {
      answer: {
        type: String,
        required: true,
      }
    }
  ],
  status: {
    type: Boolean
  }
});
const Exam = mongoose.model('Exam', examSchema);

const createExam = async (req, res) => {
  try {
    console.log(req.body)

    const examSchema = new mongoose.Schema({
      examKey: {
        type: String,
        required: true,

      },
      teacherId: {
        type: String,
        required: true
      },
      questions: [
        {
          question: {
            type: String
          }
        }
      ],
      options: [
        {
          A: {
            type: String,
            required: true,
          },
          B: {
            type: String,
            required: true,
          },
          C: {
            type: String,

          },
          D: {
            type: String,
          },
          E: {
            type: String,

          }
        }

      ],
      answers: [
        {
          answer: {
            type: String,
            required: true,
          }
        }
      ],
      status: {
        type: Boolean
      }
    });

    const array = {
      examKey: "ookoko",
      teacherId: "sdhcjs",
      status: true,
      questions: [{
        question: "What is your favorite game"
      },
      {
        question: "How old are you"
      }
      ],
      options: [
        {
          A: "football",
          B: "basketball",
          C: "handball",
          D: "all",
          E: "none"
        },
        {
          A: "23",
          B: "22",
          C: "14",
          D: "15"
        }
      ],
      answers: [
        {
          answer: "C"
        },
        {
          answer: "B"
        }
      ]
    }
    // const Exam  = mongoose.model('Exam',examSchema);
    const newExam = await Exam.create(array)
    res.status(200).json({
      success: "success",
      data: {
        newExam
      }
    })
  }
  catch (err) {
    res.status(404).json({
      success: "fail",
      data: err
    })
  }
}
const getExam = async (req, res) => {
  try {
    const newExam = await Exam.findById({ _id: req.params.id });
    //console.log(newExam.ques)
    console.log(newExam.questions.length)
    res.status(200).json({
      success: "success",
      data: {
        newExam
      }
    })
  }
  catch (err) {
    res.status(404).json({
      success: "fail",
      data: err.message
    })
  }
}
const getAllExam = async (req, res) => {
  try {
    const exam = await Exam.find();
    //console.log(newExam.questions)
    res.status(200).json({
      success: "success",
      data: {
        exam
      }
    })
  }
  catch (err) {
    res.status(404).json({
      success: "fail",
      data: err.message
    })
  }
}



db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql connected");
});

let questarr = [];
let opt = [];

let exam = {
  Answer: "",
  ExamKey: "",
  Weight: "",
  ExamName: "",
};

const app = express();
const port = process.env.PORT || 5000; //determines port
// const posts;
app.get('/createExam', createExam)
app.get('/getExam/:id', getExam)
app.get('/getExam', getAllExam)
app //below listed all methods the express api can do
app.use(cors())
app.use(morgan("dev"))
app.use(express.static("../Client/public")) //serves this js file into the files in public folder(where) HTML is you can't insert node files in script tag
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var file = fs.readFileSync('./Data/exam1.json');
const exams = JSON.parse(file)


// console.log(exams);
// var x=JSON.stringify(exams);
// fs.writeFile('./Data/exam1.json', x, err => {
//   console.log("sami")
// })

app
  .post("/api/admin", async (req, res) => {
    let phno = req.body.phno;
    let dob = req.body.age;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let pass = req.body.pass;
    let email = req.body.email;
    let sex = req.body.sex;
    let dept = req.body.dept;
    let inst = req.body.inst;

    pass = await bcrypt.hash(pass, 10).then((hash) => {return hash});

    let adduser =
      "INSERT INTO admin (FirstName,LastName,Email,DoB,Password,PhoneNumber,Sex,Department,Institution) VALUES (?,?,?,?,?,?,?,?,?)";
      console.log(pass)

    db.query(adduser, [fname, lname, email, dob, pass, phno, sex, dept, inst]);
  })

app.post("/get/table", async (req, res) => {
  const { table } = req.body;
  let getexam = `SELECT * FROM ${table}`;

  const users = db.query(getexam, [table], function (err, result, fields) {
    if (err) throw err;
    res.send(await(result));
  });
})

  .post("/submitexam/", (req, res) => {


    const { examkey, weight, Answer, examname } = req.body;
    // console.log(testname, Question);
    exam = {
      Answer: Answer,
      ExamKey: examkey,
      Weight: weight,
      ExamName: examname,
    };
    let newexam = `INSERT INTO exam (ExamName,ExamKey,Question,Answer,Option,Weight)
    VALUES
    ("${exam.ExamName}","${exam.ExamKey}",
    '["${questarr}"]','["${exam.Answer}"]',
    '${JSON.stringify(opt)}','${exam.Weight}')`;

    try {
      db.query(newexam, (err) => {
        if (err) {
          res.send(err.message);
        }
        // res.send();
        res.send(newexam + "\nDone inserting");
      });
    } catch (error) {
      res.json(res.send(error.message));
    }
  })

  .post("/createquestion",
    (req, res) => {


      const detail = req.body.detail;
      console.log(detail);

      const body = req.body.body;
      console.log(body);

      let answer = [];
      let question = [];
      let option = [];
      console.log(body)
      for (i of body) {
        answer.push(i.answer);
        option.push(i.options);
        question.push(i.question);
      }

      let examquery = `INSERT INTO exam (Weight,ExamName,ExamKey,Answer,Option,Question)
         Values(${detail.weight},"${detail.examname}","${detail.examkey
        }",'${JSON.stringify(answer)}','${JSON.stringify(
          option
        )}','${JSON.stringify(question)}')`;

      db.query(examquery, function (err, result, fields) {
        if (err) throw err;
      });
    })

  .post("/signin/admin", async (req, res) => {
    //gets the email and papssword from the signin page
    let email = req.body.email;
    let pass = req.body.pass;
    console.log(pass);
    //SQL query for all admins
    let getadmin = "SELECT * from admin WHERE Deleted=0";

    //executes the query to get all admins and compare email and
    db.query(getadmin, function (err, result, fields) {
      try {
        if (err) throw new err;
        if (result == undefined) return 0;

        let resp = result.find((em) => em.Email == email);

        bcrypt.compare(pass, resp.Password).then((match) => {
          if (match) {
            res.send(resp.AdminID + " id");
          }
          else {
            return console.log("Invalid");
          }

        });
      }
      catch (err) { console.log(err.message); }

    });

  })

      .get("/exam_user", (req, res) => {
        //  /data like action but found in the div property data-url
        // var file = fs.readFileSync('./Data/exam1.json');
        // const exams = JSON.parse(file)
        // res.send(exams);
        let getexam_user = `SELECT * FROM exam_user`;

        db.query(getexam_user, function (err, result, fields) {
          if (err) throw err;
          console.log(result);

          res.send(result);


        });
      })

      .get("/exams", (req, res) => {
        //  /data like action but found in the div property data-url
        // var file = fs.readFileSync('./Data/exam1.json');
        // const exams = JSON.parse(file)
        // res.send(exams);
        let getexam = `SELECT * FROM exam`;

        db.query(getexam, function (err, result, fields) {
          if (err) throw err;
          console.log(result);

          res.send(result);


        });
      })
      .get("/students", (req, res) => {
        //  /data like action but found in the div property data-url
        let getexam = `SELECT * FROM user WHERE Deleted=0 `;

        db.query(getexam, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result);

          console.log("reponse sent");
        });
      })
      .get("/active_exams", (req, res) => {
        let get_active_exam = `SELECT * FROM exam WHERE Status=1`;

        db.query(get_active_exam, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result);

          console.log("reponse sent");
        });
      })

      .post("/api/exam", (req, res) => {
        const { Question, Option } = req.body;

        questarr.push(Question);
        opt.push(Option);

        console.log(opt);
        console.log(questarr);

        res.send(exam);
      })

      .listen(port, () => console.log(`Server running on port ${port}`));
