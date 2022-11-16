const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
  });

res.json(categories)
} catch (err) {
  res.status(500).json(err);
}
});

// find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id,{
      include: [Product],
    });
    if(!categories) {
      res.status(404).json({ message: 'No category exists with that id'});
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try{
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const categories = await Category.update(req.body,{
      where: {
        id:req.params.id
      }
    });
  res.status(200).json(categories);
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  try {
    const categories = await Category.destroy({
      where:  {
        id:req.params.id
      }
    });
    if (!categories) {
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }

    res.status(200).json(categories);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
