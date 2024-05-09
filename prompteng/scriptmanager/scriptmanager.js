import scriptArray from './promptscripts/scripts.js';

class ScriptManager{

    constructor(){
        this.scriptBundle = scriptArray;
    }

    getScript = (agenttype) => {
        const result = this.scriptBundle.find(item => item.agentType === agenttype);
        return result ? result.script : null;
    }


}

export default ScriptManager;