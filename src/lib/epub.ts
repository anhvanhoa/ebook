import JSZip from 'jszip';

export interface EpubData {
    zip: JSZip;
    opfContent: string;
    opfPath: string;
}

/**
 * Load và giải nén file EPUB, lấy nội dung file OPF (metadata của sách)
 * @param file File EPUB đầu vào
 * @returns Đối tượng chứa zip, opfContent, và opfPath
 */
export async function loadEpub(file: File): Promise<EpubData> {
    try {
        const zip = await JSZip.loadAsync(file);

        // Đọc file container.xml để tìm đường dẫn đến OPF
        const containerFile = zip.file('META-INF/container.xml');
        if (!containerFile) throw new Error('Không tìm thấy container.xml');

        const containerXml = await containerFile.async('text');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(containerXml, 'text/xml');

        // Lấy đường dẫn đến file OPF
        const rootfile = xmlDoc.querySelector('rootfile');
        const opfPath = rootfile?.getAttribute('full-path');
        if (!opfPath) throw new Error('Không tìm thấy OPF file');

        // Đọc nội dung OPF
        const opfFile = zip.file(opfPath);
        if (!opfFile) throw new Error(`Không tìm thấy file OPF: ${opfPath}`);

        const opfContent = await opfFile.async('text');
        return { zip, opfContent, opfPath };
    } catch (error) {
        throw new Error(`Lỗi khi tải EPUB: ${error}`);
    }
}

/**
 * Phân tích file OPF để lấy danh sách chương trong EPUB
 * @param opfXml Nội dung XML của file OPF
 * @returns Mảng chứa ID của các chương
 */
export function parseChapters(opfXml: string): string[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(opfXml, 'text/xml');

    const chapters: string[] = [];
    const spine = xmlDoc.getElementsByTagName('spine')[0];

    if (!spine) {
        console.warn('Không tìm thấy thẻ <spine> trong OPF.');
        return chapters;
    }

    const items = spine.getElementsByTagName('itemref');

    for (let i = 0; i < items.length; i++) {
        const idref = items[i].getAttribute('idref');
        if (idref) chapters.push(idref);
    }

    return chapters;
}
