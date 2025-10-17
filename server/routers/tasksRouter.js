import { Router } from "express";
import { body, validationResult } from "express-validator";
import * as tasks from "../data/data-model/tasksModel.js";
import * as task_assignees from "../data/data-model/taskAssigneesModel.js";
import verifyToken from "../middleware/authMiddleware.js"; // JWT middleware



const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await tasks.getAllTasks();
        if (result) {
            res.status(200).json(result);
        }
        else {
            next({ statusCode: 404, errorMessage: "Veriler bulunamadi." });
        }
    } catch (err) {
        next(err);
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        if (id) {
            const byId = await tasks.getTaskById(id);
            return res.status(200).json(byId);
        }
    } catch (error) {
        next({
            statusCode: 500,
            errorMessage: "İstenilen id ye gore veri getirilirken hata olustu.",
            error,
        });
    }
});

router.post(
    "/",
    verifyToken, // JWT kontrolü
    [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Başlık zorunludur."),
        body("description")
            .trim()
            .notEmpty()
            .withMessage("Açıklama zorunludur."),
        body("status")
            .trim()
            .notEmpty()
            .withMessage("Durum belirtmek zorunludur."),
        body("assignees")
            .optional()
            .isArray()
            .withMessage("Assignees array olmalıdır."),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, status, assignees } = req.body;
            const createdById = req.user.id; // JWT middleware ile set edilen kullanıcı

            const newTask = await tasks.addTask(
                { title, description, status },
                createdById,
                assignees
            );

            return res.status(201).json(newTask);
        } catch (err) {
            console.error("Task eklenirken hata oluştu:", err);
            next(err);
        }
    }
);


router.patch("/:id",
    [
        body("title")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Başlık boş olamaz."),
        body("description")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Açıklama boş olamaz."),
        body("assignees")
            .optional()
            .isArray()
            .withMessage("Assignees array olmalı.")
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const id = req.params.id;
            const { assignees, ...taskFields } = req.body;

            // Task alanlarını güncelle
            await tasks.updateTask(id, taskFields);

            // Eğer assignees varsa güncelle
            if (assignees) {
                // Önce mevcutları sil
                await task_assignees.removeAllAssignees(id); // bunu task_assignees modeline ekle
                // Sonra yeni kullanıcıları ekle
                for (const userId of assignees) {
                    await task_assignees.addAssignee(id, userId);
                }
            }

            // Güncellenmiş task ve assignees'i dön
            const updatedTask = await tasks.getTaskById(id);
            return res.status(200).json(updatedTask);

        } catch (error) {
            next({
                statusCode: 500,
                errorMessage: "Görev ve atamaları güncellerken hata oluştu.",
                error,
            });
        }
    });

router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("Deleted id", id);

        const deletedData = await tasks.deleteTask(id);
        console.log("its a deleted data", deletedData);

        if (deletedData) {
            return res.status(204).end();
        } else {
            next({
                statusCode: 400,
                errorMessage: "Silmeye çalıştığınız görev/task sistemde mevcut değil.",
            });
        }
    } catch (error) {
        next({
            statusCode: 500,
            errorMessage: "Görev silinirken hata oluştu.",
            error,
        });
    }
});




export default router;