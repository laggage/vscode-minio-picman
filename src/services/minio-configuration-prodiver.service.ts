import { workspace } from 'vscode';
import { MinioConfiguration } from '../models/minio-configuration';
import { AppContext } from '../utils/app-context';

export class MinioConfigurationProvider {
    static get minioConfiguration(): MinioConfiguration {
        const accessKey = workspace.getConfiguration(AppContext.extName).get<string>('minioAccessKey') ?? '';
        const secretKey = workspace.getConfiguration(AppContext.extName).get<string>('minioSecretKey') ?? '';
        const serverAddress = workspace.getConfiguration(AppContext.extName).get<string>('minioServerAddress') ?? '';
        const bucketName = workspace.getConfiguration(AppContext.extName).get<string>('minioBucketName') ?? '';
        const subdirectory =
            workspace.getConfiguration(AppContext.extName).get<string>('subdirectoryInMinioBucket') ?? '';
        const splitted = serverAddress.split('://');
        const scheme = splitted[0];
        const host = splitted[1];
        return new MinioConfiguration(
            {
                accessKey,
                secretKey,
                endPoint: host,
                useSSL: scheme === 'https',
            },
            bucketName,
            subdirectory
        );
    }
}
