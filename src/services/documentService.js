import { dummyDocuments } from "../data/documents";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const documentService = {
  async getFolders() {
    await delay(250);
    return dummyDocuments.map(folder => ({
      folderId: folder.folderId,
      folderName: folder.folderName,
      description: folder.description,
      fileCount: folder.files.length
    }));
  },

  async getFolderById(folderId) {
    await delay(150);
    const folder = dummyDocuments.find(f => f.folderId === folderId);
    if (!folder) throw new Error("Folder not found");
    return folder;
  },

  async getFileById(fileId) {
    await delay(150);
    for (const folder of dummyDocuments) {
      const file = folder.files.find(f => f.id === fileId);
      if (file) {
        return {
          ...file,
          folderId: folder.folderId,
          folderName: folder.folderName
        };
      }
    }
    throw new Error("File not found");
  }
};
