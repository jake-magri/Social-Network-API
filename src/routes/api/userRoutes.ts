import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, createFriend, deleteFriend } from '../../controllers/userController.js';

// /api/users
// user get route works
// user create route
router.route('/').get(getUsers).post(createUser)
// TODO: User update route
.put(updateUser)
// TODO: User delete route
.delete(deleteUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// TODO: create and delete friend routes


export default router;
