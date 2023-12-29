import { Router } from 'express'


// Controllers
import { getPlays } from './actions/get.action'
import { postPlay } from './actions/post.action'

const router = Router()

router.get('/author-works', getPlays)
router.post('/author-works', postPlay)

export default router
