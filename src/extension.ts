import { ExtensionContext } from 'vscode';
import { registerCommands } from './commands/commands-registration';
import { MinioConfigurationProvider } from './services/minio-configuration-prodiver.service';
import { AppContext } from './utils/app-context';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    AppContext.init(context);
    MinioConfigurationProvider.migrateOld();
    registerCommands();
}

// this method is called when your extension is deactivated
export function deactivate() {}
