import express from 'express';
import { UserModel } from '../../database/allModels';
import passport from "passport";

const Router = express.Router();

/**
 * Router   /
 * Des      Get authorized user data
 * Params   none
 * Access   Private
 * Method   GET
 */

Router.get('/', passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { email, fullname, phoneNumber, address } = req.user;
            return res.json({ user: { email, fullname, phoneNumber, address } });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

/**
* Router   /:_id
* Des      Get user data(for review system)
* Params   none
* Access   Public
* Method   GET
*/

Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);


        if (!getUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const { fullName } = getUser;
        return res.json({ user: { fullName } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
* Router   /update/:_id
* Des      UPDATE USER DATA
* Params   none
* Access   private
* Method   PUT
*/

Router.put('/update/:_Id', passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { _Id } = req.params;
            const { userData } = req.body;

            // Task: Validate User Data

            userData.password = undefined;

            const updateUserData = await UserModel.findByIdAndUpdate(
                _Id, {
                $set: userData,
            }, {
                new: true,
            });

            return res.json({ user: updateUserData });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })

export default Router;