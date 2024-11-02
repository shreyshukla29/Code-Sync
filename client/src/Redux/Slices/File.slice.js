// fileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileStructure: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'App.js', type: 'file' ,content:""},
        { name: 'index.js', type: 'file',content:"" },
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'Header.js', type: 'file' ,content:""},
            { name: 'Footer.js', type: 'file',content:"" },
          ],
        },
      ],
    },
    { name: 'README.md', type: 'file' ,content:""},
  ],
  openFiles: [],
  fileContents: {},  // Store content of each file here
  activeFile: null,  // Track the currently opened file in editor
};

const fileSlice = createSlice({
  name: 'fileSystem',
  initialState,
  reducers: {
    addFileOrFolder: (state, action) => {
      const { parentPath, name, type } = action.payload;
      const parentFolder = findFolder(state.fileStructure, parentPath);
      if (parentFolder && parentFolder.type === 'folder') {
        parentFolder.children.push({ name, type, children: type === 'folder' ? [] : undefined });
      }
    },
    deleteFileOrFolder: (state, action) => {
      const { parentPath, name } = action.payload;
      const parentFolder = findFolder(state.fileStructure, parentPath);
      if (parentFolder) {
        parentFolder.children = parentFolder.children.filter((item) => item.name !== name);
      }
      delete state.fileContents[name];
    },
    renameFileOrFolder: (state, action) => {
      const { path, newName } = action.payload;
      const item = findFolder(state.fileStructure, path);
      if (item) {
        // Update both structure and content reference
        const oldName = item.name;
        item.name = newName;
        if (state.fileContents[oldName]) {
          state.fileContents[newName] = state.fileContents[oldName];
          delete state.fileContents[oldName];
        }
      }
    },
    openFile: (state, action) => {
      const filePath = action.payload;
      if (!state.openFiles.includes(filePath)) {
        state.openFiles.push(filePath);
      }
      state.activeFile = filePath;
    },
    closeFile: (state, action) => {
      const filePath = action.payload;
      state.openFiles = state.openFiles.filter((file) => file !== filePath);
      if (state.activeFile === filePath) {
        state.activeFile = state.openFiles[0] || null;
      }
    },
    setActiveFile: (state, action) => {
      state.activeFile = action.payload;
    },
    updateFileContent: (state, action) => {
      const { filePath, content } = action.payload;
      state.fileContents[filePath] = content;
    },
    saveFileContent: (state, action) => {
      const filePath = action.payload;
      // Simulate saving file, e.g., saving to server or local storage
      console.log(`File ${filePath} saved with content:`, state.fileContents[filePath]);
    },
  },
});

export const {
  addFileOrFolder,
  deleteFileOrFolder,
  renameFileOrFolder,
  openFile,
  closeFile,
  setActiveFile,
  updateFileContent,
  saveFileContent,
} = fileSlice.actions;
export default fileSlice.reducer;

function findFolder(fileStructure, path) {
  let folder = { children: fileStructure };
  path.forEach((segment) => {
    folder = folder.children.find((item) => item.name === segment && item.type === 'folder');
    if (!folder) return null;
  });
  return folder;
}


