import { Router } from "express";
import { body, validationResult } from "express-validator";
import * as users from "../data/data-model/usersModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await users.getAllUsers();
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
            const byId = await users.getUserById(id);
            return res.status(200).json(byId);
        }
    } catch (error) {
        next({
            statusCode: 500,
            errorMessage: "İstenilen id ye gore veri getirilirken hata olustu.",
            error,
        });
    }
})


router.post(
    "/",
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Kullanıcı adı zorunludur."),
        body("surname")
            .trim()
            .notEmpty()
            .withMessage("Kullanıcı soyadı zorunludur."),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email zorunludur.")
            .isEmail()
            .withMessage("Geçerli bir email giriniz."),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Şifre zorunludur.")
            .isLength({ min: 6 })
            .withMessage("Şifre en az 6 karakter olmalıdır."),
        body("avatarIndex")
            .trim()
            .notEmpty()
            .withMessage("Avatar seçmek zorunludur."),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newUser = req.body;
            console.log("POST ile gelen kullanıcı:", newUser);

            // Şifreyi hashle
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashedPassword;

            const result = await users.addUser(newUser);
            return res.status(201).json(result);
        } catch (err) {
            console.error("Kullanıcı eklenirken hata oluştu:", err);
            next(err);
        }
    }
);


router.post(
    "/login",
    [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email zorunludur.")
            .isEmail()
            .withMessage("Geçerli bir email giriniz."),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Şifre zorunludur."),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;

            // Kullanıcıyı e-posta ile bul
            const user = await users.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Email veya şifre hatalı." });
            }

            // Şifreyi karşılaştır
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Email veya şifre hatalı." });
            }

            // JWT token oluştur
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            // Kullanıcı bilgilerini (şifre hariç) döndür
            const { password: _, ...safeUser } = user;

            return res.status(200).json({
                message: "Giriş başarılı",
                token,
                user: safeUser,
            });
        } catch (err) {
            next({
                statusCode: 500,
                errorMessage: "Kullanıcı giriş yaparken hata oluştu.",
                error: err,
            });
        }
    }
);


router.patch("/:id",
    [
        body("name")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("İsim boş olamaz."),
        body("surname")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Soyisim boş olamaz."),
        body("email")
            .optional()
            .trim()
            .isEmail()
            .withMessage("Geçerli bir email giriniz."),
        body("password")
            .optional()
            .trim()
            .isLength({ min: 6 })
            .withMessage("Şifre en az 6 karakter olmalıdır."),
        body("avatarIndex")
            .optional()
            .isInt()
            .withMessage("Avatar index sayısal olmalı.")
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const id = req.params.id;
            const updateUser = req.body;

            //gelen veriyi kontrol kısmı
            console.log(updateUser)

            // Şifre değişiyorsa hashle
            if (updateUser.password) {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
            }
            console.log(updateUser)

            const updated = await users.updateUser(id, updateUser);
            return res.status(200).json(updated);
        } catch (error) {
            next({
                statusCode: 500,
                errorMessage: "Kullanıcı güncellenirken hata oluştu.",
                error,
            });
        }
    });

router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        const deletedData = await users.getUserById(id);
        if (deletedData) {
            const deleted = await users.deleteUser(id);
            if (deleted) {
                return res.status(204).end();
            }
        }

        next({
            statusCode: 400,
            errorMessage: "Silmeye calistiginiz kullanıcı sistemde mevcut degil.",
        });
    } catch (error) {
        next({
            statusCode: 500,
            errorMessage: "Kullanıcı silinirken hata olustu.",
            error,
        });
    }
});



export default router;