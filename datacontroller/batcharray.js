
class Batches {
    constructor() {
        this.batches = new Map();
    }

    /**
     * Adds a new batch with a unique identifier.
     * @param {any} key The unique key for the batch.
     * @param {Array} batch The batch data to store.
     */

    addBatch = (key, batch) => !this.batches.has(key) ? this.batches.set(key,batch) : console.warn(`Batch with Key ${key} already exists.`);


    /**
     * Retrieves a batch by its key.
     * @param {any} key The key of the batch to retrieve.
     * @returns {Array} The batch data associated with the key.
     */
    getBatch = (key) => this.batches.get(key);

    /**
     * Retrieves all the batches
     * @returns {Map} All batch data returned as a new Map.
     */
    getAllBatches = () => new Map(this.batches);

    /**
     * Removes a batch by its key.
     * @param {any} key The key of the batch to remove.
     */
    removeBatch(key) {
        if (!this.batches.has(key)) {
            console.warn(`No batch found with key "${key}" to remove.`);
            return;
        }
        this.batches.delete(key);
    }

    /**
     * Prints all batches and their keys.
     */
    showBatches() {
        this.batches.forEach((value, key) => {
            console.log(`Key: ${key}, Batch:`, value);
        });
    }
}

export default Batches;
