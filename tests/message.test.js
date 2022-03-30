import Message from "../models/message.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

//Assertion Style
chai.should();

chai.use(chaiHttp);

/**
 * Test the GET all the comments route
 */
describe("GET /api/v1/messages", () => {
  it("It should GET all the messages", (done) => {
    jwt.sign(
      { email: "info@email.com", username: "rchl" },
      process.env.SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        chai
          .request(app)
          .get("/api/v1/messages")
          .set("Authorization", `bearer ${token}`)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            //             response.body.length.should.not.be.eq(0);
            done();
          });
      }
    );
  });
  // in case we pass the wrong url

  it("It should not GET all comments due to wrong url", (done) => {
    chai
      .request(app)
      .get("/api/v2/messages")
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });
});

/**
 * Test the POST route
 */

describe("/POST message", () => {
  //   it("it should POST a message ", (done) => {
  //     let newmessage = {
  //       firstName: "jane",

  //       lastName: "jolie",

  //       emailAddress: faker.internet.email(),

  //       phoneNumber: faker.phone.phoneNumber(),

  //       message: faker.lorem.paragraph(),
  //     };
  //     chai
  //       .request(app)
  //       .post("/api/v1/message/add")
  //       .send(newmessage)
  //       .end((err, res) => {
  //         // console.log({ res: res.body, status: res.status });
  //         //         res.should.have.status(201);
  //         res.body.should.be.a("object");
  //         res.body.should.have.property("Message").eql("Message added");
  //         done();
  //       });
  //   });

  // in case we use wrong url
  it("it should not POST a comment with wrong url ", (done) => {
    let newmessage = {
      firstName: faker.name.firstName(),
      lastName: "jolie",
      emailAddress: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      message: faker.lorem.paragraph(),
    };

    chai
      .request(app)
      .post("/api/v2/message/adds")
      .send(newmessage)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

/*
 * Test the DELETE route
 */
describe("/DELETE/:id message", () => {
  it("it should DELETE a message given the id", (done) => {
    let newmessage = new Message({
      firstName: "zeni",
      lastName: "jolie",
      emailAddress: faker.internet.email(),
      phoneNumber: 5555555555555,
      message: faker.lorem.paragraph(),
    });
    newmessage.save().then((dmessage) => {
      // console.log(darticle._id);
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // console.log(token);
          chai
            .request(app)
            .delete(`/api/v1/message/${dmessage._id}`)
            .set("Authorization", `bearer ${token}`)
            .end((err, res) => {
              //             console.log({ res: res.body, status: res.status });
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("Message").eql("Message deleted");
              done();
            });
        }
      );
    });
  });

  // in case user not logged in
  it("it should not DELETE a message without login ", (done) => {
    let newmessage = new Message({
      firstName: "dani",
      lastName: "jolie",
      emailAddress: faker.internet.email(),
      phoneNumber: 677777777,
      message: faker.lorem.paragraph(),
    });
    newmessage.save().then((dmessage) => {
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // res.status(200).json({ token });
          chai
            .request(app)
            .delete(`/api/v1/message/${dmessage._id}`)
            .set("Authorization", `bearer ${!token}`)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        }
      );
    });
  });
  // in case we use wrong url
  it("it should not DELETE a comment given the id", (done) => {
    let newmessage = new Message({
      firstName: "nice",
      lastName: "jolie",
      emailAddress: faker.internet.email(),
      phoneNumber: 88888888888,
      message: faker.lorem.paragraph(),
    });
    newmessage.save().then((dmessage) => {
      // console.log(darticle._id);
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // console.log(token);
          chai
            .request(app)
            .delete(`/api/v2/messages/${dmessage._id}`)
            .set("Authorization", `bearer ${token}`)
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        }
      );
    });
  });
});
