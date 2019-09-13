class System {
    formatDate(t){
        var d=new Date(t);
            var year=d.getFullYear(); 
            var month=d.getMonth()+1; 
            var date=d.getDate(); 
            var hour=d.getHours(); 
            var minute=d.getMinutes(); 
            var second=d.getSeconds(); 
            return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;        
    }
}
export default new System();