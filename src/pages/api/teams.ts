import {NextApiRequest, NextApiResponse} from "next";
import all from "../../middlewares/all";
import nc from "next-connect";


async function getTeams(req: NextApiRequest, res: NextApiResponse) {
  res.send([
    "Karachi Kings", "Multan Sultans", "Peshawar Zalmi", "Lahore Qalanders", "Islamabad United", "Quetta Gladiators"
  ]);
}


export default nc<NextApiRequest, NextApiResponse>()
  .use(all)
  .get(getTeams);
