import { Router, Request, Response } from 'express';
import axios from 'axios';

// bring in json repo data
import jsonRepoData from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // bring in API repo data
  const response = await axios.get(
    'https://api.github.com/users/silverorange/repos'
  );

  // combine both repo data sources
  const allRepos = [...jsonRepoData, ...response.data];

  // filter repos by respository.fork
  const filteredRepos = allRepos.filter((repo) => repo.fork === false);

  // return filtered repo data
  res.json(filteredRepos);
});
