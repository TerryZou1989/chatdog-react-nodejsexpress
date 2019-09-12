var mongoose = require('mongoose');

module.exports = {

    getDal: (tbl) => {
        var dal = new Object();
        var t = mongoose.model(tbl);

        /**
         * 通过条件获取数据列表
         */
        dal.getList = (r, s) => {
            return new Promise((resolve, reject) => {
                var query = t.find(r);
                if (s != null && s != undefined && s != '' && s.length > 0) {
                    query.select(s);
                }
                query.exec((err, docs) => {
                    if (err) {
                        resolve({ result: false, error: err });
                    } else {
                        if (docs) {
                            var newDocs = JSON.parse(JSON.stringify(docs));
                            resolve({ result: true, data: newDocs });
                        }
                        else {
                            resolve({ result: true, data: null });
                        }
                    }
                });
            });
        };

        /**
        * 通过条件获取一条数据
        */
        dal.get = (r, s) => {
            return new Promise((resolve, reject) => {
                var query = t.findOne(r);
                if (s != null && s != undefined && s != '' && s.length > 0) {
                    query.select(s);
                }
                query.exec((err, doc) => {
                    if (err) {
                        resolve({ result: false, error: err });
                    } else {
                        if (doc) {
                            var newDoc = JSON.parse(JSON.stringify(doc));
                            resolve({ result: true, data: newDoc });
                        }
                        else {
                            resolve({ result: true, data: null });
                        }
                    }
                });
            });
        };

        /**
         * 添加一条数据
         */
        dal.add = (d) => {
            d.date = Date.now();
            return new Promise((resolve, reject) => {
                t.create(d, (err, doc) => {
                    if (err) {
                        resolve({ result: false, error: err });
                    } else {
                        var newDoc = JSON.parse(JSON.stringify(doc));
                        resolve({ result: true, data: newDoc });
                    }
                });
            });
        };

        /**
         * 更新一条数据
         */
        dal.update = (r, d) => {
            d.date = Date.now();
            return new Promise((resolve, reject) => {
                t.update(r, d, (err, doc) => {
                    if (err) {
                        resolve({ result: false, error: err });
                    } else {
                        var newDoc = JSON.parse(JSON.stringify(doc));
                        resolve({ result: true, data: newDoc });
                    }
                });
            });
        };

        return dal;
    }

};