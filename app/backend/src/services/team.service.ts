import Team from '../database/models/team.model';
import { TeamInterface } from '../interfaces/all.interfaces';

const TeamService = {
  async getAll(): Promise<TeamInterface[]> {
    const data = await Team.findAll();
    console.log(data);
    return data;
  },
};

export default TeamService;
