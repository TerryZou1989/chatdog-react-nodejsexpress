import cookie from 'react-cookies'
class CookieUtil {

    /**
     * 保存登录用户cookie
     * @param {*} user 
     */
    saveLoginUser(user) {
        this.save('loginUser', user);
    }
    /**
     * 获取登录用户cookie
     */
    getLoginUser() {
        return this.get('loginUser');
    }
    /**
     * 移除登录用户cookie
     */
    removeLoginUser() {
        this.remove('loginUser');
    }

    /**
     * 保存token cookie
     * @param {*} user 
     */
    saveToken(token) {
        this.save('token', token);
    }
    /**
     * 获取token cookie
     */
    getToken() {
        return this.get('token');
    }
    /**
     * 移除token cookie
     */
    removeToken() {
        this.remove('token');
    }


    /**
     * 保存cookie
     * @param {*} key 
     * @param {*} value 
     */
    save(key, value) {
        /**
         * 设置过期时间
         */
        const expires = new Date()
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24);
        cookie.save(key, value, {
            path: '/',
            expires,
            //maxAge: 1000,
            //domain: 'https://play.bukinoshita.io',
            //secure: true,
            //httpOnly: true
        });
    }
    /**
     * 获取cookies
     */
    get(key) {
        return cookie.load(key);
    }
    /**
     * 删除cookie
     * @param {*} key 
     */
    remove(key) {
        cookie.remove(key, { path: '/' });
    }
}
// 实例化后再导出
export default new CookieUtil();