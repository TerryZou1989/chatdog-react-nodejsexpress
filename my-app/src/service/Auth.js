import UserList from '../mocks/user-mock';
import cookie from '../common/CookieUtil';
import HttpRequest from '../common/HttpRequest';
class Auth {
    /**
     * 登录
     * @param {*} email 
     * @param {*} password 
     */
    async login(email, password) {
        // var user = UserList.find(t => t.email === email && t.password === password);
        // if (user != null && user.id > 0) {
        //     cookie.saveLoginUser(user);
        //     return { result: true, data: user };
        // }
        // return { result: false };
        var res = await HttpRequest.post('/signin', {
            email: email,
            password: password,
        }, false);

        if (res.result) {
            cookie.saveLoginUser(res.data.user);
            cookie.saveToken(res.data.token);
            return { result: true, data: res.data.user }
        }
        return res;
    }

    /**
     * 退出
     */
    logout() {
        cookie.removeLoginUser();
        cookie.removeToken();
    }
    /**
     * 获取登录用户
     */
    getLoginUser() {
        var user = cookie.getLoginUser();
        if (user != null && user._id) {
            return { result: true, data: user };
        }
        return { result: false };
    }
}
// 实例化后再导出
export default new Auth();