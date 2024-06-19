"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skills_route_1 = __importDefault(require("./skills.route"));
const experience_route_1 = __importDefault(require("./experience.route"));
const project_route_1 = __importDefault(require("./project.route"));
const router = (0, express_1.Router)();
router.use("/skills", skills_route_1.default);
router.use("/experience", experience_route_1.default);
router.use("/project", project_route_1.default);
exports.default = router;
