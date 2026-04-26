import { isLoggedIn } from '../middlewares/authMiddleware.js'
import * as userValidation from '../controllers/validation/userValidation.js'
import { handleValidation } from '../middlewares/handlingValidationMiddleware.js'
import userController from '../controllers/userController.js'
import { checkEntityExists } from '../middlewares/entityMiddleware.js'
import { User } from '../models/models.js'

const loadFileRoutes = function (app) {
    // routes for user 
    app.route('/user/:userId')
        .get(
            checkEntityExists(User, 'userId'),    
            isLoggedIn,

        )
        .put()
        .delete()

    app.route('/user')
        .post()
        
    // routes for admin uses
    app.route('/users')
        .get()
        .post()
        .put(
            isLoggedIn,
            userValidation.update,
            handleValidation,
            userController.update
        )
        .delete()
}