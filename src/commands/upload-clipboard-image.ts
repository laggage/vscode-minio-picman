import { ProgressLocation, Uri, window, workspace } from 'vscode';
import { imageUploadService } from '../services/image-upload.service';
import getClipboardImage from '../utils/get-clipboard-image';
import * as fs from 'fs';
import { handleImageUploaded } from '../utils/handle-image-uploaded';
import path = require('path');

const noImagePath = 'no image';

export const uploadClipboardImage = async () => {
    const clipboardImage = await getClipboardImage();
    if (clipboardImage.imgPath === noImagePath) {
        window.showWarningMessage('No image found in clipboard');
        return;
    }

    try {
        const imageLink = await window.withProgress(
            { title: 'Uploading image', location: ProgressLocation.Notification },
            async p => {
                p.report({ increment: 10 });
                return await imageUploadService.upload(
                    fs.createReadStream(clipboardImage.imgPath),
                    path.basename(clipboardImage.imgPath)
                );
            }
        );
        handleImageUploaded(imageLink);
    } finally {
        if (!clipboardImage.shouldKeepAfterUploading) {
            workspace.fs.delete(Uri.file(clipboardImage.imgPath));
        }
    }
};
