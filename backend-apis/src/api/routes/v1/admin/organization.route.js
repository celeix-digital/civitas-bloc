const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/admin/organization.controller')
const { categoryUpload } = require('../../../utils/upload')

router.route('/type/create').post(categoryUpload,controller.createType)
router.route('/type/edit').put(categoryUpload, controller.editType)
router.route('/type/delete/:typeId').delete(controller.deleteType)
router.route('/type/get/:typeId').get(controller.getType)
router.route('/type/list').get(controller.listTypes)

module.exports = router