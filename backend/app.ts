import * as dotenv from "dotenv";
import express from "express";
import { expressjwt } from "express-jwt";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { postMarkRouter, getMarkRouter, putMarkRouter, getforuserMarkRouter, deleteMarkRouter } from './controller/mark.routes'
import { signInRouter, signUpRouter } from './controller/auth.routes'
import { getAllusersRouter, getUserByIdusersRouter, getUsersBySearchTermusersRouter, getFollowingusersRouter, getFollowersusersRouter }  from "./controller/user.routes";
import { getAllMoviesRouter, getMovieByIdRouter, postMovieRouter } from "./controller/movie.routes";
import { followRouter } from "./controller/follow.routes";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.routes.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(
expressjwt({
secret: process.env.JWT_SECRET,
algorithms: ["HS256"],
}).unless({ path: [/^\/api-docs\/.*/, "/register", "/login", "/status", "/auth/signup", "/auth/signout", "/auth/signin"] })
)

app.use(cors());
app.use(bodyParser.json());
app.use('/marks/add', postMarkRouter)
app.use('/marks/all', getMarkRouter)
app.use('/marks/allforuser', getforuserMarkRouter)
app.use('/marks/update', putMarkRouter)
app.use('/marks/delete', deleteMarkRouter)

app.use('/auth/signup', signUpRouter)
app.use('/auth/signin', signInRouter)

app.use('/movies/all', getAllMoviesRouter)
app.use('/movies/add', postMovieRouter)
app.use('/movies', getMovieByIdRouter)

app.use('/users/all', getAllusersRouter)
app.use('/users/search', getUsersBySearchTermusersRouter)
app.use('/users/following', getFollowingusersRouter)
app.use('/users/followers', getFollowersusersRouter)
app.use('/users', getUserByIdusersRouter)

app.use('/follow', followRouter)


app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});
