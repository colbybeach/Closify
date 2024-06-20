import { Router } from "express";

import create from "./create.route";
import read from "./read.route";
import update from "./update.route";
import delet from "./delete.route";

const router = Router();

router.use("/create", create);
router.use("/read", read);
router.use("/update", update);
router.use("/delete", delet);


export default router;
