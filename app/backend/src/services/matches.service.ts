import Matches from '../database/models/matches.model';
import { MatchesInterface } from '../interfaces/all.interfaces';
// import TeamService from './teams.service';
import Team from '../database/models/teams.model';

const MatchesService = {

  async getAll(inProgress: unknown): Promise<MatchesInterface[]> {
    const where = inProgress !== undefined ? { inProgress } : {};
    const data = await Matches.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where,
    });

    return data;
  },

  async getByIdFinish(id: unknown) {
    const where = id !== undefined ? { id } : {};
    await Matches.update(
      { inProgress: false },
      { where },
    );

    // const data = await Matches.findAll({
    //   include: [
    //     { model: Team, as: 'homeTeam', attributes: ['teamName'] },
    //     { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    //   ],
    //   where,
    // });

    // data.inProgress = false;

    return { message: 'Finished' };
  },

  async getByIdUpdateGoals(id: unknown, updHomeTeamGoals: unknown, upAwayTeamGoals: unknown) {
    const where = id !== undefined ? { id } : {};
    await Matches.update(
      { homeTeamGoals: updHomeTeamGoals,
        awayTeamGoals: upAwayTeamGoals },
      { where },
    );

    const data = await Matches.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where,
    });

    // data.inProgress = false;

    return data;
  },

  async insert(dataInsert: MatchesInterface) {
    // const where = id !== undefined ? { id } : {};
    const data = await Matches.create(
      {
        homeTeamId: dataInsert.homeTeamId,
        awayTeamId: dataInsert.awayTeamId,
        homeTeamGoals: dataInsert.homeTeamGoals,
        awayTeamGoals: dataInsert.awayTeamGoals,
        inProgress: dataInsert.inProgress,
      },
    );

    // const data = await Matches.findAll({
    //   include: [
    //     { model: Team, as: 'homeTeam', attributes: ['teamName'] },
    //     { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    //   ],
    // //   where,
    // });

    // data.inProgress = false;

    return data;
  },
};

// Fonte1 uso do include: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/94e113d7-6a86-4536-a1d3-08f55f557811/lesson/cf69bd1a-0095-44f0-be02-7cd9ddad0ac2
// Fonte2 uso do include metodo Eager Loading: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/94e113d7-6a86-4536-a1d3-08f55f557811/lesson/8f287e0e-5c70-4df4-be95-7c631ef2bf57

export default MatchesService;
