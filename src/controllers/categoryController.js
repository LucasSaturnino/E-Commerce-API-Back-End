const Category = require('../models/Category');

// GET /v1/category/search - Listar/Buscar categorias
exports.searchCategories = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields, use_in_menu } = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    if (
      Number.isNaN(parsedLimit) ||
      (parsedLimit < 1 && parsedLimit !== -1) ||
      Number.isNaN(parsedPage) ||
      parsedPage < 1
    ) {
      return res.status(400).json({ message: 'Parâmetros de paginação inválidos' });
    }

    const where = {};
    if (use_in_menu !== undefined) {
      if (use_in_menu === 'true' || use_in_menu === '1' || use_in_menu === true) {
        where.use_in_menu = true;
      } else if (use_in_menu === 'false' || use_in_menu === '0' || use_in_menu === false) {
        where.use_in_menu = false;
      } else {
        return res.status(400).json({ message: 'Valor inválido para use_in_menu' });
      }
    }

    const attributes = fields
      ? fields.split(',').map((field) => field.trim()).filter(Boolean)
      : undefined;

    const queryOptions = {
      where,
      ...(attributes ? { attributes } : {})
    };

    if (parsedLimit !== -1) {
      queryOptions.limit = parsedLimit;
      queryOptions.offset = (parsedPage - 1) * parsedLimit;
    }

    const { count, rows } = await Category.findAndCountAll(queryOptions);

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
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'ID inválido' });
    }

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

    const category = await Category.create({
      name,
      slug,
      ...(use_in_menu !== undefined ? { use_in_menu } : {})
    });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao criar categoria' });
  }
};

// PUT /v1/category/:id - Atualizar categoria (Protegido por JWT)
exports.updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const { name, slug, use_in_menu } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await category.update({
      ...(name !== undefined ? { name } : {}),
      ...(slug !== undefined ? { slug } : {}),
      ...(use_in_menu !== undefined ? { use_in_menu } : {})
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao atualizar categoria' });
  }
};

// DELETE /v1/category/:id - Excluir categoria (Protegido por JWT)
exports.deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'ID inválido' });
    }

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