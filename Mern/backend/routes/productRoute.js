const express  = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const router = express.Router();

router.get('/product', getAllProducts)

router.post('/product/new',isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.put('/product/:id',isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
router.delete('/product/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
router.get('/product/:id',getProductDetails)

module.exports = router