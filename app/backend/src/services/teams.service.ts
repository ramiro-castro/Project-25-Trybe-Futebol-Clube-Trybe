import Team from '../database/models/teams.model';
import { TeamInterface } from '../interfaces/all.interfaces';

const TeamService = {
  async getAll(): Promise<TeamInterface[]> {
    const data = await Team.findAll();
    console.log(data);
    return data;
  },
  async getById(id: number): Promise<TeamInterface | null> {
    const data = await Team.findByPk(id);
    // console.log(data);
    return data;
  },
};

export default TeamService;
