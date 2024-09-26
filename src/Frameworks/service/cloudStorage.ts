import Multer from "multer";
import MulterGoogleCloudStorage from "multer-cloud-storage";
const { v4: uuidv4 } = require('uuid');


import path from "path";
const { Storage } = require("@google-cloud/storage");
const keyFilenamePath = path.resolve(__dirname, "../utils/cloud.json");
export const storage = new Storage({
    
    keyFilename: keyFilenamePath,
  });
  export const bucket = storage.bucket("plash_bcuket_pdf");

class CloudStorage {
    
    async urlFilePublic (fileName:any){
      try {
        const file = bucket.file(fileName);
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 60 * 60 * 1000, // 1 hora
        });
     
        
        return url
      } catch (error) {
        console.error('Error generating signed URL:', error);
      }
        
    }
    privateBucket(file:string) {
    
        const upload =  Multer({
          storage: new MulterGoogleCloudStorage({
            bucket: "plash_bcuket_pdf",
            projectId: 'plash-432019',
            keyFilename: keyFilenamePath,
            
          }),
        });
        
        return upload.single(file)
      
        
      }
    publicBucketSingle(file:string){
     return  Multer({
        storage: new MulterGoogleCloudStorage({
          bucket: "bucket_magazine",
          projectId: 'plash-432019', // Substitua pelo seu ID do projeto
          keyFilename: keyFilenamePath,
          acl: 'publicRead', // Define os arquivos como publicamente legíveis
          
          filename: (req:any, file:any, cb:any) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename.trim());
          }
        }),
    }).single(file)
  }
  publicBucketFields(props:any){
    return  Multer({
       storage: new MulterGoogleCloudStorage({
         bucket: "bucket_magazine",
         projectId: 'plash-432019', // Substitua pelo seu ID do projeto
         keyFilename: keyFilenamePath,
         acl: 'publicRead', // Define os arquivos como publicamente legíveis
         
         filename: (req:any, file:any, cb:any) => {
           const filename = `${Date.now()}-${file.originalname}`;
           cb(null, filename);
         }
       }),
   }).fields([{name:props.banner,maxCount:1},{name:props.cover,maxCount:1}])
 }
 
}
export const CloudStorageService = new CloudStorage()