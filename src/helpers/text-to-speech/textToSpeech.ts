import TextToSpeech from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
import configuration from '../../config/configuration';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

async function synthesize(textToConvert: string) {
    const textToSpeech = new TextToSpeech({
        authenticator: new IamAuthenticator({
            apikey: configuration().credentials.apikey,
        }),
        serviceUrl: configuration().credentials.url,
    });
    

    const synthesizeParams = {
        text: textToConvert,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaV3Voice'
    }

    
    return await textToSpeech.synthesize(synthesizeParams)
        .then(async response => {
            //@ts-ignore()
            return await textToSpeech.repairWavHeaderStream(response.result)
        })
        .then(buffer=> {
            const id = uuidv4();
            const fileName = `${id}.wav`
            const path = `/audios/${fileName}`
            fs.writeFileSync('public'+path, buffer);
            return path;
        })
}

export default synthesize;