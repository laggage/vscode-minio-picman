import { MessageOptions, ProgressLocation, window } from 'vscode';
import * as fs from 'fs';
import { imageUploadService } from '../services/image-upload.service';
import path = require('path');
import { handleImageUploaded } from '../utils/handle-image-uploaded';

export const uploadLocalDiskImage = async () => {
    const fileUri = ((await window.showOpenDialog({
        title: 'Select image',
        filters: {
            image: ['png', 'jpg', 'bpm', 'jpeg', 'webp', 'svg', 'gif'],
        },
        canSelectMany: false,
    })) ?? [])[0];
    if (!fileUri) {
        return;
    }
    const { fsPath: filePath } = fileUri;
    const fileName = path.basename(filePath);
    const imageLink = await window.withProgress(
        { title: 'Uploading image', location: ProgressLocation.Notification },
        async p => {
            p.report({ increment: 10 });
            let imageLink = '';
            try {
                imageLink = await imageUploadService.upload(fs.createReadStream(filePath), fileName);
            } catch (err) {
                window.showErrorMessage('Failed to upload image', {
                    detail: err instanceof Error ? err.message : JSON.stringify(err),
                    modal: true,
                } as MessageOptions);
            }

            p.report({ increment: 100 });
            return imageLink;
        }
    );
    handleImageUploaded(imageLink);
};
