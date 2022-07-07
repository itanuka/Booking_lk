const express = require('express')
const router = express.Router();

const { 
    newOrder, 
    getSingleOrder, 
    allOrders, 
    myOrders,
    updateOrderUser,
    getSingleOrderAdmin,
    updateOrderAdmin, 
    deleteOrderUser,
    deleteOrderAdmin 
} = require('../controllers/orderControllers')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')



//logged in user-------------------------------------------------

//create new order
router.route('/order/new').post(isAuthenticatedUser,newOrder);

//user update order
router.route('/order/:id').put(isAuthenticatedUser,updateOrderUser);
// router.route('/order/:id').put(updateOrderUser);

//get all users orders
//router.route('/orders').get(allOrders); //this should be replaced with below code
// router.route('/orders/me').get(myOrders)
router.route('/orders/me').get(isAuthenticatedUser,myOrders)

//get users single order by id
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
// router.route('/order/:id').get(getSingleOrder);

//user delete order from id
router.route('/order/:id').delete(isAuthenticatedUser,deleteOrderUser);
// router.route('/order/:id').delete(deleteOrderUser);






//admin----------------------------------------------------------

//get all orders
router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
// router.route('/admin/orders/').get(allOrders);

//update order
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrderAdmin);
// router.route('/admin/order/:id').put(updateOrderAdmin);

//get single order details
router.route('/admin/order/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingleOrderAdmin);
// router.route('/admin/order/:id').get(getSingleOrderAdmin);

//delete order
//router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrderAdmin);



module.exports = router;