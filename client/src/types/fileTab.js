/* eslint-disable no-unused-vars */
import { FileSystemItem } from "./file";

const FileTabContext = {
    activeFile: null, // or FileSystemItem
    setActiveFile: function (file) {},
    changeActiveFile: function (fileId) {}
};

export { FileTabContext };
