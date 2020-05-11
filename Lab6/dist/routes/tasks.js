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
const data = require("../data");
const taskData = data.tasks;
class Tasks {
    routes(app) {
        // Get All Tasks Router - DONE
        app.route('/api/tasks').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.query.skip, req.query.take);
                const taskList = yield taskData.getAllTasks(req.query.skip, req.query.take);
                res.status(200).json(taskList);
            }
            catch (err) {
                res.status(400).json({ "error": err.message });
            }
            ;
        }));
        // Get Specific Task (taskID) Router - DONE
        app.route('/api/tasks/:id').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield taskData.getTaskByID(req.params.id);
                res.status(200).json(task);
            }
            catch (err) {
                res.status(404).json({ "error": err.message });
            }
            ;
        }));
        // Create a Task Router - DONE
        app.route('/api/tasks').post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let taskInfo = req.body;
                const createdPost = yield taskData.createTask(taskInfo.title, taskInfo.description, taskInfo.hoursEstimated, taskInfo.completed, taskInfo.comments);
                res.status(201).json(createdPost);
            }
            catch (err) {
                res.status(400).json({ "error": err.message });
            }
            ;
        }));
        // Edit ALL Task Information Router - DONE
        app.route('/api/tasks/:id').put((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let updateInfo = req.body;
                const update = yield taskData.updateTask(req.params.id, updateInfo.title, updateInfo.description, updateInfo.hoursEstimated, updateInfo.completed, 1);
                res.status(201).json(update);
            }
            catch (err) {
                res.status(404).json({ "error": err.message });
            }
            ;
        }));
        // Edit PART of Task Information Router - DONE
        app.route('/api/tasks/:id').patch((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let updateInfo = req.body;
                if (!updateInfo.title) {
                    updateInfo.title = undefined;
                }
                ;
                if (!updateInfo.description) {
                    updateInfo.description = undefined;
                }
                ;
                if (!updateInfo.hoursEstimated) {
                    updateInfo.hoursEstimated = undefined;
                }
                ;
                if (updateInfo.completed === undefined) {
                    updateInfo.completed = undefined;
                }
                ;
                const edit = yield taskData.updateTask(req.params.id, updateInfo.title, updateInfo.description, updateInfo.hoursEstimated, updateInfo.completed, 2);
                res.status(200).json(edit);
            }
            catch (err) {
                res.status(404).json({ "error": err.message });
            }
            ;
        }));
        // Add Comment to Task Router - DONE
        app.route('/api/tasks/:id/comments').post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let commentInfo = req.body;
                const comment = yield taskData.addComment(req.params.id, commentInfo.name, commentInfo.comment);
                res.status(201).json(comment);
            }
            catch (err) {
                res.status(404).json({ "error": err.message });
            }
            ;
        }));
        // Delete Comment From Task Router - DONE
        app.route('/api/tasks/:taskId/:commentId').delete((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield taskData.deleteComment(req.params.taskId, req.params.commentId);
                res.status(204).json(deleted);
            }
            catch (err) {
                res.status(404).json({ "error": err.message });
            }
            ;
        }));
    }
    ;
}
exports.Tasks = Tasks;
;
