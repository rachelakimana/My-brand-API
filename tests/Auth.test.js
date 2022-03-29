import User from "../models/user.js";
import chai from "chai";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import chaiHttp from "chai-http";
import app from "../server.js";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

//Assertion Style
chai.should();

chai.use(chaiHttp);

// Test REGISTER endpoint
describe("User", () => {
  it("it should Register a user ", (done) => {
    let defaultUser = {
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: "admin123",
    };

    jwt.sign(
      { email: "info@email.com", username: "rchl" },
      process.env.SECRET,
      { expiresIn: "1250s" },
      (err, token) => {
        //         console.log(token);
        chai
          .request(app)
          .post("/api/v1/user/register")
          .set("Authorization", `bearer ${token}`)
          .send(defaultUser)
          .end((err, res) => {
            // console.log(res.body);
            //             res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("username");
            res.body.should.have.property("email");
            res.body.should.have.property("password");
            done();
          });
      }
    );
  });
});

// log in
describe("POST api/user/login", () => {
  it("user should login", (done) => {
    const LoginInfo = {
      username: "kati",
      password: "kati123",
    };
    chai
      .request(app)
      .post("/api/v1/user/login")
      .send(LoginInfo)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  // in case we pass a wrong url

  it("user should not login with wrong url", (done) => {
    const LoginInfo = {
      username: "kati",
      password: "kati123",
    };
    chai
      .request(app)
      .post("/api/v2/userr/login")
      .send(LoginInfo)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
