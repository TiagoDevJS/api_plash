import path from 'path';
import uploadConfig from  '../../utils/upload'
import  QRCode  from 'qrcode';
import { OTPLibProvider } from '../Otp/index';
export class GenerateQrcode  {
    private KeyName:string;
    private otpProvider:OTPLibProvider;
 constructor (){
     this.KeyName = 'Plash Magazine',
     this.otpProvider = new OTPLibProvider()
 }
   async createUrlQrcode (nameInput:string, secret:string){
    const file = path.join(uploadConfig.tmpFolder, `${nameInput}.png`)
    const otpUri = this.otpProvider.generateKeyURI(nameInput, this.KeyName, secret);
    await QRCode.toFile(file, otpUri)
   }
  
 
}