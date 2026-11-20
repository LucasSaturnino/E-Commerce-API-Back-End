const Product = require('../models/Product');
const { Op } = require('sequelize');

// GET /v1/product/search - Listar/Buscar produtos com filtro e paginação
exports.searchProducts = async (req, res) => {
    try {
        const {
            limit = 12,
            page = 1,
            fields,
            match,
            category_ids,
            'price-range': priceRange
        } = req.query;

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

        if (match) {
            where[Op.or] = [
                { name: { [Op.like]: `%${match}%` } },
                { description: { [Op.like]: `%${match}%` } }
            ];
        }

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            if (!Number.isNaN(minPrice) && !Number.isNaN(maxPrice)) {
                where.price = { [Op.between]: [minPrice, maxPrice] };
            } else {
                return res.status(400).json({ message: 'Formato inválido para price-range' });
            }
        }

        const attributes = fields
            ? fields.split(',').map((f) => f.trim()).filter(Boolean)
            : undefined;

        const queryOptions = {
            where,
            ...(attributes ? { attributes } : {})
        };

        if (parsedLimit !== -1) {
            queryOptions.limit = parsedLimit;
            queryOptions.offset = (parsedPage - 1) * parsedLimit;
        }

        // TODO: adicionar include/filtro para category_ids e option[...] conforme suas associações no Sequelize
        if (category_ids) {
            // Ex.: filtrar por IDs de categoria associados ao produto
        }

        const { count, rows } = await Product.findAndCountAll(queryOptions);

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
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

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
        const {
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount,
            category_ids,
            images,
            options
        } = req.body;

        if (
            !name ||
            !slug ||
            price === undefined ||
            price === null ||
            price_with_discount === undefined ||
            price_with_discount === null
        ) {
            return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
        }

        const product = await Product.create({
            ...(enabled !== undefined ? { enabled } : {}),
            name,
            slug,
            ...(stock !== undefined ? { stock } : {}),
            ...(description !== undefined ? { description } : {}),
            price,
            price_with_discount
        });

        // TODO: associar category_ids, criar images e options se os models/associações já estiverem prontos
        void category_ids;
        void images;
        void options;

        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao criar produto' });
    }
};

// PUT /v1/product/:id - Atualizar produto (Protegido por JWT)
exports.updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const {
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount,
            category_ids,
            images,
            options
        } = req.body;

        await product.update({
            ...(enabled !== undefined ? { enabled } : {}),
            ...(name !== undefined ? { name } : {}),
            ...(slug !== undefined ? { slug } : {}),
            ...(stock !== undefined ? { stock } : {}),
            ...(description !== undefined ? { description } : {}),
            ...(price !== undefined ? { price } : {}),
            ...(price_with_discount !== undefined ? { price_with_discount } : {})
        });

        // TODO: atualizar associações de categorias, imagens e opções conforme o modelo do projeto
        void category_ids;
        void images;
        void options;

        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao atualizar produto' });
    }
};

// DELETE /v1/product/:id - Excluir produto (Protegido por JWT)
exports.deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

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