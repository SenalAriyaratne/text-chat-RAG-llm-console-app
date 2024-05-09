import dotenv from 'dotenv';
import VectorDataBase from './vectordbcontroller/vectordb.js';
import DataLoader from './datacontroller/loader.js';
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

const dataLoader = new DataLoader();
const rawdocs = await dataLoader.loadData(pathto);
console.log(dataLoader.getSplitterInfo());
//console.log(splitterinfo);
dataLoader.setSplitterParams(600,150);
console.log(dataLoader.getSplitterInfo());


//const embdata = await dataLoader.embedData([txt]);


//---------------------------------------------------------------------------
//Store embedded data in vector database


// const db = new VectorDataBase(apiPinecone, dataLoader);
// await db.initializeIndex(nameidx);


//implment the agent rag- prompt template


