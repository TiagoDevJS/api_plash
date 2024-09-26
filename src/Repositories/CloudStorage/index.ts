import Multer from "multer";
import MulterGoogleCloudStorage from "multer-cloud-storage";
import path from "path";
import { ICloudStorageInterface } from "../../Interfaces/CloudStorage/ICloudInterfaceRepository";
const { Storage } = require("@google-cloud/storage");

export class CloudStorageReposytori implements ICloudStorageInterface {
  private bucketName: string;
  private keyFilenamePath: string;
  private storage: Storage;

  constructor() {
    // Inicializa as variáveis privadas no construtor
    this.bucketName = "bucket_magazine";
    this.keyFilenamePath = path.resolve(__dirname, "./cloud.json");

    // Cria a instância do Google Cloud Storage
    this.storage = new Storage({
      keyFilename: this.keyFilenamePath,
    });
  }

  async generateFilePublicUrl(fileName: any) {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: Date.now() + 60 * 60 * 1000, // 1 hora
      });

      return url;
    } catch (error) {
      console.error("Error generating signed URL:", error);
    }
  }
  async privateUploadUrl(file: any): Promise<any | null> {
    console.log(file)
    const  bucket = this.storage.bucket('plash_bcuket_pdf');
      const filename = `${Date.now()}-${file.originalname}`;
      const fileUpload = await  bucket.file(filename);
    
       await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype },
       
      });
    
      const url = `https://storage.googleapis.com/${this.bucketName}/${filename}`;
    
      return url ? url : null ;
    const config = Multer({
      storage: new MulterGoogleCloudStorage({
        bucket: "plash_bcuket_pdf",
        projectId: "plash-432019",
        keyFilename: this.keyFilenamePath,
      }),
    });
    const upload = config.single(file);

    return upload.length ? upload : null;
  }
  async publicUploadUrl(file: any): Promise<any> {
      const  bucket = this.storage.bucket(this.bucketName);
      const filename = `${Date.now()}-${file.originalname}`;
      const fileUpload = await  bucket.file(filename);
    
       await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype },
        public: true,
      });
    
      const url = `https://storage.googleapis.com/${this.bucketName}/${filename}`;
      
      return url ? url : null ;
   
  }
  publicBucketFields(props: any) {
    return Multer({
      storage: new MulterGoogleCloudStorage({
        bucket: "bucket_magazine",
        projectId: "plash-432019", // Substitua pelo seu ID do projeto
        keyFilename: this.keyFilenamePath,
        acl: "publicRead", // Define os arquivos como publicamente legíveis

        filename: (req: any, file: any, cb: any) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }).fields([
      { name: props.banner, maxCount: 1 },
      { name: props.cover, maxCount: 1 },
    ]);
  }
}
