const express = require("express");
const path = require("path");
const workers = require("os").cpus().length;
const mongodb = require("mongodb");
const cors = require("cors");
const enforce = require("express-sslify");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

const ClusterWS = require("clusterws");

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
  if (
    "HEROKU" in process.env ||
    ("DYNO" in process.env && process.env.HOME === "/app")
  )
    app.use(enforce.HTTPS({ trustProtoHeader: true }));

  app.use(helmet());
  app.use(morgan("combined"));
  app.use(cors());
  app.use(
    bodyParser.json({
      limit: "100mb",
      parameterLimit: 100000
    })
  );

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
  app.use(express.static(path.resolve(__dirname, "../website/build")));

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

    if (classID === "all") {
      db.collection(classroomsCollection).deleteMany({});
    } else {
      db.collection(classroomsCollection).deleteOne({ classID });
    }

    if (classID === "users") db.collection(usersCollection).deleteMany({});

    db.collection(classroomsCollection)
      .find({})
      .toArray((err, docs) => {
        res.status(200).json(docs);
      });
  });

  app.post("/api/sync", (req, res) => {
    console.log("sync", req.body);
    db.collection(usersCollection).findOneAndUpdate(
      { email: req.body.user.email },
      { $set: { data: req.body.data } }
    );
  });

  app.post("/api/login", (req, res) => {
    console.log("login", req.body);
    const { email, password } = req.body;
    db.collection(usersCollection).findOne({ email }, (err, doc) => {
      let response;
      if (doc) {
        let data = doc.data || {};
        response = {
          status: "LOGIN_SUCCESS",
          payload: {
            authenticated: true,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            data
          }
        };
      }

      if (!doc || doc.password !== password) {
        response = {
          status: "LOGIN_FAILURE",
          payload: {
            authenticated: false
          }
        };
      }

      res.status(200).send({ response });
    });
  });

  app.post("/api/signup", (req, res) => {
    console.log("signup", req.body);
    const { firstName, lastName, email, password } = req.body;
    db.collection(usersCollection).findOne({ email }, (err, doc) => {
      let response = {
        status: "SIGNUP_SUCCESS",
        payload: {
          authenticated: true,
          firstName,
          lastName,
          email
        }
      };
      if (doc) {
        response.status = "SIGNUP_FAILURE";
        response.payload.authenticated = false;
      }
      db.collection(usersCollection).insertOne(
        { firstName, lastName, email, password, data: {} },
        (err, doc) => {
          res.status(200).send({ response });
        }
      );
    });
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../website/build", "index.html"));
  });

  server.on("request", app);

  /* this needs to only happen on certain endpoints */
  wss.on("connection", (socket, req) => {
    console.log(
      `connection to  ${process.pid} with socket ${socket} and request ${req}`
    );
  });
}
