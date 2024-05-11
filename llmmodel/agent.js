
import { ChatAnthropic } from "@langchain/anthropic";

import { } from "@langchain/core/tools";
class AnthropicAgent {

    constructor(apiKey, modelName) {
        this.modelName = modelName;
        this.apiKey = apiKey;
        this.client = new ChatAnthropic({
            modelName: this.modelName,
            apiKey: this.apiKey,
        });
    }
    askQuestion = async (prompt) => {
        try {
            const response = await this.client.invoke(prompt);
            console.log(response);
        }
        catch (error) {
            console.log(error.message)
        }

    }

    ceratePromptTemplate = async () => {
        try{

        }
        catch(error)
        {

        }
    }
    




}

export default AnthropicAgent;