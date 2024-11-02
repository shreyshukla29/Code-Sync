/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import FileStructureView from "../..//files/FileStructureView"


// import { useFileSystem } from "../../../context/FileContext"
// import useResponsive from "../../../hooks/useResponsive"
// import { FileSystemItem } from "../../../types/file"
// import cn from "classnames"
// import { BiArchiveIn } from "react-icons/bi"
// import { TbFileUpload } from "react-icons/tb"
// import { v4 as uuidV4 } from "uuid"
// import { toast } from "react-hot-toast"

// function FilesView() {
//     const { downloadFilesAndFolders, updateDirectory } = useFileSystem()
//     const { viewHeight } = useResponsive()
//     const { minHeightReached } = useResponsive()

//     const handleOpenDirectory = async () => {
//         if ("showDirectoryPicker" in window) {
//             try {
//                 const directoryHandle = await window.showDirectoryPicker()
//                 toast.loading("Getting files and folders...")
//                 const structure = await readDirectory(directoryHandle)
//                 updateDirectory("", structure)
//             } catch (error) {
//                 console.error("Error opening directory:", error)
//             }
//         } else {
//             alert(
//                 "The File System Access API is not supported in this browser.",
//             )
//         }
//     }

//     const readDirectory = async (
//         directoryHandle
//     )=> {
//         const children = []
//         const blackList = ["node_modules", ".git", ".vscode", ".next"]

//         for await (const entry of directoryHandle.values()) {
//             if (entry.kind === "file") {
//                 const file = await entry.getFile()
//                 const newFile = {
//                     id: uuidV4(),
//                     name: entry.name,
//                     type: "file",
//                     content: await file.text(),
//                 }
//                 children.push(newFile)
//             } else if (entry.kind === "directory") {
//                 if (blackList.includes(entry.name)) continue

//                 const newDirectory = {
//                     id: uuidV4(),
//                     name: entry.name,
//                     type: "directory",
//                     children: await readDirectory(entry),
//                     isOpen: false,
//                 }
//                 children.push(newDirectory)
//             }
//         }
//         return children
//     }

//     return (
//         <div
//             className="flex select-none flex-col gap-1 px-4 py-2 text-white"
//             style={{ height: viewHeight, maxHeight: viewHeight }}
//         >
//             <FileStructureView />
//             <div
//                 className={cn(`flex min-h-fit flex-col justify-end pt-2`, {
//                     hidden: minHeightReached,
//                 })}
//             >
//                 <hr />
//                 <button
//                     className="mt-2 flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
//                     onClick={handleOpenDirectory}
//                 >
//                     <TbFileUpload className="mr-2" size={24} />
//                     Open File/Folder
//                 </button>
//                 <button
//                     className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
//                     onClick={downloadFilesAndFolders}
//                 >
//                     <BiArchiveIn className="mr-2" size={22} /> Download Code
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default FilesView



// FileExplorer.js
import  { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaPlusSquare, FaFolderPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const FileExplorer = ({openFile}) => {
  const [fileStructure, setFileStructure] = useState([
    { name: 'src', type: 'folder', children: [
        { name: 'App.js', type: 'file' },
        { name: 'index.js', type: 'file' },
      ] 
    },
    { name: 'public', type: 'folder', children: [
        { name: 'index.html', type: 'file',content:"" },
      ] 
    },
    { name: 'README.md', type: 'file',content :"hello" },
  ]);

  //const {fileStrucutre} = useSelector((state)=>state.file)



  const addFile = (parentFolder) => {
    const newFileName = prompt('Enter file name');
    if (!newFileName) return;

    const updatedStructure = addToFolder(fileStructure, parentFolder, { name: newFileName, type: 'file' });
    setFileStructure(updatedStructure);
  };

  const addFolder = (parentFolder) => {
    const newFolderName = prompt('Enter folder name');
    if (!newFolderName) return;

    const updatedStructure = addToFolder(fileStructure, parentFolder, { name: newFolderName, type: 'folder', children: [] });
    setFileStructure(updatedStructure);
  };


  const addToFolder = (structure, folder, newItem) => {
    return structure.map((item) => {
      if (item === folder) {
        return { ...item, children: [...item.children, newItem] };
      } else if (item.type === 'folder') {
        return { ...item, children: addToFolder(item.children, folder, newItem) };
      }
      return item;
    });
  };


  const renderTree = (items, level = 0) => {
    return items.map((item) => {
      if (item.type === 'folder') {
        return (
          <FolderNode
            key={item.name}
            item={item}
            level={level}
            onAddFile={() => addFile(item)}
            onAddFolder={() => addFolder(item)}
            openFile = {openFile}
          />
        );
      } else if (item.type === 'file') {
        return <FileNode key={item.name} item={item} level={level} onOpenFile={() => openFile(item)} />;
      }
      return null;
    });
  };

  return (
    <div className="flex w-full">
      <div className="w-full p-2 bg-gray-800 text-gray-300 h-screen">
        <h2 className="text-lg font-bold mb-4">File Explorer</h2>
        {renderTree(fileStructure)}
      </div>
    </div>
  );
};

const FolderNode = ({ item, level, onAddFile, onAddFolder,openFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        className={`flex items-center ml-${level * 4} space-x-2 cursor-pointer text-blue-400`}
        onClick={toggleOpen}
      >
        {isOpen ? <FaFolderOpen /> : <FaFolder />}
        <span className="font-semibold">{item.name}</span>
        <button onClick={(e) => { e.stopPropagation(); onAddFile(); }} className="text-gray-400 hover:text-gray-200 ml-2">
          <FaPlusSquare className="text-xs" title="Add File" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onAddFolder(); }} className="text-gray-400 hover:text-gray-200">
          <FaFolderPlus className="text-xs" title="Add Folder" />
        </button>
      </div>
      {isOpen && <div className="ml-4">{item.children && item.children.map((child) => {
        return child.type === 'folder' ? (
          <FolderNode key={child.name} item={child} level={level + 1} onAddFile={onAddFile} onAddFolder={onAddFolder} />
        ) : (
          <FileNode key={child.name} item={child} level={level + 1} onOpenFile={() => openFile(child)} />
        );
      })}</div>}
    </div>
  );
};

const FileNode = ({ item, level, onOpenFile }) => {
  return (
    <div
      className={`flex items-center ml-${level * 4} text-gray-300 cursor-pointer hover:text-white`}
      onClick={onOpenFile}
    >
      <FaFile className="mr-2 text-blue-400" />
      {item.name}
    </div>
  );
};

export default FileExplorer;
