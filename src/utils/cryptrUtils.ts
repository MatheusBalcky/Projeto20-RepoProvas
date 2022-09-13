import Cryptr from 'cryptr';

const cryptr = new Cryptr(`${process.env.CRYPTR_KEY}`);

export function encryptByCryptr(toCrypt: string){
    return cryptr.encrypt(toCrypt);
}

export function decryptByCryptr(toDecrypt: string){
    return cryptr.decrypt(toDecrypt);
}