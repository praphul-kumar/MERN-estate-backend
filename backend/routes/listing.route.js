import express from 'express';
import { verifyUser } from '../middlewares/verifyUser.js';
import * as listingController from '../controllers/listing.controller.js';

const router = express.Router();

router.get('/', listingController.getAllListings);
router.post('/add', verifyUser, listingController.addListing);
router.post('/update/:id', verifyUser, listingController.updatelisting);

export default router;