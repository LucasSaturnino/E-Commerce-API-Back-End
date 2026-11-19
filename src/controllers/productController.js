const Product = require('../models/Product');
const { Op } = require('sequelize');

// GET /v1/product/search - Listar/Buscar produtos com filtro e paginação
exports.searchProducts = async (req, res) => {
    try {
        const { limit = 12, page = 1, fields, match } = req.query;

        const where = {};
        if (match) {
            where[Op.or] = [
                { name: { [Op.like]: `%${match}%` } },
                { description: { [Op.like]: `%${match}%` } }
            ];
        }

        const attributes = fields ? fields.split(',') : undefined;
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
        const offset = (parsedPage - 1) * parsedLimit;

        const { count, rows } = await Product.findAndCountAll({
            where,
            attributes,
            limit: parsedLimit > 0 ? parsedLimit : undefined,
            offset: offset >= 0 ? offset : 0
        });

        return res.status(200).json({
            data: rows,
            total: count,
            limit: parsedLimit,
            page: parsedPage
        });
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar produtos' });
    }
};

// GET /v1/product/:id - Buscar produto por ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ message: 'Erro na requisição' });
    }
};

// POST /v1/product - Criar produto (Protegido por JWT)
exports.createProduct = async (req, res) => {
    try {
        const { enabled, name, slug, stock, description, price, price_with_discount } = req.body;

        if (!name || !slug || price === undefined) {
            return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
        }

        const product = await Product.create({
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount
        });

        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao criar produto' });
    }
};

// PUT /v1/product/:id - Atualizar produto (Protegido por JWT)
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        await product.update(req.body);
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao atualizar produto' });
    }
};

// DELETE /v1/product/:id - Excluir produto (Protegido por JWT)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        await product.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao deletar produto' });
    }
};