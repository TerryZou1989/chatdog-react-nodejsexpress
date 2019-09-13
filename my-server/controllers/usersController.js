var express = require('express');
var usersService = require('../services/usersService');
module.exports = {

    /**
     * 登录
     */
    signIn: async (req, res, next) => {

        if (req.body && req.body.email && req.body.password) {
            var r = await usersService.getByLogin(req.body.email, req.body.password);
            res.json(r);
        }
        else {
            res.json({ result: false, message: 'no parameters', data: { body: req.body, query: req.query, params: req.params } });
        }
    },

    /**
     * 注册
     */
    signUp: async (req, res, next) => {
        if (req.body && req.body.name && req.body.email && req.body.password) {
            var r = await usersService.add(req.body);
            if (r.result) {
                return res.json({ result: true, message: 'signUp success' });
            }
            res.json(r);
        }
        else {
            res.json({ result: false, message: 'no parameters' });
        }
    },

    /**
     * 获取用户列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getList: async (req, res, next) => {
        var r = await usersService.getList();
        return res.json(r);
    },

    /**
     * 获取用户
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    get: async (req, res, next) => {
        var id = req.query.id;
        return res.json({
            result: true,
            data: { id: id, name: 'test' + id }
        });
    },

    /**
     * 添加好友
     */
    addFriend: async (req, res, next) => {
        if (req.body && req.body.userId && req.body.friendId) {
            var r1 = await usersService.addFriend(req.body.userId, req.body.friendId);
            if (!r1.result) {
                return res.json(r1);
            }
            var r2 = await usersService.addFriend(req.body.friendId, req.body.userId);
            if (!r2.result) {
                return res.json(r2);
            }
            res.json({ result: true, message: 'add success' });
        }
        else {
            res.json({ result: false, message: 'no parameters' });
        }
    },
    /**
     * 获取好友列表
     */
    getFriends: async (req, res, next) => {
        if (req.query && req.query.userId) {
            var r = await usersService.getFriends(req.query.userId);
            res.json(r);
        }
        else {
            res.json({ result: false, message: 'no parameters' });
        }
    }


};