import fs from 'fs';
import path from 'path';

export const createFileStorage = <T>(fileName: string) => {
    const filePath = path.join(__dirname, '../data', fileName)

    // initialize file if it doesn't exist
    const initializeFile = (): void => {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
        }
    };

    //  Read all data from the file
    const readAll = (): T[] => {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data) as T[];
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
            return [];
        }
    };

    // Write all data to the file
    const writeAll = (data: T[]): void => {
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error(`Error writing to file ${filePath}:`, error);
            throw new Error("Failed to save data to file");
        }
    };

    //  find by id
    const findById = (id: number): T | undefined => {
        const data = readAll();
        return data.find((item: any) => item.id === id);
    };

    //  Generate a new id for a new item

    const generateId = (): number => {
        const data = readAll();
        return data.length > 0 ? Math.max(...data.map((item: any) => item.id)) + 1 : 1;
    };



    initializeFile();

    return {
        readAll,
        writeAll,
        findById,
        generateId,
        filePath
    };
}