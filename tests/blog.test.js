import Blog from "../models/blog.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import jwt from "jsonwebtoken";

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Blog API", () => {
  /**
   * Test the GET all the blogs route
   */
  describe("GET /api/blog", () => {
    it("It should GET all the blogs", (done) => {
      chai
        .request(app)
        .get("/api/v1/blogs")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          //             response.body.length.should.not.be.eq(0);
          done();
        });
    });
    // in case we pass the wrong url

    it("It should not GET all blogs due to wrong url", (done) => {
      chai
        .request(app)
        .get("/api/v2/blogs/")
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
    });
  });

  /**
   * Test the GET one the blog route
   */

  describe("/GET/blog/:id Article", () => {
    it("it should GET a blog article by the given id", (done) => {
      let Article = new Blog({
        title: "Simple dummy text",
        content:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      });
      Article.save().then((article) => {
        chai
          .request(app)
          .get("/api/v1/blog/" + article._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("content");
            res.body.should.have.property("_id").eql(article._id.toString());
            done();
          });
      });
    });

    // in case we pass the wrong url

    it("It should not GET an article by id with wrong url", (done) => {
      let Article = new Blog({
        title: "Simple dummy text",
        content:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      });
      Article.save().then((article) => {
        chai
          .request(app)
          .get("/api/v2/blogs/" + article._id)
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });
    });

    // in case we pass the wrong id
    it("It should not GET an article by invalid id", (done) => {
      let Article = new Blog({
        title: "Simple dummy text",
        content:
          "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      });
      Article.save().then((article) => {
        chai
          .request(app)
          .get("/api/v1/blog/1a" + article._id)
          .end((err, response) => {
            response.should.have.status(404);
            done();
          });
      });
    });
  });
  /**
   * Test the POST route
   */

  describe("/POST book", () => {
    it("it should POST a blog ", (done) => {
      let Article = {
        title: "Type specimen book",
        content:
          "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      };
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // res.status(200).json({ token });
          chai
            .request(app)
            .post("/api/v1/blog/add")
            .set("Authorization", `bearer ${token}`)
            .send(Article)
            .end((err, res) => {
              // console.log({ res: res.body, status: res.status });
              res.should.have.status(201);
              res.body.should.be.a("object");
              res.body.should.have.property("Message").eql("Article added");
              done();
            });
        }
      );
    });
    // in case user not logged in
    it("it should not POST a blog without login ", (done) => {
      let Article = {
        title: "Type specimen book",
        content:
          "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      };
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // res.status(200).json({ token });
          chai
            .request(app)
            .post("/api/v1/blog/add")
            .set("Authorization", `bearer ${!token}`)
            .send(Article)
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        }
      );
    });
    // in case we use wrong url
    it("it should not POST a blog ", (done) => {
      let Article = {
        title: "Type specimen book",
        content:
          "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      };
      jwt.sign(
        { email: "info@email.com", username: "rchl" },
        process.env.SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          // res.status(200).json({ token });
          chai
            .request(app)
            .post("/api/v2/blog/adds")
            .set("Authorization", `bearer ${token}`)
            .send(Article)
            .end((err, res) => {
              // console.log({ res: res.body, status: res.status });
              res.should.have.status(404);

              done();
            });
        }
      );
    });
  });

  /*
   * Test the DELETE route
   */
  describe("/DELETE/:id bog", () => {
    it("it should DELETE a blog given the id", (done) => {
      let deleteArticle = new Blog({
        title: "The Lord of the Rings",
        content:
          "imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged ",
      });
      deleteArticle.save().then((darticle) => {
        // console.log(darticle._id);
        jwt.sign(
          { email: "info@email.com", username: "rchl" },
          process.env.SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            // console.log(token);
            chai
              .request(app)
              .delete(`/api/v1/blog/${darticle._id}`)
              .set("Authorization", `bearer ${token}`)
              .end((err, res) => {
                console.log({ res: res.body, status: res.status });
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("Message").eql("Article deleted");
                done();
              });
          }
        );
      });
    });

    // in case user not logged in
    it("it should not POST a blog without login ", (done) => {
      let deleteArticle = new Blog({
        title: "The Lord of the Rings",
        content:
          "imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged ",
      });
      deleteArticle.save().then((darticle) => {
        jwt.sign(
          { email: "info@email.com", username: "rchl" },
          process.env.SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            // res.status(200).json({ token });
            chai
              .request(app)
              .delete(`/api/v1/blog/${darticle._id}`)
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
    it("it should not DELETE a blog given the id", (done) => {
      let deleteArticle = new Blog({
        title: "The Lord of the Rings",
        content:
          "imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged ",
      });
      deleteArticle.save().then((darticle) => {
        // console.log(darticle._id);
        jwt.sign(
          { email: "info@email.com", username: "rchl" },
          process.env.SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            // console.log(token);
            chai
              .request(app)
              .delete(`/api/v2/blogs/${darticle._id}`)
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

  /**
   * Test the UPDATE route
   */

  describe("/PUT/:id blog", () => {
    it("it should UPDATE an article given the id", (done) => {
      let BlogArticle = new Blog({
        title: "Lorem ipsum",
        content:
          "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged ",
      });
      BlogArticle.save().then((particle) => {
        jwt.sign(
          { email: "info@email.com", username: "rchl" },
          process.env.SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            chai
              .request(app)
              .put("/api/v1/blog/" + particle._id)
              .set("Authorization", `bearer ${token}`)
              .send({
                title: "Dolor sit amet",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              })

              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");
                res.body.should.have.property("Message").eql("Article updated");

                done();
              });
          }
        );
      });
    });

    // in case user not logged in
    it("it should UPDATE an article given the id after login", (done) => {
      let BlogArticle = new Blog({
        title: "Lorem ipsum",
        content:
          "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged ",
      });
      BlogArticle.save().then((particle) => {
        jwt.sign(
          { email: "info@email.com", username: "rchl" },
          process.env.SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            chai
              .request(app)
              .put("/api/v1/blog/" + particle._id)
              .set("Authorization", `bearer ${!token}`)
              .send({
                title: "Dolor sit amet",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              })

              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          }
        );
      });
    });

    // in case we use wrong url
    it("it should UPDATE an article given the id", (done) => {
      let BlogArticle = new Blog({
        title: "Lorem ipsum",
        content:
          "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged ",
      });
      BlogArticle.save().then((particle) => {
        jwt.sign(
          { email: "info@email.com", username: "rchl" },
          process.env.SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            chai
              .request(app)
              .put("/api/v1/blog/" + particle._id)
              .set("Authorization", `bearer ${token}`)
              .send({
                title: "Dolor sit amet",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              })

              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");
                res.body.should.have.property("Message").eql("Article updated");

                done();
              });
          }
        );
      });
    });
  });
});
