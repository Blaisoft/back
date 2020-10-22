const express = require('express');
const router = express.Router();
const {requireSignin,isAuth,isAdmin}=require('../Controllers/auth')
const {userById,addOrderToUserHistory}=require('../Controllers/user')
const {
    create,
    listOrders,
    getStatusValues,
    updateOrderStatus,
    orderById
}=require('../Controllers/order')

const {descreaseQuantity}=require('../Controllers/product')



router.post(
    '/order/create/:user Id',
    requireSignin,
    isAuth,
    addOrderToUserHistory,
    descreaseQuantity,
    create
)
router.get('/order/list/:userId',requireSignin,listOrders)
router.get(
    '/order/status-values/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    getStatusValues
)

router.put(
    '/order/:orderId/status/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
)


router.param('userId',userById)
router.param('orderId',orderById)


module.exports = router;
