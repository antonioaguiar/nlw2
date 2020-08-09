import express from "express";
import ClassesController from "./controllers/classes_controller";
import ConnectionsController from "./controllers/connections_controllers";
const routes = express.Router();

const classesControllers = new ClassesController();
const connectionsControllers = new ConnectionsController();

routes.post("/classes", classesControllers.create);
routes.get("/classes", classesControllers.index);
routes.get("/proffy/:id", classesControllers.list);
routes.post("/connections", connectionsControllers.create);
routes.get("/connections", connectionsControllers.index);

export default routes;
