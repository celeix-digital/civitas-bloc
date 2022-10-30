const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/admin/grant.controller.js')
const { categoryUpload } = require('../../../utils/upload')

router.route('/category/create').post(categoryUpload, controller.createCategory)
router.route('/category/edit').put(categoryUpload, controller.editCategory)
router.route('/category/delete/:categoryId').delete(controller.deleteCategory)
router.route('/category/get/:categoryId').get(controller.getCategory)
router.route('/category/list').get(controller.listCategories)

module.exports = router