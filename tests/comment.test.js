import Comment from "../models/comment.js";
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
describe("GET /api/v1/comments", () => {
  it("It should GET all the comments", (done) => {
    jwt.sign(
      { email: "info@email.com", username: "rchl" },
      process.env.SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        chai
          .request(app)
          .get("/api/v1/comments")
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
      .get("/api/v2/comments")
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });
});

/**
 * Test the POST route
 */

describe("/POST comment", () => {
  it("it should POST a comment ", (done) => {
    let comment = {
      email: faker.internet.email(),
      comment: faker.lorem.paragraph(),
    };
    chai
      .request(app)
      .post("/api/v1/comment/add")
      .send(comment)
      .end((err, res) => {
        // console.log({ res: res.body, status: res.status });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("Message").eql("Comment added");
        done();
      });
  });

  // in case we use wrong url
  it("it should not POST a comment with wrong url ", (done) => {
    let comment = {
      email: faker.internet.email(),
      comment: faker.lorem.paragraph(),
    };

    chai
      .request(app)
      .post("/api/v2/comment/adds")
      .send(comment)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

/*
 * Test the DELETE route
 */
describe("/DELETE/:id comment", () => {
  it("it should DELETE a comment given the id", (done) => {
    let comment = new Comment({
      email: faker.internet.email(),
      comment: faker.lorem.paragraph(),
    });
    comment.save().then((dcomment) => {
      // console.log(darticle._id);
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // console.log(token);
          chai
            .request(app)
            .delete(`/api/v1/comment/${dcomment._id}`)
            .set("Authorization", `bearer ${token}`)
            .end((err, res) => {
              //             console.log({ res: res.body, status: res.status });
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("Message").eql("Comment deleted");
              done();
            });
        }
      );
    });
  });

  // in case user not logged in
  it("it should not POST a comment without login ", (done) => {
    let comment = new Comment({
      email: faker.internet.email(),
      comment: faker.lorem.paragraph(),
    });
    comment.save().then((dcomment) => {
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // res.status(200).json({ token });
          chai
            .request(app)
            .delete(`/api/v1/blog/${dcomment._id}`)
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
    let comment = new Comment({
      email: faker.internet.email(),
      comment: faker.lorem.paragraph(),
    });
    comment.save().then((dcomment) => {
      // console.log(darticle._id);
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // console.log(token);
          chai
            .request(app)
            .delete(`/api/v2/coments/${dcomment._id}`)
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
