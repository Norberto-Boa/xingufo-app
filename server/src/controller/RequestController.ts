import { Request, Response } from "express";
import { CreateRequestValidator } from "../validators/Request/CreateRequestValidator";
import { RequestService } from "../services/RequestService";
import { TeamService } from "../services/TeamService";
import { SmsService } from "../services/SmsService";
import format from "../utlis/dateFormat";
import { UpdateRequestValidator } from "../validators/Request/UpdateRequestValidator";
import { sub } from "date-fns";
import { Status } from "@prisma/client";
import { GameService } from "../services/GameService";

export async function createRequest(req: Request, res: Response) {
  const { fromTeamId, gameDate, gameTime, receiverTeamId } =
    CreateRequestValidator.parse(req.body);

  const fromTeam = await TeamService.getTeamById(fromTeamId);
  const receiverTeam = await TeamService.getTeamById(receiverTeamId);

  if (!fromTeam || !receiverTeam) {
    return res.status(400).json({
      message: "Uma das equipes nao esta registada",
    });
  }

  const requestAlreadyExists =
    await RequestService.getRequestBySenderReceiverGameDate({
      fromTeamId,
      gameDate,
      receiverTeamId,
    });

  if (requestAlreadyExists) {
    await SmsService.send({
      message: `"\n \n \n \n" A equipe ${
        fromTeam.name
      } deseja desafiar-lhe no dia ${format(
        gameDate,
        "dd 'de' MMMM 'de' yyyy"
      )} pelas ${format(gameTime, "k':'mm 'periodo' BBBB")}!`,
      to: "+258" + receiverTeam.user.cellphone,
    });

    return res.status(201).json(requestAlreadyExists);
  }

  const newRequest = await RequestService.create({
    fromTeamId,
    receiverTeamId,
    gameDate,
    gameTime,
  });

  await SmsService.send({
    message: `"\n \n \n \n" A equipe ${
      fromTeam.name
    } deseja desafiar-lhe no dia ${format(
      gameDate,
      "dd 'de' MMMM 'de' yyyy"
    )} pelas ${format(gameTime, "k':'mm 'periodo' BBBB")}!`,
    to: "+258" + receiverTeam.user.cellphone,
  });

  return res.status(200).json(newRequest);
}

export async function updateRequest(
  req: Request,
  res: Response
): Promise<Response> {
  const { id, gameDate, gameTime } = UpdateRequestValidator.parse(req.body);

  const requestExists = await RequestService.getById(id);

  if (!requestExists) {
    return res.status(404).json({ message: "O desafio nao foi encontrado!" });
  }

  const updateRequest = await RequestService.update(id, { gameDate, gameTime });

  await SmsService.send({
    message: `"\n \n \n \n" A equipe ${
      requestExists.from.name
    } deseja alterar o desafio para o dia ${
      gameDate
        ? format(gameDate, "dd 'de' MMMM 'de' yyyy")
        : format(requestExists.gameDate, "dd 'de' MMMM 'de' yyyy")
    } pelas ${
      gameTime
        ? format(sub(gameTime, { hours: 2 }), "pp 'periodo' BBBB")
        : format(sub(requestExists.gameTime, { hours: 2 }), "pp 'periodo' BBBB")
    }!`,
    to: "+258" + updateRequest.receiver.user.cellphone,
  });

  return res.status(201).json(updateRequest);
}

export async function acceptRequest(
  req: Request,
  res: Response
): Promise<Response | never> {
  const { id, location } = UpdateRequestValidator.parse(req.body);
  const status = Status.ACCEPTED;

  const requestExists = await RequestService.getById(id);

  if (!requestExists) {
    return res.status(404).json({ message: "O desafio nao foi encontrado!" });
  }

  if (requestExists.status === Status.ACCEPTED) {
    return res.status(400).json({ message: "Desafio ja foi aceite!" });
  }

  const updateRequest = await RequestService.accept(id, { status });

  if (!location) {
    return res
      .status(400)
      .json({ message: "O desafio deve ter uma localização!" });
  }

  const createGame = await GameService.create({
    awayTeamId: updateRequest.receiverTeamId,
    homeTeamId: updateRequest.fromTeamId,
    gameDate: updateRequest.gameDate,
    gameTime: updateRequest.gameTime,
    location: location,
  });

  await SmsService.send({
    message: `"\n \n \n \n" A equipe ${
      requestExists.from.name
    }  aceita o desafio para o dia ${format(
      requestExists.gameDate,
      "dd 'de' MMMM 'de' yyyy"
    )} pelas ${format(
      sub(requestExists.gameTime, { hours: 2 }),
      "pp 'periodo' BBBB"
    )}!`,
    to: "+258" + updateRequest.from.user.cellphone,
  });

  return res.status(201).json({ request: updateRequest, game: createGame });
}
