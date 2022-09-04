import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import docs from "./swagger";

const router = Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(docs));

export default router;
