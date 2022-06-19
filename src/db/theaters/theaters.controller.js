const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function list (req, res) {
    const data = await theatersService.list();
    res.json({data: data})
}

module.exports = {
    list
}