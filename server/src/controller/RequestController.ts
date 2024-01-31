import { Request, Response } from "express";
import { CreateRequestValidator } from "../validators/Request/CreateRequestValidator";
import { RequestService } from "../services/RequestService";
import { TeamService } from "../services/TeamService";
import { SmsService } from "../services/SmsService";
import format from "../utlis/dateFormat";

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

    return res.status(201).json({ requestAlreadyExists });
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

  return res.status(200).json({ newRequest });
}
