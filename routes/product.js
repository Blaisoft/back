const express=require('express')
const router=express.Router()

//import controller
const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch
}=require('../controllers/product')
const {requireSignin,isAuth,isAdmin}=require('../Controllers/auth')
const {userById}=require('../Controllers/user')

//connect controller to route

router.post(
    '/product/create/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    create
)
router.get('/product/:productId',read)
router.delete(
    '/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
)

router.put(
    '/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
)

router.get('/products',list)
router.get("/products/search", listSearch);
router.get('/products/related/:productId',listRelated)
router.get('/products/categories',listCategories)
router.post("/products/by/search", listBySearch);
router.get('/product/photo/:productId',photo)
router.param('userId',userById)
router.param('productId',productById)





module.exports=router