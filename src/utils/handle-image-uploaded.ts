import { env, MessageOptions, SnippetString, window } from 'vscode';
import { formatImageLink } from './format-image-link';

export const handleImageUploaded = async (imageLink: string) => {
    const textEditor = window.activeTextEditor;
    if (textEditor && textEditor.document.languageId === 'markdown') {
        textEditor.insertSnippet(new SnippetString(formatImageLink(imageLink, 'markdown')));
    } else {
        const copyOptions = ['Copy Image Link(Markdown)', 'Copy Image Link(Html)', 'Copy Image Link(Raw)'];
        const selected = await window.showInformationMessage(
            '图片上传成功',
            {
                modal: true,
                detail: imageLink,
            } as MessageOptions,
            ...copyOptions
        );
        let textToCopy = '';
        switch (selected) {
            case copyOptions[0]:
                textToCopy = formatImageLink(imageLink, 'markdown');
                break;
            case copyOptions[1]:
                textToCopy = formatImageLink(imageLink, 'html');
                break;
            case copyOptions[2]:
                textToCopy = imageLink;
                break;
        }
        if (textToCopy) {
            await env.clipboard.writeText(textToCopy);
        }
    }
};
