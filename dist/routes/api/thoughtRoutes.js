import { Router } from 'express';
const router = Router();
import { getVideos, getSingleVideo, createVideo, updateVideo, deleteVideo, addVideoResponse, removeVideoResponse } from '../../controllers/videoController.js';
// user get route works
// user create route
router.route('/').get(getVideos).post(createVideo);
// /api/videos/:videoId
router
    .route('/:videoId')
    .post(createVideo)
    .get(getSingleVideo)
    .put(updateVideo)
    .delete(deleteVideo);
// /api/videos/:videoId/responses
router.route('/:videoId/responses').post(addVideoResponse);
// /api/videos/:videoId/responses/:responseId
router.route('/:videoId/responses/:responseId').delete(removeVideoResponse);
export default router;
