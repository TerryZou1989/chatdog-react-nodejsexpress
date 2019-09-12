var Dal =require('./dal');

module.exports =()=> {
    return  Dal.getDal('token');
};