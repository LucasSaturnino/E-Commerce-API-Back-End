const Category = require('../models/Category');

// GET /v1/category/search - Listar/Buscar categorias
exports.searchCategories = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields, use_in_menu } = req.query;

    const where = {};
    if (use_in_menu !== undefined) {
      where.use_in_menu = use_in_menu === 'true' || use_in_menu === '1';
    }

    const attributes = fields ? fields.split(',') : undefined;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const offset = (parsedPage - 1) * parsedLimit;

    const { count, rows } = await Category.findAndCountAll({
      where,
      attributes,
      limit: parsedLimit > 0 ? parsedLimit : undefined,
      offset: parsedOffset >= 0 ? offset : 0
    });

    return res.status(200).json({
      data: rows,
      total: count,
      limit: parsedLimit,
      page: parsedPage
    });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao buscar categorias' });
  }
};

// GET /v1/category/:id - Buscar categoria por ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({ message: 'Erro na requisição' });
  }
};

// POST /v1/category - Criar categoria (Protegido por JWT)
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: 'Nome e slug são obrigatórios' });
    }

    const category = await Category.create({ name, slug, use_in_menu });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao criar categoria' });
  }
};

// PUT /v1/category/:id - Atualizar categoria (Protegido por JWT)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, use_in_menu } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await category.update({ name, slug, use_in_menu });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao atualizar categoria' });
  }
};

// DELETE /v1/category/:id - Excluir categoria (Protegido por JWT)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await category.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao deletar categoria' });
  }
};