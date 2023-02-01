
export default {
    Bottom(id){
        const element = document.querySelector(id);
        element.scrollTop = element.scrollHeight
    },
    Top(id){
        const element = document.querySelector(id);
        element.scrollTop = 0;
    }
}
