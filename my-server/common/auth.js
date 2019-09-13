var express = require('express');
var tokensService = require('../services/authService');
module.exports = {

    /**
     * 是否有 token，验证token验证是否可以访问
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isAllowAccess: async function (req, res, next) {
        var token = req.get('Authorization');
        var tokenRes = await tokensService.checkToken(token);
        if (!tokenRes.result) {
           return res.json(tokenRes);
        }
       return next();
    }
};