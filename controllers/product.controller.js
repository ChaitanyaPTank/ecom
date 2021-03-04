const debug = require("debug");
const controllerDebugger = debug("app:productController");
const Product = require("../model/products");

const isProduct = async (id) => {
    try {
        const product = await Product.findAll({
            where: {
                id
            }
        });

        return product;
    }
    catch (err) {
        return res.status(401).send(err.message);
    }
};

// this will change product in db
exports.changeProduct = async (req, res, next) => {

    try {
        // if product exists then find index of the same and change
        // in main db and return the product
        controllerDebugger("Changing product...")

        const product = await isProduct(parseInt(req.params.id));
        if (!product) return res.status(400).send("Bad request...");

        await Product.update({ product: req.body.product }, {
            where: {
                id: parseInt(req.params.id)
            }
        });

        controllerDebugger("Changed product details successfully...");

        // this is fetching from db again but there should be better way
        const newProduct = await isProduct(parseInt(req.params.id));
        return res.status(200).send(newProduct);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}

// send all products
exports.sendProduct = async (req, res, next) => {

    // fetching all products
    await Product.sync();
    const products = await Product.findAll();

    if (!products) return res.status(400).send("Internal server error...");

    res.status(200).send(products);
    next();
}

// validating if product exists
exports.productExists = (req, res, next) => {
    // find product first
    controllerDebugger("Searching product...");
    const id = parseInt(req.params.id);

    const product = isProduct(id);

    if (!product) return res.status(400).send("Product not found");

    console.log("going to next...");
    next();
}

exports.removeProduct = async (req, res, next) => {
    //removes product
    try {
        controllerDebugger("Removing product...");
        const product = await isProduct(parseInt(req.params.id));
        if(!product) return res.status(400).send("Bad request...");
    
        await Product.destroy({
            where: {
                id : parseInt(req.params.id)
            }
        });

        controllerDebugger(product);
        return res.status(200).send(product);
    }
    catch(err){
        return res.status(404).send(err.message);
    }
}