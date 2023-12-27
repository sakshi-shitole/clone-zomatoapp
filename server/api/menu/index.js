import express from 'express';
import { MenuModel, ImageModel } from '../../database/allModels';


const Router = express.Router();

/**
 * Route     /list
 * Des       Get  menu based on a menu id
 * Params    _id
 * Access    Public
 * Method    Get
 */

Router.get('/list/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const menus = await MenuModel.findById(_id);

        if (!menus) {
            res.status(404).json({ error: "No menu found for this restaurant" })
        }
        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;