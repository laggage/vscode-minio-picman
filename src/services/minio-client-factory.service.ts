import { Client, ClientOptions } from 'minio';
import { MinioConfigurationProvider } from './minio-configuration-prodiver.service';

const validateClientOptions = ({ accessKey, secretKey, endPoint }: ClientOptions) => {
    const errors: string[] = [];
    if (!accessKey) {
        errors.push('minio accessKey not configured');
    }
    if (!secretKey) {
        errors.push('minio secret key not configured');
    }
    if (!endPoint) {
        errors.push('minio endPoint not configured');
    }
    if (errors.length > 0) {
        throw Error(errors.join('\n'));
    }
};

export class MinioClientFactory {
    static get minioClient(): Client {
        const { minioClientOption } = MinioConfigurationProvider.minioConfiguration;
        validateClientOptions(minioClientOption);
        return new Client(minioClientOption);
    }
}
