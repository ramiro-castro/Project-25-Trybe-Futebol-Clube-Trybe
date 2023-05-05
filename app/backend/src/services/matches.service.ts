import Matches from '../database/models/matches.model';
import { MatchesInterface } from '../interfaces/all.interfaces';
// import TeamService from './teams.service';
import Team from '../database/models/teams.model';

const MatchesService = {

  async getAll(): Promise<MatchesInterface[]> {
    const data = await Matches.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return data;
  },

};

// Fonte1 uso do include: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/94e113d7-6a86-4536-a1d3-08f55f557811/lesson/cf69bd1a-0095-44f0-be02-7cd9ddad0ac2
// Fonte2 uso do include metodo Eager Loading: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/94e113d7-6a86-4536-a1d3-08f55f557811/lesson/8f287e0e-5c70-4df4-be95-7c631ef2bf57

export default MatchesService;
