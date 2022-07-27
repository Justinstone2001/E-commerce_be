const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tag_Data = await Tag.findAll({
      include: [
        Product, {
          model: Product,
          through: ProductTag
        }
      ],
    });
    res.status(200).json(tag_Data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag_Data = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag
      },
    })
    if (!tag_Data) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tag_Data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tag_Data = await Tag.create(req.body);
    res.status(200).json(tag_Data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tag_Data = await Tag.update(req.body, {
      where: {
      id: req.params.id
      },
    }
    );
    if (!tag_Data) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tag_Data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tag_Data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag_Data) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tag_Data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;