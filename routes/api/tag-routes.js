const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  //find all tags
  const tags = await Tag.findAll({
    //inner join with produce
    //be sure to include its associated Product data
    include: [{ model: Product, through: ProductTag, as: 'all_tags' }]
  })
  console.log(tags);
  res.json(tags)

});

router.get('/:id', (req, res) => {
  //find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag, as: 'all_tags' }]
  }).then((tagData) => {

    res.json(tagData);
  });

});

router.post('/', async (req, res) => {
  //create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  //update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  //delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
