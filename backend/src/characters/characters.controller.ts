import { Request, Response, NextFunction } from "express";
import { character } from "../interfaces/interfaces";
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./characters.service");

interface req extends Request {
  user: number;
}

//Error handling
async function doesCharacterExist(req: req, res: Response, next: NextFunction) {
  const character_id = Number(req.params.characterId);
  const findCharacter: character = await service.read(req.user, character_id);

  if (findCharacter !== null) {
    res.locals.character = findCharacter;
    return next();
  }
  next({
    status: 404,
    message: `Character id, ${character_id}, does not exist.`,
  });
}

function isDataValid(req: Request, res: Response, next: NextFunction) {
  const { data: { character_name = "" } = {} } = req.body;
  if (!character_name) {
    return next({
      status: 400,
      message: `Character Name is undefined`,
    });
  }
  next();
}

//CRUD Functions
async function list(req: req, res: Response) {
  res.json({ data: await service.list(req.user) });
}

async function read(req: req, res: Response) {
  res.json({ data: res.locals.character });
}

async function create(req: req, res: Response) {
  const data = await service.create(req.user, req.body.data);
  res.status(201).json({ data });
}

async function update(req: req, res: Response) {
  const { character_id } = res.locals.character;
  const data = await service.update(character_id, req.body.data);

  res.json({ data });
}

async function destroy(req: req, res: Response) {
  await service.delete(res.locals.character.character_id);
  res.sendStatus(204);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(doesCharacterExist), asyncErrorBoundary(read)],
  create: [isDataValid, asyncErrorBoundary(create)],
  update: [
    asyncErrorBoundary(doesCharacterExist),
    isDataValid,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(doesCharacterExist), asyncErrorBoundary(destroy)],
};
export {};
