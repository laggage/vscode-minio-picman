import { commands } from 'vscode';
import { AppContext } from '../utils/app-context';
import { uploadLocalDiskImage } from './upload-local-disk-image';

export const registerCommands = () => {
    AppContext.extContext.subscriptions.push(
        commands.registerCommand(`${AppContext.extName}.upload-local-disk-image`, uploadLocalDiskImage)
    );
};
