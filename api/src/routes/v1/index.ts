import { Router } from "express";

import skills from "./skills.route";
import experience from "./experience.route";
import project from "./project.route";

const router = Router();

router.use("/skills", skills);
router.use("/experience", experience);
router.use("/project", project);


export default router;
