import { Router } from "express"

// Controllers
import { getPlays } from "./actions/get.action"
import { postPlay } from "./actions/post.action"
import { clusterize } from "./actions/clusterize.action"
import { recommend } from "./actions/get-recommend.action"
const router = Router()

router.get("/author-works", getPlays)
router.post("/author-works", postPlay)
router.get("/cluster", clusterize)
router.get("/recommend/:id", recommend)

export default router
