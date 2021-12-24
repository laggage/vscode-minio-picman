export const formatImageLink = (imageLink: string, format: 'markdown' | 'html' | 'raw') => {
    switch (format) {
        case 'html':
            return `<img src="${imageLink}">`;
        case 'markdown':
            return `![image](${imageLink})`;
        default:
            return imageLink;
    }
};
