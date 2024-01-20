import { UserService } from "../services/UserServices";
import { createTeamValidator } from "../validators/Team/CreateTeamValidator";

export async function create(req: Request, res: Response) {
  const { name, badge, city, foundedAt, province, homeField } =
    createTeamValidator.parse(req.body);

  // const userAlreadyhasTeam = await UserService.checkIfUserHasTeam(userId);

  // if (userAlreadyhasTeam) {
  //   throw new Error(`Somente pode ter uma equipa registada!`);
  // }

  // const teamAlreadyExists = await this.checkTeamByName(name);

  // if (teamAlreadyExists) {
  //   throw new Error(`O nome ${name} já está ser usado!`);
  // }
}
