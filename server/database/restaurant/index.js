import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema(
    {
        name: { type: String, requierd: true },
        city: { type: String, requierd: true },
        address: { type: String, requierd: true },
        mapLocation: { type: String, requierd: true },
        cuisine: [String],
        restaurantTimmings: String,
        contactNumber: Number,
        website: String,
        popularDishes: [String],
        averageCost: Number,
        amenties: [String],
        menuImages: {
            type: mongoose.Types.ObjectId,
            ref: "images",
        },
        menu: {
            type: mongoose.Types.ObjectId,
            ref: "menus",
        },
        reviews: [{
            type: mongoose.Types.ObjectId,
            ref: "reviews",
        }],
        photos: {
            type: mongoose.Types.ObjectId,
            ref: "images",
        },
    },

    {
        timestamps: true
    })

export const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);
