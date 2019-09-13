import UserList from '../mocks/user-mock';
import FriendList from '../mocks/friend-mock';
import HttpRequest from '../common/HttpRequest';
class User {

    /**
     * 添加一个用户
     * @param {*} user 
     */
    async add(user) {
        try {
            if (!user) {
                return { result: false };
            }
            var res = await HttpRequest.post('/signup', user,false);
            return res;

        } catch (ex) {
            return { result: false, message: ex.message };
        }
    }

    /**
     * 验证用户名是否存在
     * @param {*} name 
     */
    isExistName(name) {
        try {
            var user = UserList.find(t => t.name === name);
            if (user && user._id > 0) {
                return { result: true, data: true };
            }
            else {
                return { result: true, data: false };
            }
        } catch (ex) {
            return { result: false, message: ex.message };
        }
    }

    /**
     * 验证邮箱是否存在
     * @param {*} name 
     */
    isExistEmail(email) {
        try {
            var user = UserList.find(t => t.email === email);
            if (user && user._id > 0) {
                return { result: true, data: true };
            }
            else {
                return { result: true, data: false };
            }
        } catch (ex) {
            return { result: false, message: ex.message };
        }
    }

    /**
     * 获取用户好友列表
     * @param {*} userId 
     */
    async getFriendList(userId) {

        try {
            var res = await HttpRequest.get('/api/users/get_friends', { userId: userId });
            if (!res.result) {
                return { result: false, data: [] };
            }
            return { result: true, data: res.data.friends };
        } catch (e) {
            return { result: false };
        }
    }

    /**
     * 通过姓名搜索用户列表
     * @param {*} name 
     */
    async getList(name) {
        try {
            var res = await HttpRequest.get('/api/users', {});
            if (!res.result) {
                return { result: false, data: [] };
            }
            var userList=res.data;
            var list = [];
            if (name && name.length > 0) {
                for (var i = 0; i < userList.length; i++) {
                    //如果字符串中不包含目标字符会返回-1
                    if (userList[i].name.indexOf(name) >= 0) {
                        list.push(userList[i]);
                    }
                }
            }
            return { result: true, data: list };
        } catch (e) {
            return { result: false };
        }
    }

    /**
     * 添加好友
     * @param {*} friend 
     */
    async addFriend(friend) {
        //FriendList.push(friend);
        try {
            if (!friend) {
                return { result: false };
            }
            var res = await HttpRequest.post('/api/users/add_friend', friend,true);
            return res;

        } catch (ex) {
            return { result: false, message: ex.message };
        }
    }

    /**
     * 通过用户id获取用户信息
     * @param {*} userId 
     */
    get(userId) {
        var user = UserList.find(t => t._id === userId);
        if (user != null && user._id > 0) {
            return { result: true, data: user };
        }
        return { result: false };
    }
}
// 实例化后再导出
export default new User();