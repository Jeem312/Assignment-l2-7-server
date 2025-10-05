"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getAllProjects = exports.createProject = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const profect_service_1 = require("./profect.service");
const sendResponse_1 = require("../../../utils/sendResponse");
exports.createProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield profect_service_1.projectServices.createProject(req.body);
    (0, sendResponse_1.SendResponse)(res, { statusCode: 201, success: true, message: "Project created", data: project });
}));
exports.getAllProjects = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield profect_service_1.projectServices.getAllProjects();
    (0, sendResponse_1.SendResponse)(res, { statusCode: 200, success: true, message: "Projects fetched", data: projects });
}));
exports.updateProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield profect_service_1.projectServices.updateProject(req.params.id, req.body);
    (0, sendResponse_1.SendResponse)(res, { statusCode: 200, success: true, message: "Project updated", data: project });
}));
exports.deleteProject = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield profect_service_1.projectServices.deleteProject(req.params.id);
    (0, sendResponse_1.SendResponse)(res, { statusCode: 200, success: true, message: "Project deleted", data: null });
}));
