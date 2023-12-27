import express from 'express';

import { RestaurantModel } from '../../database/allModels';

const Router = express.Router();

/**
 * Router   /
 * Des      Create a new restaurant
 * Params   none
 * Access   Public
 * Method   POST
 */
//Homework

/**
 * Router   /
 * Des      Get all the restaurants based on city
 * Params   none
 * Access   Public
 * Method   GET
 */

Router.get('/', async (req, res) => {
    try {
        //http://localhost:4000/restaurant/?city=ncr
        const { city } = res.query;
        const restaurants = await RestaurantModel.find({ city });
        if (restaurants.length === 0) {
            return res.json({ error: "No restaurant found in the city." });
        }
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Router   /:_id
 * Des      Get individual the restaurants based on id
 * Params   _id
 * Access   Public
 * Method   GET
 */

Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findById(_id);

        if (!restaurants) {
            return res.status(400).json({ error: "Restaurant not found." })
        }
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Router   /search/:searchString
 * Des      Get restaurants details based on searchstring
 * Params   none
 * Access   Public
 * Method   GET
 */

Router.get('search/:searchString', async (req, res) => {

    /**
     * searchString = Raj
     * results = {
     *  RajHotel
     *  RajRow
     *  RonRaj
     *  raJRow
     * }
     */

    try {
        const { searchString } = req.params;
        const restaurants = await RestaurantModel.find({
            Name: { $regex: searchString, $options: "i" },
        });
        if (!restaurants) {
            return res.status(404).json({ error: `No restaurant matched with ${searchString}` });
        }

        return res.status(500).json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;