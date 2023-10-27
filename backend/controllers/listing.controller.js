import * as listingService from '../services/listing.service.js';
import { errorHandler } from '../utils/error.js';
import { logger } from '../utils/logger.js';

const logBaseName = '[ListingController]';

export const getAllListings = async (req, res, next) => {
    try {
        logger.info(`${logBaseName}[getAllListings]Fetching All Listing.`);
        const listings = await listingService.findAll();

        if (listings != null) {
            logger.info(`${logBaseName}[getAllListings] Responding to User(${req.user.id}) with ${listings.length} Listings`);

            res.status(200).json({
                success: true,
                message: `Found ${listings.length} Listings`,
                listings: listings
            });

        } else {
            logger.info(`${logBaseName}[getAllListings] Unable to find Listing.`);
            throw errorHandler(500, 'Unable to found listings!!');
        }

    } catch (error) {
        next(error);
    }
}

export const addListing = async (req, res, next) => {
    try {
        logger.info(`${logBaseName}[addListing] Creating Listting for User(${req.user.id}).`);

        const data = { 
            name: req.body.name, 
            description: req.body.description, 
            address: req.body.address, 
            regularPrice: req.body.regularPrice, 
            discountedPrice: req.body.discountedPrice, 
            type: req.body.type, 
            bedrooms: req.body.bedrooms, 
            bathrooms: req.body.bathrooms, 
            furnished: req.body.furnished, 
            parking: req.body.parking, 
            offer: req.body.offer, 
            imageUrls: req.body.imageUrls,
            userRef: req.user.id,
        };

        const listing = await listingService.createListing(data);

        if (listing) {
            logger.info(`${logBaseName}[addListing] Listing created for User(${req.user.id})`);

            res.status(200).json({
                success: true,
                message: "Listing Addedd Successfully.",
                listing: listing
            });
        } else {
            logger.error(`${logBaseName}[addListing] Unable to create Listing.`);

            throw errorHandler(500, "Unable to create Listing!!"); 
        }
    } catch (error) {
        next(error);
    }
}

export const updatelisting = async (req, res, next) => {
    try {
        logger.info(`${logBaseName}[updateListing] Updating Listing(${req.params.id}) by User(${req.user.id}).`);

        const data = { 
            name: req.body.name, 
            description: req.body.description, 
            address: req.body.address, 
            regularPrice: req.body.regularPrice, 
            discountedPrice: req.body.discountedPrice, 
            type: req.body.type, 
            bedrooms: req.body.bedrooms, 
            bathrooms: req.body.bathrooms, 
            furnished: req.body.furnished, 
            parking: req.body.parking, 
            offer: req.body.offer, 
            imageUrls: req.body.imageUrls
        };

        const updatedListing = await listingService.updateListing(req.params.id, data);

        if (updatedListing != null) {
            logger.info(`${logBaseName}[updateListing] Updated Listing(${req.params.id}) by User(${req.user.id}).`);

            res.status(200).json({
                success: true,
                message: "Listing Updated Successfully!!",
                listing: updatedListing
            });
            
        } else {
            logger.error(`${logBaseName}[updateListing] Failed to Update Listing(${req.params.id}) by User(${req.user.id}).`);

            throw errorHandler(500, 'Unable to update listing!!');
        }

    } catch(error) {
        next(error);
    }
}