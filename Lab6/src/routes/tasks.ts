import { Request, Response } from 'express';
const data = require("../data");
const taskData = data.tasks;

export class Tasks {
    public routes(app): void {
        // Get All Tasks Router - DONE
        app.route('/api/tasks').get(async (req: Request, res: Response) => {
            try {
                const taskList = await taskData.getAllTasks(req.query.skip, req.query.take);
                res.status(200).json(taskList);

            } catch (err) {
                res.status(400).json({ "error": err.message });
            };
        });

        // Get Specific Task (taskID) Router - DONE
        app.route('/api/tasks/:id').get(async (req: Request, res: Response) => {
            try {
                const task = await taskData.getTaskByID(req.params.id);
                res.status(200).json(task);

            } catch (err) {
                res.status(404).json({ "error": err.message });
            };
        });

        // Create a Task Router - DONE
        app.route('/api/tasks').post(async (req: Request, res: Response) => {
            try {
                let taskInfo = req.body;
                const createdPost = await taskData.createTask(taskInfo.title, taskInfo.description, taskInfo.hoursEstimated, taskInfo.completed, taskInfo.comments);
                res.status(201).json(createdPost);

            } catch (err) {
                res.status(400).json({ "error": err.message });
            };
        });

        // Edit ALL Task Information Router - DONE
        app.route('/api/tasks/:id').put(async (req: Request, res: Response) => {
            try {
                let updateInfo = req.body;
                const update = await taskData.updateTask(req.params.id, updateInfo.title, updateInfo.description, updateInfo.hoursEstimated, updateInfo.completed, 1);
                res.status(201).json(update);

            } catch (err) {
                res.status(404).json({ "error": err.message });
            };
        });

        // Edit PART of Task Information Router - DONE
        app.route('/api/tasks/:id').patch(async (req: Request, res: Response) => {
            try {
                let updateInfo = req.body;

                if (!updateInfo.title) { updateInfo.title = undefined };
                if (!updateInfo.description) { updateInfo.description = undefined };
                if (!updateInfo.hoursEstimated) { updateInfo.hoursEstimated = undefined };
                if (updateInfo.completed === undefined) { updateInfo.completed = undefined };

                const edit = await taskData.updateTask(req.params.id, updateInfo.title, updateInfo.description, updateInfo.hoursEstimated, updateInfo.completed, 2);
                res.status(200).json(edit);

            } catch (err) {
                res.status(404).json({ "error": err.message });
            };
        });

        // Add Comment to Task Router - DONE
        app.route('/api/tasks/:id/comments').post(async (req: Request, res: Response) => {
            try {
                let commentInfo = req.body;
                const comment = await taskData.addComment(req.params.id, commentInfo.name, commentInfo.comment);
                res.status(201).json(comment);

            } catch (err) {
                res.status(404).json({ "error": err.message });
            };
        });

        // Delete Comment From Task Router - DONE
        app.route('/api/tasks/:taskId/:commentId').delete(async (req: Request, res: Response) => {
            try {
                const deleted = await taskData.deleteComment(req.params.taskId, req.params.commentId);
                res.status(204).json(deleted);

            } catch (err) {
                res.status(404).json({ "error": err.message });
            };
        });
    };
};