
/* eslint-disable no-unused-vars */
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { 

  vscodeDark, 
  dracula, 
  githubDark, 
  materialDark,
  nord 
} from "@uiw/codemirror-themes-all";


import Sidebar from './sidebar/Sidebar';
import FileTab from './editor/FileTab';
import { useSelector } from 'react-redux';


function Editor() {

  const {openFiles,activeFile} = useSelector((state)=>state.file)

  const [value, setValue] = React.useState("console.log('hello world!');");
  const [language, setLanguage] = React.useState('javascript');
  const [theme, setTheme] = React.useState('vscodeDark');

  const onChange = React.useCallback((val) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setValue("");
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const getLanguage = () => {
    switch (language) {
      case 'javascript':
        return javascript({ jsx: true });
      case 'python':
        return python();
      case 'html':
        return html();
      default:
        return javascript({ jsx: true });
    }
  };

  // Theme mapping
  const getTheme = () => {
    switch (theme) {
      case 'dracula':
        return dracula;
      case 'githubDark':
        return githubDark;
      case 'materialDark':
        return materialDark;
      case 'nord':
        return nord;
      case 'vscodeDark':
      default:
        return vscodeDark;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
        <FileTab />
        
        <div className="flex-grow overflow-scroll no-scrollbar h-full mb-1 border-t max-w-full">
            {openFiles.length > 0 ? (
                <CodeMirror
                    value={activeFile?.content || ""}
                    theme={getTheme()}
                    height="calc(100vh - 32px)" // Adjust height for any header
                    extensions={[
                        getLanguage(), // Use the language function correctly
                        getTheme(), // Apply the selected theme
                    ]}
                    minHeight="100%"
                    maxWidth="100vw"
                    onChange={onChange}
                />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mb-4 text-gray-400" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
              >
                  <path d="M8 2a2 2 0 012-2h4a2 2 0 012 2v6h-2V2H10v4H8V2zm5 6a2 2 0 00-2-2H2a2 2 0 00-2 2v6a2 2 0 002 2h9a2 2 0 002-2V8zm-1 6H2V8h9v6z" />
              </svg>
              <p className="text-lg font-semibold">No file open</p>
              <p className="text-sm text-gray-400 mt-2">
                  Select a file from the sidebar to start editing.
              </p>
          </div>
            )}
        </div>
    </div>
);
}

export default Editor;
