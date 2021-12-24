import { ExtensionContext } from 'vscode';

let _extContext: ExtensionContext | undefined;

export class AppContext {
    static init(context: ExtensionContext) {
        _extContext = context;
    }

    static get extContext(): ExtensionContext {
        return _extContext!;
    }

    static get extName(): string {
        return this.extContext.extension.packageJSON.name;
    }
}
