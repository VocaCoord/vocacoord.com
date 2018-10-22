const express = require("express");
const path = require("path");
const workers = require("os").cpus().length;
const mongodb = require("mongodb");
const cors = require("cors");
const enforce = require('express-sslify');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const ClusterWS = require('clusterws');

const clusterws = new ClusterWS({
  port,
  worker,
  workers,
  restartWorkerOnFail: true
});

function worker() {
  const wss = this.wss;
  const server = this.server;
  const classroomsCollection = "classrooms";
  const usersCollection = "users";
  let db;

  const app = express();
  if ('HEROKU' in process.env || ('DYNO' in process.env && process.env.HOME === '/app')) app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(cors());
  app.use(bodyParser.json());
  app.use((req, res) => {
    const reducer = combineReducers({
      session: sessionReducer
    });

    const store = createStore(reducer);

    sessionService.initServerSession(store, req);
  });

  mongodb.MongoClient.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/VocaCoord",
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      db = client.db();
    }
  );

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  // Answer API requests.
  app.get("/api", (req, res) => {
    res.set("Content-Type", "application/json");
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.get("/api/classrooms", (req, res) => {
    db.collection(classroomsCollection)
      .find({})
      .toArray((err, docs) => {
        res.status(200).json(docs);
      });
  });

  app.get("/api/users", (req, res) => {
    db.collection(usersCollection)
      .find({})
      .toArray((err, docs) => {
        res.status(200).json(docs);
      });
  });

  app.get("/api/create", (req, res) => {
    db.collection(classroomsCollection)
      .find({}, { projection: { _id: 0 } })
      .toArray((err, classrooms) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        let classIDs = classrooms.map(classroom => classroom.classID);

        do {
          classID = Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase();
        } while (classIDs.includes(classID));

        db.collection(classroomsCollection).insertOne(
          { classID },
          (err, doc) => {
            res.status(201).json(doc.ops[0]);
          }
        );
      });
  });

  app.get("/api/join/:classID", (req, res) => {
    let { classID } = req.params;

    db.collection(classroomsCollection)
      .find({}, { projection: { _id: 0 } })
      .toArray((err, classrooms) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        let classIDs = classrooms.map(classroom => classroom.classID);

        if (classIDs.includes(classID)) {
          console.log("Joined an existing class");
        } else {
          console.log("Class doesn't exist");
        }

        res.sendStatus(200);
      });
  });

  /* this is not secure */
  app.get("/api/remove/:classID", (req, res) => {
    let { classID } = req.params;

    if (classID === 'all') {
      db.collection(classroomsCollection).deleteMany({});
    } else {
      db.collection(classroomsCollection).deleteOne({ classID });
    }

    if (classID === 'users') db.collection(usersCollection).deleteMany({});

    db.collection(classroomsCollection).find({}).toArray((err, docs) => {
      res.status(200).json(docs);
    });
  });

  app.post("/api/login", (req, res) => {
    console.log('login', req.body)
    const { email, password } = req.body;
    db.collection(usersCollection).findOne({ email }, (err, doc) => {
      if (!doc) return res.sendStatus(400);
      if (doc.password !== password) return res.sendStatus(400);
      res.sendStatus(200);
    });
  });

  app.post("/api/signup", (req, res) => {
    console.log('signup', req.body)
    const { firstName, lastName, email, password } = req.body;
    db.collection(usersCollection).findOne({ email }, (err, doc) => {
      if (doc) return res.sendStatus(400);
      db.collection(usersCollection).insertOne({ firstName, lastName, email, password }, (err, doc) => {
        res.sendStatus(200);
      });
    });
  });


  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  server.on('request', app);

  /* this needs to only happen on certain endpoints */
  wss.on('connection', (socket, req) => {
    console.log(`connection to  ${process.pid} with socket ${socket} and request ${req}`);
  });
  
}
