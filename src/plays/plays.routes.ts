import { Router } from "express"

// Controllers
import { getPlays } from "./actions/get.action"
import { postPlay } from "./actions/post.action"
import { clusterize } from "./actions/clusterize.action"
import { getRecommend } from "./actions/get-recommend.action"
import { getByClusterId } from "./actions/get-by-cluster-Id.action"

const router = Router()

router.get("/author-works", getPlays)
router.post("/author-works", postPlay)
router.get("/cluster", clusterize)
router.get("/recommend/:id", getRecommend)
router.get("/clusterId/:clusterId", getByClusterId)

export default router
