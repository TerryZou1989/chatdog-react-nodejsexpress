var usersBll = require('../bll/usersBll');
var tokensBll = require('../bll/tokensBll');
var util = require('../common/util');

module.exports = {

    /**
     * 验证token
     */
    checkToken: async (token) => {
        if (token == undefined || token == null || token == '' || token.length == 0) {
            return {
                result: false,
                message: 'no token'
            };
        }
        //获取token
        var tokenRes =await tokensBll.getByToken(token);
        //验证token是否存在
        if (!tokenRes.result) {
            return tokenRes;
        }
        var tokenData=tokenRes.data;
        if(tokenData==null||tokenData.token==null||tokenData.token==undefined||tokenData.token==''||tokenData.token.length==0){
            return {result:false,message:'Token is invalid'};
        }

        //验证过期时间
        var expireDate=Date.now()+1000*60*60*24;
        if(tokenData.date>expireDate){
            return {result:false,message:'token expired'};
        }

        //获取用户
        var userRes=await usersBll.getById(tokenData.userId);
        if(!userRes.result){
            return {result:false,message:'Token is invalid'};
        }

        var user=userRes.data;
        if(user==null||user==undefined||user.name==undefined||user.name==null||user.name==''){
            return {result:false,message:'Token is invalid'};
        }
        return {result:true,message:'token is ok'};
    }

};