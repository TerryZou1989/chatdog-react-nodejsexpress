// var express = require('express');
// var app = express();
module.exports = (server) => {
    // var server = require('http').createServer(app);
    var io = require('socket.io').listen(server);
    var socketUser = [];
    io.sockets.on('connection', (socket) => {
        // 失去连接
        socket.on('disconnect', () => {
            var su = socketUser.find(t => t.socketId == socket.id);
            if (su != null && su.socketId != null) {
                socketUser.splice(socketUser.indexOf(su), 1);
            }
        });

        socket.on('new_message', (data) => {
            if (data && data.userId && data.toUserId && data.message) {
                //把信息发给指定用户
                var sus = socketUser.filter(t => t.userId == data.toUserId);
                if (sus != null && sus.length > 0) {
                    sus.forEach((su) => {
                        if (su != null && su.socketId != null) {
                            socket.to(su.socketId).emit('new_message', data);
                        }
                    });
                }
            }

        });

        socket.on('new_friend', (data) => {
            if (data && data.userId && data.friendId && data.userName) {
                //把信息发给指定用户
                var sus = socketUser.filter(t => t.userId == data.friendId);
                if (sus != null && sus.length > 0) {
                    sus.forEach((su) => {
                        if (su != null && su.socketId != null) {
                            socket.to(su.socketId).emit('new_friend',
                                {
                                    userId: data.friendId,
                                    friendId: data.userId,
                                    friendName: data.userName
                                });
                        }
                    });
                }
            }

        });

        socket.on('login', (data) => {
            if (data && data._id && data.name) {
                var su = {
                    userId: data._id,
                    userName: data.name,
                    socketId: socket.id
                };
                socketUser.push(su);
                socket.emit('login', su);
            }
        });
    });
};