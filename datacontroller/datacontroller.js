import BatchArray from "./batcharray.js";
import DataLoader from "./loader.js";
import DataProcessor from "./processor.js";

class DataController{

    #loader;
    #dataproc;
    #rawChunkArray = [];
    #embdedArray = [];

    constructor(){
        this.#loader = new DataLoader();
        this.#dataproc = new DataProcessor();
        this.#loader.setSplitterParams(30,5);
    }

    loadPDF = async (filepath) => await this.#loader.loadData(filepath);

    createChunks = async(rawdocs) => this.#rawChunkArray = await this.#loader.produceChunks(rawdocs);

    returnChunks = () => this.#rawChunkArray;

    returnEmbeddings = () => this.#embdedArray;

    embedChunks = async () =>  this.#embdedArray = await this.#dataproc.embedData(this.#rawChunkArray); 
    



}

export default DataController;