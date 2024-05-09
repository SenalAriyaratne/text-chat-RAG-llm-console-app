

class UtiltiyTools{
    constructor(){}
    delay = async(value) => {
        return new Promise(resolve => setTimeout(resolve, value));
    }

    
}

export default UtiltiyTools;
