import express from 'express';

import { FoodModel } from '../../database/allModels';

const Router = express.Router();

/**
 * Router   /:_id
 * Des      Create new food id
 * Params   none
 * Access   Public
 * Method   POST
 */
//Homework


/**
 * Router   /:_id
 * Des      Get food based on id
 * Params   _id
 * Access   Public
 * Method   Get
 */

Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const food = FoodModel.findById(_id);
        return res.json({ food });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Router   /r/:_id
 * Des      Get all food based on particular restaurant
 * Params   _id
 * Access   Public
 * Method   Get
 */

Router.get('/r/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({
            restaurant: _id,
        });
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Router   /c/:category
 * Des      Get all food based on particular category
 * Params   category
 * Access   Public
 * Method   GET
 */

Router.get('/c/:category', async (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({
            category: { $regex: category, $options: "i" },
        });

        if (!foods) return res.status(404).json({ error: `No food matched with ${category}` });
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;