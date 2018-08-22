const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./UserRouter');
const imageRouter = require('./ImageRouter');
const authRouter = require('./authRouter');

apiRouter.use("/", (req, res, next) => {
  console.log("Middleware");
  next();
});

apiRouter.get("/", (req, res) => {
  res.send("Techkids hotgirl api");
});

apiRouter.use("/users", userRouter);
apiRouter.use("/images",imageRouter);
apiRouter.use("/auths",authRouter);
module.exports = apiRouter;