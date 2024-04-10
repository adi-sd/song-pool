import { Request, Response, NextFunction } from "express";
import { LocalStorage } from "node-localstorage";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface CustomRequest extends Request {
    expiringStorage?: ExpiringStorage<any>;
}

interface ExpiringData<T> {
    data: T;
    expiration?: number; // Unix timestamp representing expiration time
}

class ExpiringStorage<T> {
    private localStorage: LocalStorage;

    constructor() {
        this.localStorage = new LocalStorage(path.join(__dirname, "..", "server-storage.temp"));
    }

    setItem(key: string, data: any, expirationSeconds?: number): void {
        const expiringData: ExpiringData<any> = { data };
        if (expirationSeconds) {
            expiringData.expiration = Date.now() + expirationSeconds * 1000; // Convert seconds to milliseconds
        }
        this.localStorage.setItem(key, JSON.stringify(expiringData));
    }

    getItem(key: string): any | null {
        const storedData = this.localStorage.getItem(key);
        if (storedData) {
            const expiringData: ExpiringData<any> = JSON.parse(storedData);
            if (expiringData.expiration === undefined || expiringData.expiration > Date.now()) {
                return expiringData.data;
            } else {
                this.localStorage.removeItem(key); // Remove expired data
            }
        }
        return null;
    }

    deleteItem(key: string): void {
        this.localStorage.removeItem(key);
    }
}

// Create a singleton instance of ExpiringStorage
const expiringStorage = new ExpiringStorage();

// Express middleware to provide access to the expiring storage instance
export const expiringStorageMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    req.expiringStorage = expiringStorage;
    next();
};

// Example usage:
// const expiringStorage = new ExpiringStorage();

// Set an item with expiration time of 1 hour (3600 seconds)
// expiringStorage.setItem("key1", "value1", 3600);

// Retrieve the item
// const value1 = expiringStorage.getItem("key1");
// console.log(value1); // Output: 'value1'

// Set another item with no expiration time (persistent until explicitly deleted)
// expiringStorage.setItem("key2", "value2");

// Retrieve the persistent item
// const value2 = expiringStorage.getItem("key2");
// console.log(value2); // Output: 'value2'

// Clear the persistent item
// expiringStorage.deleteItem("key2");

// Retrieve the cleared item
// const clearedValue = expiringStorage.getItem("key2");
// console.log(clearedValue); // Output: null
