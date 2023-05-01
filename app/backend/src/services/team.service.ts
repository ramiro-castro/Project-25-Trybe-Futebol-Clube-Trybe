import Team from '../database/models/team.model';
import { TeamInterface } from '../interfaces/all.interfaces';

const TeamService = {
  async getAll(): Promise<TeamInterface[]> {
    const data = await Team.findAll();
    console.log(data);
    return data;
  },
  async getById(id: string): Promise<TeamInterface | null> {
    const data = await Team.findByPk(id);
    // console.log(data);
    return data?.get({ plain: true });
  },
};

export default TeamService;
