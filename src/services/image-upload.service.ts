import format from 'date-fns/format';
import path = require('path');
import { Readable } from 'stream';
import { MinioClientFactory } from './minio-client-factory.service';
import { MinioConfigurationProvider } from './minio-configuration-prodiver.service';
import * as mime from 'mime-types';

export class ImageUploadService {
    private static _instance?: ImageUploadService;
    static get instance() {
        if (!this._instance) {
            this._instance = new ImageUploadService();
        }

        return this._instance;
    }

    private constructor() {}

    async upload(fileStream: Readable, fileName: string): Promise<string> {
        const client = MinioClientFactory.minioClient;
        const { bucketName, subDirectory, minioClientOption } = MinioConfigurationProvider.minioConfiguration;
        const now = format(new Date(), 'yyyyMMddHHmmssSS');
        fileName = `/${now}-${fileName}`;
        let filePath = `${subDirectory}${fileName}`;
        filePath = filePath.startsWith('/') ? filePath : `/${filePath}`;
        const fileExt = path.extname(fileName);

        await client.putObject(bucketName, filePath, fileStream, {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': mime.contentType(fileExt),
        });
        const { port, endPoint } = minioClientOption;
        return `${minioClientOption.useSSL ? 'https' : 'http'}://${endPoint}${ port == null || port === 80 || port === 443 ? '' : port }/${bucketName}${filePath
            .split('/')
            .map(x => encodeURI(x))
            .join('/')}`;
    }
}

export const imageUploadService = ImageUploadService.instance;
