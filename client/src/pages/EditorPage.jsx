
import Editor from './../component/Editor';
import Sidebar from './../component/sidebar/Sidebar';
import { useState } from 'react';
function EditorPage() {
    const [openFiles, setOpenFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const openFile = (fileName) => {
       console.log(fileName)
        if (!openFiles.includes(fileName)) {
          setOpenFiles([...openFiles, fileName]);
        }
        setActiveFile(fileName);
      };
      const closeFile = (fileName) => {
        setOpenFiles(openFiles.filter((file) => file !== fileName));
        if (activeFile === fileName) {
          setActiveFile(openFiles[openFiles.length - 2] || null);
        }
      };
    return (
        <div className="flex h-screen"> 
           <Sidebar openFile={openFile} closeFile={closeFile}/>
           <Editor openFiles={openFiles} closeFile={closeFile} activeFile={activeFile} setActiveFile={setActiveFile}></Editor>
        </div>
    );
}

export default EditorPage;