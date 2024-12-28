const express = require('express');

const router = express.Router(); 

const todoController = require('../controllers/todoController')

router.get('/',todoController.getAll)
router.get('/:id',todoController.getAllById);
router.post('/',todoController.createNew);
router.put('/:id',todoController.updateById);
router.delete('/:id',todoController.deleteById)

module.exports = router;
