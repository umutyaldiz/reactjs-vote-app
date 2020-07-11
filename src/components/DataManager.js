
class DataManager {
    get (name){
        return localStorage.getItem(name);
    }
    set(name,value){
        localStorage.setItem(name, value);
    }
}
export default new DataManager();