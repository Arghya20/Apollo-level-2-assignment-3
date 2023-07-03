import express, { Request, Response } from "express";
import { NotFoundError } from "../errors";
import User from "../models/user";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const filter = (req.query.filter as string) || "";

  const users = await User.find({
    $or: [
      { phoneNumber: { $regex: filter, $options: "i" } },
      { "name.firstName": { $regex: filter, $options: "i" } },
      { "name.lastName": { $regex: filter, $options: "i" } },
      { address: { $regex: filter, $options: "i" } },
    ],
  })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(users);
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError();
  }
  res.json(user);
});

router.post("/", async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { role, budget, income } = req.body;

  let updatedUser;
  let transactionType;

  if (role === "buyer") {
    const cowPrice = req.body.cowPrice;

    if (!cowPrice) {
      throw new BadRequestError("Cow price is required for buyers");
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError();
    }

    if (budget < cowPrice) {
      throw new BadRequestError("Insufficient budget to buy the cow");
    }

    updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        budget: budget - cowPrice,
        $inc: { income: cowPrice },
      },
      { new: true }
    );

    transactionType = "Buy";
  } else if (role === "seller") {
    const cowPrice = req.body.cowPrice;

    if (!cowPrice) {
      throw new BadRequestError("Cow price is required for sellers");
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError();
    }

    if (income < cowPrice) {
      throw new BadRequestError("Insufficient income from previous sales");
    }

    updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        income: income - cowPrice,
      },
      { new: true }
    );

    transactionType = "Sell";
  } else {
    throw new BadRequestError("Invalid user role");
  }

  const transaction = {
    userId: req.params.id,
    type: transactionType,
    amount: req.body.cowPrice,
  };

  // Save the transaction to the database

  res.json(updatedUser);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new NotFoundError();
  }
  res.sendStatus(204);
});

export default router;
