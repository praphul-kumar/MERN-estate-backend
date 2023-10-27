import Listing from "../models/listing.model.js";

export const findAll = async () => {
  try {
    return await Listing.find({});
  } catch (error) {
    throw error;
  }
};

export const findOneById = async (id) => {
  try {
    return await Listing.findById(id);
  } catch (error) {
    throw error;
  }
};

export const createListing = async (data) => {
  try {
    return await Listing.create(data);
  } catch (error) {
    throw error;
  }
};

export const updateListing = async (id, data) => {
  try {
    return await Listing.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          description: data.description,
          address: data.address,
          regularPrice: data.regularPrice,
          discountedPrice: data.discountedPrice,
          type: data.type,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          furnished: data.furnished,
          parking: data.parking,
          offer: data.offer,
          imageUrls: data.imageUrls,
        },
      },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteListing = async (id) => {
  try {
    return await Listing.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
