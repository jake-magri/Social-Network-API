import { Router } from 'express';
const router = Router();
import { getVideos, getSingleVideo, createVideo, updateVideo, deleteVideo, addVideoResponse, removeVideoResponse } from '../../controllers/videoController.js';
// create thought / video route works
// read thought / video route works
// update thought route works
// delete thought route works
router.route('/').get(getVideos).post(createVideo);
// /api/videos/:videoId
router
    .route('/:videoId')
    .post(createVideo)
    .get(getSingleVideo)
    .put(updateVideo)
    .delete(deleteVideo);
// create and delete reactions routes work
// /api/videos/:videoId/responses
router.route('/:videoId/responses').post(addVideoResponse);
// /api/videos/:videoId/responses/:responseId
router.route('/:videoId/responses/:responseId').delete(removeVideoResponse);
export default router;
