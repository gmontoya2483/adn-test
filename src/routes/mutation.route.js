import {Router} from "express";
import {validateNewDna} from "../middlewares/mutations.validation.middleware.js";
import { processMutationRecord} from "../services/mutation.service.js";

const router = Router();


/**
 * This endPoint receives through the body and dna array and it responds:
 * HTTP 200-OK is case is mutated
 * HTTP 403-Forbidden in case no mutation was detected
 * HTTP 400-Bad Request is case the dna array is not in the correct format (i.e is not NxN array or it has invalid characters)
 */
router.post('/',[validateNewDna], async (req, res) => {
    const {dna: reqDna} = req.body;
    const {ok, hasMutation: isMutated, dna} = await processMutationRecord(reqDna);

    // Check if the request was processed correctly and stored into the DB
    if (!ok) {
        return res.status(500).json()
    }

    // check if the request was OK
    if(dna.length===0) {
        return res.status(400).json();
    }

    // Set the response code
    const respCode = (isMutated)? 200 : 403;

    return res.status(respCode).json({
        hasMutation: isMutated,
        dna
    });

});


export default router;
