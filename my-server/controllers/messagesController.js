var express = require('express');
var messagesService = require('../services/messagesService');
module.exports = {

    /**
     * 获取1:1Liao 天记录
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getListBySingleChat: async (req, res, next) => {
        if (req.query && req.query.userId && req.query.toUserId) {
            var r = await messagesService.getListBySingleChat(req.query.userId, req.query.toUserId);
            res.json(r);
        }
        else {
            res.json({ result: false, message: 'no parameters' });
        }
    },


    /**
     * 添加信息
     */
    add: async (req, res, next) => {
        if (req.body && req.body.userId && req.body.toUserId && req.body.message) {
            var r = await messagesService.add(req.body);
            if (!r.result) {
                return res.json(r);
            }
            res.json({ result: true, message: 'add success' });
        }
        else {
            res.json({ result: false, message: 'no parameters' });
        }
    }

};