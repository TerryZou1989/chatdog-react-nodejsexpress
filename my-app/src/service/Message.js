import MessageList from '../mocks/message-mock';
import HttpRequest from '../common/HttpRequest';
class Message {
    /**
     * 通过俩个用户id获取之间的对话列表
     * @param {*} userId 
     * @param {*} toUserId 
     */
    async getList(userId, toUserId) {
        // try {
        //     var list = MessageList.filter(t => (t.userId === userId && t.toUserId === toUserId) || (t.toUserId === userId && t.userId === toUserId));
        //     if (list != null && list.length > 0) {
        //         return { result: true, data: list };
        //     }
        //     return { result: true, data: [] };
        // } catch (ex) {
        //     return { result: false };
        // }

        try {
            var res = await HttpRequest.get('/api/messages/get_singlechat', { userId: userId, toUserId: toUserId });
            return res;
        } catch (e) {
            return { result: false };
        }
    }
    /**
     * 添加一个消息
     * @param {*} message 
     */
    async add(message) {
        // message.date = new Date().getTime();
        // MessageList.push(message);

        var res = await HttpRequest.post('/api/messages/', message,true);
        return res;
    }

}
// 实例化后再导出
export default new Message(); 