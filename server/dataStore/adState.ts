import path from "path";
import fs from "fs";
import { AdContextState } from 'src/ad/components/AdContextProvider';

const dataFilePath = path.resolve("././data/ad_data.json");

const getData = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFilePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
          });
    });
}

const setData = async (data: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataFilePath, data, 'utf-8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
          });
    });
}

export const getAdState = async(): Promise<AdContextState> => {
    let stateString = ""; 
    try {
        stateString = await getData();
    } catch (error) {
        console.error(error);
    }
    if(!stateString) {
        const stateToWrite: AdContextState = {
            timestamp: Date.now(),
            ads: [],
        };
        stateString = JSON.stringify(stateToWrite);
        await setData(stateString);
    }
    return JSON.parse(stateString);
}

export const setAdState = async(newState: AdContextState): Promise<AdContextState> => {
    const currentState = await getAdState();
    if(newState.timestamp != currentState.timestamp) {
        console.error('trying to set old state. Server state timestamp differs from the timestamp you are trying to set');
    }
    const stateToWrite: AdContextState = {
        ...newState,
        timestamp: Date.now()
    }
    await setData(JSON.stringify(stateToWrite));
    return stateToWrite;
}
