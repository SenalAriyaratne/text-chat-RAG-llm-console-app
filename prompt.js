import { ChatPromptTemplate } from "@langchain/core/prompts";



class Prompt {

    constructor() {
        this.TEMPLATE_STRING = ``;
    }

    initTemplate = async (prompt) => this.TEMPLATE_STRING = prompt; 

    createQATemp = async () => ChatPromptTemplate.fromTemplate(this.TEMPLATE_STRING);
    



}

export default Prompt;