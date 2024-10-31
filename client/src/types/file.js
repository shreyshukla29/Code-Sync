/* eslint-disable no-unused-vars */
// Type aliases
const Id = String;
const FileName = String;
const FileContent = String;

// File system item structure
const FileSystemItem = {
    id: "",
    name: "",
    type: "file", // or "directory"
    children: [], // optional
    content: "", // optional
    isOpen: false // optional
};

// File context structure
const FileContext = {
    fileStructure: FileSystemItem,
    openFiles: [],
    activeFile: null,
    setActiveFile: function (file) {},
    closeFile: function (fileId) {},
    toggleDirectory: function (dirId) {},
    collapseDirectories: function () {},
    createDirectory: function (parentDirId, name) {
        return ""; // returns Id
    },
    updateDirectory: function (dirId, children) {},
    renameDirectory: function (dirId, newName) {},
    deleteDirectory: function (dirId) {},
    createFile: function (parentDirId, name) {
        return ""; // returns Id
    },
    updateFileContent: function (fileId, content) {},
    openFile: function (fileId) {},
    renameFile: function (fileId, newName) {
        return false; // returns boolean
    },
    deleteFile: function (fileId) {},
    downloadFilesAndFolders: function () {}
};

export { FileSystemItem, FileContent, FileContext, Id, FileName };
