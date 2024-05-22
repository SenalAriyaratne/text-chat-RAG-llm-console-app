import dotenv from 'dotenv';
//import VectorDataBase from './vectordbcontroller/vectordb.js';
import DataController from './datacontroller/datacontroller.js';
import Prompt from './prompteng/prompt.js';
import ScriptManager from './prompteng/scriptmanager/scriptmanager.js';

dotenv.config();
const apiPinecone = process.env.PINECONE_API_KEY;
const pathto = process.env.PATH_TO_PDF;
const nameidx = "textx";

//Prompt----------------------------------------------
const prompt = new Prompt();
const sm = new ScriptManager();
const rspt = sm.getScript(`Researcher`);
prompt.initTemplate(rspt);
const qa = prompt.createQATemp();
//-----------------------------------------------------

//Data loading and Embedding Process ---------------------------------------

const datacontroller = new DataController();
const rawdocs = await datacontroller.loadPDF(pathto);
await datacontroller.createChunks(rawdocs);
const chunks = datacontroller.returnChunks();
await datacontroller.embedChunks();
const emd = datacontroller.returnEmbeddings();
datacontroller.produceBatches();
const b = datacontroller.retrieveBatches();
console.log(`Number of Batches ${datacontroller.numberOfBatches()}`);
//console.log(datacontroller.checkBatch(1));
b.forEach((bch => console.log(bch)));
//console.log({a});
//console.log(b.forEach((bch) => {bch.key}));

//---------------------------------------------------------------------------
//Store embedded data in vector database
//const db = new VectorDataBase(apiPinecone);
//await db.initializeIndex(nameidx);


//implment the agent rag- prompt template


