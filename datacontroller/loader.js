import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


class DataLoader {

    #chunkSize = 500;
    #chunkOverlap = 50;

    contructor() {
        this.pathToPdf = "";
        this.fullText = "";
        this.#initializeSplitter();  
    }

    setSplitterParams = async (chunksize=this.#chunkSize, overlap=this.#chunkSize) => {
        this.#chunkSize = chunksize;
        this.#chunkOverlap = overlap;
        this.#initializeSplitter();
    }

    getSplitterInfo = () => ({"Chunksize" : this.#chunkSize, "Overlap": this.#chunkOverlap});
    

    #initializeSplitter =  () => {
        console.log(`Initializing Text Splitter from Langchain ...`);
        try{
            
            this.splitter = new RecursiveCharacterTextSplitter({
                chunkSize: this.#chunkSize,
                chunkOverlap: this.#chunkOverlap,
    
            });
        console.log(`Splitter initialized with chunksize : ${this.#chunkSize} and Overlap with ${this.#chunkOverlap}`);

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

    splitData = async (chunksize, overlap, data) => {

        try {
            const chunks = await splitter.splitDocuments(data);
            console.log(`Splitting process completed ...`);
            return chunks;
        } catch (error) {
            console.log(`Error trying to split the documents.. error message: ${error.message}`);
            return null;
        }

    }

    concatText = (chunks) => {
        chunks.forEach(doc => this.fullText += doc.pageContent);
        return this.fullText;
    }
}

export default DataLoader;