import {Router} from "express";
import {validateNewDna} from "../middlewares/mutations.validation.middleware.js";
import {mutationStats, processMutationRecord} from "../services/mutation.service.js";

const router = Router();

router.get('/', [], async (req, res) => {

    const {ok, ...stats} = await mutationStats();

    if(!ok)  return res.status(500).json();

    return res.status(200).json(stats);

});





export default router;
