import {NextApiRequest, NextApiResponse} from "next";
import {Match, MatchModel} from "../../models";
import all from "../../middlewares/all";
import nc from "next-connect";


async function getMatches(req: NextApiRequest, res: NextApiResponse) {
  let matches = await MatchModel.find();
  res.send(matches);
}


async function addMatch(req: NextApiRequest, res: NextApiResponse) {
  let data: Match = req.body;

  if (data.teamB === data.teamA) {
    return res.status(400).send({
      message: "match should be between different teams"
    });
  }

  let wallet = await MatchModel.create({
    date: new Date(new Date(data.date).getDate()),
    city: data.city,
    teamA: data.teamA,
    teamB: data.teamB,
  });

  res.status(201).send(wallet);
}


export default nc<NextApiRequest, NextApiResponse>()
  .use(all)
  .get(getMatches)
  .post(addMatch);
