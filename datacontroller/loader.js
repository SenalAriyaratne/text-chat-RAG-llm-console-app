import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


class DataLoader {

    #chunkSize = 200;
    #chunkOverlap = 50;
    

    constructor() {
        this.pathToPdf = "";
        this.fullText = "";
      
    }

    setSplitterParams = async (chunksize=this.#chunkSize, overlap=this.#chunkSize) => {
        this.#chunkSize = chunksize;
        this.#chunkOverlap = overlap;
    }

    getSplitterInfo = () => ({"Chunksize" : this.#chunkSize, "Overlap": this.#chunkOverlap});
    

    #initializeSplitter =  () => {
        //console.log(`Initializing Text Splitter from Langchain ...`);
        try{
            
             this.splitter = new RecursiveCharacterTextSplitter({
                chunkSize: this.#chunkSize,
                chunkOverlap: this.#chunkOverlap,
    
            });
            //console.log(`Splitter initialized with  a chunk size of ${this.#chunkSize} and Overlap of ${this.#chunkOverlap}`);
            

        }catch(error){
            console.log(`Trouble initializing the text splitter ...`);
            

        }
      
    }

    loadData = async (pathto) => {
        console.log(`Starting to load the pdf ...`);
        try {
            this.pathToPdf = pathto;
            this.loader = new PDFLoader(pathto);
            const rawdocs = await this.loader.load();
            console.log(`Loaded the pdf successfully.`)
            return rawdocs;

        }
        catch (error) {
            console.log(`Error trying to load the pdf... error message : ${error.message}`);
            return null;
        }
    }

    produceChunks = async (rawdocs) => {
        try
        {
            const tempholder = [];
            for (let idx = 0; idx < rawdocs.length; idx++)
            {
                let rawtext = rawdocs[idx].pageContent;
                const chunks = await this.#splitData(rawtext);
                tempholder.push(this.#newChunk(idx,chunks));
    
            }
            //console.log(`Chunks produced sucessfully`);
            return tempholder;

        }catch(error)
        {
            console.log(`Trouble creating chunks... error message : ${error.message}`);
            return null;

        }

    }

    #newChunk = (id, values) => ({docid: id, chunkvalues: values});

    #splitData = async (rawtext) => {

        try {
            this.#initializeSplitter();
            const chunks = await this.splitter.createDocuments([rawtext]);
           // console.log(`Splitting process completed ...`);
            return chunks;
        } catch (error) {
            console.log(`Error trying to split the documents.. error message: ${error.message}`);
            return null;
        }

    }

}

export default DataLoader;