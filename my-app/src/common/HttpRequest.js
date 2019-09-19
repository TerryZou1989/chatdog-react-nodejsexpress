import cookies from './CookieUtil';
import config from './config';
// import 'whatwg-fetch';
//import 'es6-promise';
const server = config.server;
class HttpRequest {

    /**
     * 保存登录用户cookie
     * @param {*} user 
     */
    async  post(url, params, istoken) {
        var result = { result: false };
        var pbody = '';
        for (var i in params) {
            pbody += '&' + i + '=' + encodeURIComponent(params[i]);
        }
        if (pbody) {
            pbody = pbody.slice(1);
        }
        var authorization = 'Basic SjFBQWRTcVBQRUkwMEFaWHJHcFQ6WA==';
        if (istoken) {
            authorization = cookies.getToken();
        }

        var req = new Request(server + url,
            {
                method: 'POST',
                mode: 'cors',//跨域请求
                //mode: 'no-cors',
                //cache: 'reload',
                headers: {
                    //  'Authorization': 'Basic SjFBQWRTcVBQRUkwMEFaWHJHcFQ6WA==',
                    //  'Access-Control-Allow-Origin': '*',
                    // 'Origin':config.server,
                    //"Content-Type": 'application/json; charset=utf-8',
                    "Content-Type": 'application/x-www-form-urlencoded',
                    //'Content-Type': 'multipart/form-data;',
                    //'token': cookies.getToken()
                    // 'Access-Control-Allow-Origin': '*',
                    'Authorization': authorization,
                    'Accept': 'application/json'
                },
                body: pbody
            });

        await fetch(req)
            .then(res => {
                //网络请求成功,执行该回调函数,得到响应对象,通过response可以获取请求的数据
                //将Promise对象转换成json对象后return，给下一步的.then处理
                return res.json();
                //或 return response.text()
            })
            .then(data => {
                result = data;
                //处理请求得到的数据
            })
            .catch(ex => {
                //网络请求失败,执行该回到函数,得到错误信息
                result = { result: false, message: ex.message };
            });

        return result;
    }

    /**
     * 保存登录用户cookie
     * @param {*} user 
     */
    async  get(url, params) {

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

        var authorization = cookies.getToken();

        var req = new Request(server + url,
            {
                method: 'GET',
                //mode: 'cors',//跨域请求
                headers: new Headers({
                    "Content-Type": 'application/json',
                    'Authorization': authorization,
                    //'token':cookies.getToken(),
                    'Accept': 'application/json, text/plain, */*'
                })
            });

        await fetch(req)
            .then(res => {
                //网络请求成功,执行该回调函数,得到响应对象,通过response可以获取请求的数据
                //将Promise对象转换成json对象后return，给下一步的.then处理
                //console.log(res.json());
                return res.json();
                //或 return response.text()
            })
            .then(data => {
                result = data;
                // resolve(data);
                //处理请求得到的数据
            })
            .catch(ex => {
                //网络请求失败,执行该回到函数,得到错误信息
                result = { result: false, message: ex.message };
                //resolve(result);
            });
        return result;
    }

    async parseResult(response) {//解析返回的结果
        const contentType = response.headers.get('Content-Type');
        if (contentType != null) {
            if (contentType.indexOf('text') > -1) {
                return await response.text()
            }
            if (contentType.indexOf('form') > -1) {
                return await response.formData();
            }
            if (contentType.indexOf('video') > -1) {
                return await response.blob();
            }
            if (contentType.indexOf('json') > -1) {
                return await response.json();
            }
        }
        return await response.text();
    }
}

// 实例化后再导出
export default new HttpRequest();