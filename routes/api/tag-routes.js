const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  //WORKS: find all tags
  const tags = await Tag.findAll({
    //inner join with produce
    //be sure to include its associated Product data
    //TODO: same????
    include: [{ model: Product, through: ProductTag, as: 'all_tags' }]
  })
  console.log(tags);
  res.json(tags)

});

router.get('/:id', (req, res) => {
  // TODO: associated product data
  //find a single tag by its `id`
  Tag.findByPk(req.params.id).then((tagData) => {
    //include: [{ model: Product, through: ProductTag, as: 'all_tags' }]
    res.json(tagData);
  });
  //be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // WORKS: create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // TODO: update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // WORKS: delete on tag by its `id` value
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
