import cookies from './CookieUtil';
import config from './config';
import 'whatwg-fetch';
import 'es6-promise';
const server=config.server;
class HttpRequest {

    /**
     * 保存登录用户cookie
     * @param {*} user 
     */
    async post(url, params) {
        var result = { result: false };
        var req = new Request(server + url,
            {
                method: 'POST',
                mode: 'cors',//跨域请求
                headers: new Headers({
                    'Authorization': 'Basic SjFBQWRTcVBQRUkwMEFaWHJHcFQ6WA==',
                    'Access-Control-Allow-Origin': '*',
                    'Origin':config.server,
                    "Content-Type": 'application/json;charset=utf-8',
                    'token':cookies.getToken()
                }),
                body: JSON.stringify(params)
            });

        await fetch(req)
            .then(res => {
                //网络请求成功,执行该回调函数,得到响应对象,通过response可以获取请求的数据
                //将Promise对象转换成json对象后return，给下一步的.then处理
                //console.log(res.json());
                return res.json()
                //或 return response.text()
            })
            .then(data => {
                console.log('http post');
                console.log(data);
                result = data;
                //处理请求得到的数据
            })
            .catch(ex => {
                console.log(ex)
                //网络请求失败,执行该回到函数,得到错误信息
                result={result:false,message:ex.message};
            });

        return result;
    }

    /**
     * 保存登录用户cookie
     * @param {*} user 
     */
    async get(url, params) {

        var result = { result: false };
        if (params) {  
            let paramsArray = [];  
            //拼接参数  
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
            if (url.search(/\?/) === -1) {  
                url += '?' + paramsArray.join('&')  
            } else {  
                url += '&' + paramsArray.join('&')  
            }  
        }  

        var req = new Request(server + url,
            {
                method: 'GET',
                //mode: 'cors',//跨域请求
                headers: new Headers({
                    "Content-Type": 'application/json',
                    'token':cookies.getToken()
                })
            });

        await fetch(req)
            .then(res => {
                //网络请求成功,执行该回调函数,得到响应对象,通过response可以获取请求的数据
                //将Promise对象转换成json对象后return，给下一步的.then处理
                //console.log(res.json());
                return res.json()
                //或 return response.text()
            })
            .then(data => {
                console.log('http get');
                console.log(data);
                result = data;
                //处理请求得到的数据
            })
            .catch(ex => {
                console.log(ex)
                //网络请求失败,执行该回到函数,得到错误信息
                result={result:false,message:ex.message};
            });

        return result;
    }
}

// 实例化后再导出
export default new HttpRequest();