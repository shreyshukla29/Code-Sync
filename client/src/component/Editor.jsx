/* eslint-disable react/prop-types */
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


function Editor({openFiles , closeFile , activeFile,setActiveFile}) {

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
    <div className="flex h-screen w-full">
    
      <div className=" flex flex-col flex-grow p-4">
        <FileTab openFiles={openFiles} closeFile={closeFile} activeFile={activeFile} setActiveFile={setActiveFile} />
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
      </div>
    </div>
  );
}

export default Editor;
