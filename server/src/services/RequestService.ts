import { Request } from "@prisma/client";
import { RequestDTO } from "../@types/Request";
import { prismaClient } from "../prisma/client";

export class RequestService {
  /**
   * Function that creates a new Request
   *
   * @param RequestDTO mixed Request
   * @return Request | null
   */
  public static async create({
    fromTeamId,
    receiverTeamId,
    gameDate,
    gameTime,
  }: RequestDTO): Promise<Request | null> {
    return await prismaClient.request.create({
      data: {
        fromTeamId,
        receiverTeamId,
        gameDate,
        gameTime,
      },
    });
  }

  public static async getById(id: number) {
    return await prismaClient.request.findFirst({
      where: {
        id,
      },
      include: {
        from: true,
      },
    });
  }

  /**
   * Function that gets the Request by the sender and date
   * @param fromTeamId
   * @param gameDate
   * @param receiverTeamId
   * @returns
   */
  public static async getRequestBySenderReceiverGameDate({
    fromTeamId,
    gameDate,
    receiverTeamId,
  }: Pick<
    Request,
    "fromTeamId" | "gameDate" | "receiverTeamId"
  >): Promise<Request | null> {
    return await prismaClient.request.findFirst({
      where: {
        AND: [
          {
            fromTeamId,
          },
          {
            receiverTeamId,
          },
          {
            gameDate,
          },
        ],
      },
    });
  }

  public static async update(
    id: number,
    { gameDate, gameTime }: Partial<Pick<Request, "gameDate" | "gameTime">>
  ) {
    return await prismaClient.request.update({
      where: {
        id,
      },
      data: {
        gameDate,
        gameTime,
      },
      include: {
        receiver: {
          include: {
            user: {
              select: {
                cellphone: true,
              },
            },
          },
        },
      },
    });
  }
}
