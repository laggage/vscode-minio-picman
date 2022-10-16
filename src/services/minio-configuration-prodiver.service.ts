import { ConfigurationTarget, workspace } from 'vscode';
import { MinioConfiguration } from '../models/minio-configuration';
import { AppContext } from '../utils/app-context';

export class MinioConfigurationProvider {
    static get minioConfiguration(): MinioConfiguration {
        const configuration = workspace.getConfiguration(AppContext.extName);
        const serverAddress = configuration.get<string>('minioPicman.server.address') ?? '';
        const accessKey = configuration.get<string>('minioPicman.credential.accessKey') ?? '';
        const secretKey = configuration.get<string>('minioPicman.credential.secretKey') ?? '';
        const bucketName = configuration.get<string>('minioPicman.upload.bucketName') ?? '';
        const subdirectory = configuration.get<string>('minioPicman.upload.directory') ?? '';
        let [scheme, host] = serverAddress.split(/:?\/\//);
        let port: number = 0;
        host = host.replace(/:(\d{2,})/, (_, sub1) => {
            port = parseInt(sub1, 10);
            return '';
        });

        return new MinioConfiguration(
            {
                accessKey,
                secretKey,
                endPoint: host,
                useSSL: scheme === 'https',
                port: port > 0 ? port : undefined,
            },
            bucketName,
            subdirectory
        );
    }

    private static get configuration() {
        return workspace.getConfiguration(AppContext.extName);
    }

    static migrateOld() {
        for (const [newKey, oldKey] of [
            ['minioPicman.server.address', 'minioServerAddress'],
            ['minioPicman.credential.accessKey', 'minioAccessKey'],
            ['minioPicman.credential.secretKey', 'minioSecretKey'],
            ['minioPicman.upload.bucketName', 'minioBucketName'],
            ['minioPicman.upload.directory', 'subdirectoryInMinioBucket'],
        ] as const) {
            const oldValueSpec = this.configuration.inspect(oldKey);
            if (oldValueSpec == null) {
                continue;
            }
            const { workspaceValue, globalValue, defaultValue, workspaceFolderValue } = oldValueSpec;
            const newValueSpec = this.configuration.inspect(newKey);

            const deleteOld = (target: ConfigurationTarget) => this.configuration.update(oldKey, undefined, target);
            const update = (value: any, target: ConfigurationTarget) => {
                this.configuration.update(newKey, value, target);
                deleteOld(target);
            };
            const check = (oldValue: any, newValue: any, target: ConfigurationTarget) =>
                oldValue != null && oldValue !== defaultValue && !newValue
                    ? () => update(oldValue, target)
                    : () => deleteOld(target);

            check(globalValue, newValueSpec?.globalValue, ConfigurationTarget.Global)?.call(null);
            check(workspaceValue, newValueSpec?.workspaceValue, ConfigurationTarget.Workspace)?.call(null);
            check(workspaceFolderValue, newValueSpec?.workspaceFolderValue, ConfigurationTarget.WorkspaceFolder);
        }
    }
}
