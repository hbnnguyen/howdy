import 'express-async-errors';

import express from 'express';
import { prisma } from '../app';
import { ensureCorrectUser, ensureLoggedIn } from '../middleware/auth';
import { NotFoundError } from '../expressError';
import { userToUserOutput } from '../user';
import { asyncFilter } from '../helpers/asyncFilter';

const router = express.Router();

//get messages from chat id
router.get("/:id", ensureCorrectUser, async function (req, res, next) {
  const chat
})

export { router as messageRoutes };