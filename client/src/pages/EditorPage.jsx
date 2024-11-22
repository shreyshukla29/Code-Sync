
import Editor from './../component/Editor';
import Sidebar from './../component/sidebar/Sidebar';
import { useState } from 'react';
function EditorPage() {
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Space Mono');
    const [theme, setTheme] = useState('Dracula');
    const [language, setLanguage] = useState('javascript');
    return (
        <div className="flex h-screen"> 
           <Sidebar theme={theme} language={language} 
           fontSize={fontSize} fontFamily={fontFamily} setTheme={setTheme} setLanguage={setLanguage} setFontFamily={setFontFamily} setFontSize={setFontSize}/>
           <Editor theme={theme} language={language} 
           fontSize={fontSize} fontFamily={fontFamily}></Editor>
        </div>
    );
}

export default EditorPage;