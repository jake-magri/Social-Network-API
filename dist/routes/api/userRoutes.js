import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, createFriend, /*  deleteFriend */ } from '../../controllers/userController.js';
// /api/users
// user get route works
// user create route
router.route('/').get(getUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getSingleUser)
    // TODO: User update route
    // update route works
    .put(updateUser)
    // TODO: User delete route
    // user delete routes work
    .delete(deleteUser);
// TODO: create and delete friend routes
router.route('/friends/:userId')
    .post(createFriend);
export default router;
