"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_route_1 = __importDefault(require("./create.route"));
const read_route_1 = __importDefault(require("./read.route"));
const update_route_1 = __importDefault(require("./update.route"));
const delete_route_1 = __importDefault(require("./delete.route"));
const router = (0, express_1.Router)();
router.use("/create", create_route_1.default);
router.use("/read", read_route_1.default);
router.use("/update", update_route_1.default);
router.use("/delete", delete_route_1.default);
exports.default = router;
