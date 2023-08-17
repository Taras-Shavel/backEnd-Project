import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose, { Document, Schema } from "mongoose";

import { configs } from "./confings/config";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

enum roles {
  BUYER = "buyer",
  SELLER = "seller",
  MANAGER = "manager",
  ADMIN = "admin",
}

interface CustomRequest extends Request {
  userRole: roles;
  premiumAccount: boolean;
  userId: string;
}

app.post("/login", (req: Request, res: Response) => {
  const { username, password }: any = req.body;

  if (username === "taras.shavel39@gmail.com" && password === "210183") {
    const user = {
      userRole: roles.SELLER,
      premiumAccount: true,
      userId: "your-user-id",
      get: req.get.bind(req),
      header: req.header.bind(req),
    } as CustomRequest;

    const accessToken = jwt.sign(user, "your-secret-key", { expiresIn: "1h" });
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Помилка автентифікації" });
  }
});

function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Авторизація не пройдена" });

  jwt.verify(token, "your-secret-key", (err, user: any) => {
    if (err) return res.status(403).json({ message: "Помилка авторизації" });

    req.userRole = user.userRole;
    req.premiumAccount = user.premiumAccount;
    req.userId = user.userId;
    next();
  });
}

// З'єднання з базою даних
mongoose
  .connect(configs.DB_URL)
  .then(() => {
    console.log("З'єднання з базою даних встановлено!");
  })
  .catch((error) => {
    console.error("Помилка підключення до MongoDB:", error);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Помилка підключення до MongoDB:"));
db.once("open", () => {
  console.log("З'єднання з базою даних встановлено!");
});

// Модель оголошення
interface Advertisement extends Document {
  title: string;
  description: string;
  price: number;
  currency: string;
  userId: string;
}

const AdvertisementSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  userId: { type: String, required: true },
});

const AdvertisementModel = mongoose.model<Advertisement>(
  "Advertisement",
  AdvertisementSchema,
);

// Захищений GET-запит на отримання всіх оголошень
app.get(
  "/advertisements",
  authenticateToken,
  async (req: CustomRequest, res: Response) => {
    const userRole: roles = req.userRole;

    if (userRole === roles.SELLER) {
      try {
        const advertisements: Advertisement[] = await AdvertisementModel.find({
          userId: req.userId,
        });

        res.status(200).json(advertisements);
      } catch (error) {
        res.status(500).json({ message: "Помилка при отриманні оголошень" });
      }
    } else {
      res.status(403).json({ message: "Немає доступу" });
    }
  },
);

app.post(
  "/advertisements",
  authenticateToken,
  async (req: CustomRequest, res: Response) => {
    const userRole: roles = req.userRole;
    const premiumAccount: boolean = req.premiumAccount;
    const { title, description, price, currency }: any = req.body;

    if (userRole === roles.SELLER && (premiumAccount || true)) {
      try {
        const newAdvertisement = new AdvertisementModel({
          title,
          description,
          price,
          currency,
          userId: req.userId,
        });

        await newAdvertisement.save();

        res.status(201).json({ message: "Оголошення створено" });
      } catch (error) {
        res.status(500).json({ message: "Помилка при створенні оголошення" });
      }
    } else {
      res.status(403).json({ message: "Немає доступу" });
    }
  },
);
app.delete(
  "/advertisements/:id",
  authenticateToken,
  async (req: CustomRequest, res: Response) => {
    const userRole: roles = req.userRole;

    if (userRole === roles.SELLER) {
      try {
        const advertisementId: string = req.params.id;

        const advertisement: Advertisement | null =
          await AdvertisementModel.findOne({
            _id: advertisementId,
            userId: req.userId,
          });

        if (advertisement) {
          await advertisement.deleteOne();
          res.status(200).json({ message: "Оголошення видалено" });
        } else {
          res.status(404).json({ message: "Оголошення не знайдено" });
        }
      } catch (error) {
        res.status(500).json({ message: "Помилка при видаленні оголошення" });
      }
    } else {
      res.status(403).json({ message: "Немає доступу" });
    }
  },
);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
