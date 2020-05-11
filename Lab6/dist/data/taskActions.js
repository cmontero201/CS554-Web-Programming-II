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
const DbClient = require("../config/DbClient");
const uuid = require("node-uuid");
let exportedMethods = {
    createTask(title, desc, timeEst = undefined, compStat = false, comment = []) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure Correct Inputs
            if (typeof title !== "string" || title === "")
                throw new SyntaxError("Task title must be an alphabetical string and cannot be empty");
            if (typeof desc !== "string" || desc === "")
                throw new SyntaxError("Task description must be an alphabetical string and cannot be empty");
            if (typeof timeEst !== "number" || timeEst === undefined || timeEst < 0)
                throw new SyntaxError("Time estimation must be non-negative and cannot be empty");
            if (typeof compStat !== "boolean" || compStat === undefined)
                throw new SyntaxError("Completion Status must be true or false and cannot be empty");
            if (!(Array.isArray(comment)))
                throw new SyntaxError("Comments must be an Array of Object(s)");
            // const taskCollection: any = await tasks();
            yield DbClient.connect();
            let db = yield DbClient.client.db('Montero-Christian-CS554-Lab1');
            let newTask = {
                "_id": uuid.v4(),
                "title": title,
                "description": desc,
                "hoursEstimated": timeEst,
                "completed": compStat,
                "comments": comment
            };
            const justAdded = yield db.collection('tasks').insertOne(newTask);
            if (justAdded.insertedCount === 0)
                throw new Error("Unable to add task");
            const newTaskID = yield justAdded.insertedId;
            return yield this.getTaskByID(newTaskID);
        });
    },
    getAllTasks(n = 0, y = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof n !== "number") {
                n = Number(n);
            }
            ;
            if (typeof y !== "number") {
                y = Number(y);
                if (y > 100) {
                    y = 100;
                }
                ;
            }
            ;
            console.log(`Skip ${n} Take ${y}`);
            // const taskCollection: any = await tasks();
            yield DbClient.connect();
            let db = yield DbClient.client.db('Montero-Christian-CS554-Lab1');
            if (y == 0) {
                return [];
            }
            else {
                const allTasks = yield db.collection('tasks').find({}).limit(y).skip(n).toArray(); //https://www.w3resource.com/mongodb/mongodb-skip-limit.php
                return allTasks;
            }
        });
    },
    getTaskByID(taskID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!taskID)
                    throw new SyntaxError("A task ID must be provided");
                // const taskCollection: any = await tasks();
                yield DbClient.connect();
                let db = yield DbClient.client.db('Montero-Christian-CS554-Lab1');
                const task = yield db.collection('tasks').findOne({ _id: taskID });
                if (task === null)
                    throw new TypeError(`There was no task associated with the given taskID (${taskID}) found`);
                return task;
            }
            catch (err) {
                console.error(err);
                return err;
            }
        });
    },
    updateTask(taskID, newTitle, newDesc, newTimeEst, newCompStat, method) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure Correct Inputs
            if (!taskID)
                throw new SyntaxError("A task ID must be provided");
            // const taskCollection: any = await tasks();
            yield DbClient.connect();
            let db = yield DbClient.client.db('Montero-Christian-CS554-Lab1');
            const oldTask = yield this.getTaskByID(taskID);
            let update;
            // PUT METHOD
            if (method === 1) {
                if (typeof newTitle !== "string" || newTitle === "")
                    throw new SyntaxError("Task title must be an alphabetical string and cannot be empty");
                if (typeof newDesc !== "string" || newDesc === "")
                    throw new SyntaxError("Task description must be an alphabetical string and cannot be empty");
                if (typeof newTimeEst !== "number" || newTimeEst === undefined || newTimeEst < 0)
                    throw new SyntaxError("Time estimation must be non-negative and cannot be empty");
                if (typeof newCompStat !== "boolean" || newCompStat === undefined)
                    throw new SyntaxError("Completion Status must be true or false and cannot be empty");
                update = {
                    "title": newTitle,
                    "description": newDesc,
                    "hoursEstimated": newTimeEst,
                    "completed": newCompStat,
                    "comments": oldTask.comments
                };
                // PATCH METHOD
            }
            else if (method == 2) {
                if (newTitle === undefined && newDesc === undefined && newTimeEst === undefined && newCompStat === undefined)
                    throw new SyntaxError("At least one (1) field edit must be provided");
                if (newTitle === undefined) {
                    newTitle = oldTask.title;
                }
                ;
                if (typeof newTitle !== "string" || newTitle === "")
                    throw new SyntaxError("Task title must be an alphabetical string and cannot be empty");
                if (newDesc === undefined) {
                    newDesc = oldTask.description;
                }
                ;
                if (typeof newDesc !== "string" || newDesc === "")
                    throw new SyntaxError("Task description must be an alphabetical string and cannot be empty");
                if (newTimeEst === undefined) {
                    newTimeEst = oldTask.hoursEstimated;
                }
                ;
                if (typeof newTimeEst !== "number" || newTimeEst === undefined || newTimeEst < 0)
                    throw new SyntaxError("Time estimation must be non-negative and cannot be empty");
                if (newCompStat === undefined) {
                    newCompStat = oldTask.completed;
                }
                ;
                if (typeof newCompStat !== "boolean" || newCompStat === undefined)
                    throw new SyntaxError("Completion Status must be true or false and cannot be empty");
                update = {
                    "title": newTitle,
                    "description": newDesc,
                    "hoursEstimated": newTimeEst,
                    "completed": newCompStat,
                    "comments": oldTask.comments
                };
            }
            ;
            const updatedTask = yield db.collection('tasks').replaceOne({ _id: taskID }, update);
            if (updatedTask.modifiedCount === 0)
                throw new TypeError(`Unable to update tasks associated with taskID ${taskID}`);
            return yield this.getTaskByID(taskID);
        });
    },
    addComment(taskID, poster, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!taskID)
                throw new SyntaxError("A task ID must be provided");
            if (typeof poster != "string" || poster === "")
                throw new SyntaxError("The name of perster must be an alphabetical string and cannot be empty");
            if (typeof comment != "string" || comment === "")
                throw new SyntaxError("Comments must be alphabetical strings and cannot be empty");
            // const taskCollection: any = await tasks();
            yield DbClient.connect();
            let db = yield DbClient.client.db('Montero-Christian-CS554-Lab1');
            const checkTaskExists = yield db.collection('tasks').findOne({ _id: taskID });
            if (checkTaskExists === null)
                throw new TypeError(`There is no task assicated with the taskID ${taskID}`);
            let commentObj = {
                "id": uuid.v4(),
                "name": poster,
                "comment": comment
            };
            let updatedTaskComment = yield db.collection('tasks').updateOne({ _id: taskID }, { $addToSet: { comments: commentObj } });
            if (updatedTaskComment.modifiedCount === 0)
                throw new TypeError(`Unable to update task comments for the task associated with taskID ${taskID}`);
            return this.getTaskByID(taskID);
        });
    },
    deleteComment(taskID, commentID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!taskID)
                throw new SyntaxError("A task ID must be provided");
            if (!commentID)
                throw new SyntaxError("A comment ID must be provided");
            yield DbClient.connect();
            let db = yield DbClient.client.db('Montero-Christian-CS554-Lab1');
            let targetTask = yield this.getTaskByID(taskID);
            if (targetTask === null)
                throw new TypeError(`There is no task associated with the taskID ${taskID}`);
            const removed = yield db.collection('tasks').updateOne({ _id: taskID }, { $pull: { comments: { id: commentID } } });
            if (removed.result.nModified === 0)
                throw new TypeError(`No comment with commentID ${commentID} was found within the task associated with taskID ${taskID}`);
            let x = yield this.getTaskByID(taskID);
            console.log("Comment Removed");
        });
    }
};
module.exports = exportedMethods;
