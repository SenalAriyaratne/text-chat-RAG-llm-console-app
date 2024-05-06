import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";


class DataLoader {

    contructor() {
        this.pathToPdf = "";
        this.fullText = "";

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
            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: chunksize,
                chunkOverlap: overlap,

            })
            console.log(`Splitter initialized ...`);
            const chunks = await splitter.splitDocuments(data);
            console.log(`Splitting process completed ...`);
            return chunks;
        } catch (error) {
            console.log(`Error trying to split the documents.. error message: ${error.message}`);
            return null;
        }

    }

    embedData = async (rawdata) => {
        try {
            const modelEmbed = new HuggingFaceTransformersEmbeddings({
                model: "Xenova/all-MiniLM-L6-v2",
            });

            const result = await modelEmbed.embedDocuments(rawdata);
            return result

        } catch (error) {
            return null;
        }
    }

    concatText = (chunks) => {
        for (const doc of chunks){
            this.fullText += doc.pageContent;
        }
        return this.fullText;
    }
}

export default DataLoader;