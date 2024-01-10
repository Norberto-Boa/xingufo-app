import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/userServices";
import { UserDTO } from "../@types/User";

export async function register(
  req: FastifyRequest<{ Body: UserDTO }>,
  reply: FastifyReply
) {
  const userAlreadyExists = await UserService.existByEmailOrCellphone(
    req.body.email,
    req.body.cellphone
  );

  if (userAlreadyExists) {
    reply.code(403).send({ message: "Credentials already in use" });
  }

  await UserService.createUser({
    name: req.body.name,
    email: req.body.email,
    cellphone: req.body.cellphone,
    password: req.body.password,
  });

  return reply.code(201).send({ message: "User sucessfully created" });
}
