import { ChatPromptTemplate } from "@langchain/core/prompts";


class Prompt {

    constructor() {
        this.TEMPLATE_STRING = ``;
    }

    initTemplate = (prompt) => this.TEMPLATE_STRING = prompt; 

    createQATemp = () =>  ChatPromptTemplate.fromTemplate(this.TEMPLATE_STRING);

}

export default Prompt;