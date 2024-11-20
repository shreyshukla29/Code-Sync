
 /* eslint-disable no-unused-vars */
// import Select from "../../common/Select"

// import { editorFonts } from "../../../resources/Fonts"
// import { editorThemes } from "../../../resources/Themes"
// import { langNames } from "@uiw/codemirror-extensions-langs"
// import { ChangeEvent, useEffect } from "react"
// import { useSettings } from './../../../context/SettingContext';
// import useResponsive from './../../../hooks/useResponsive';
// function SettingsView() {
//     const {
//         theme,
//         setTheme,
//         language,
//         setLanguage,
//         fontSize,
//         setFontSize,
//         fontFamily,
//         setFontFamily,
//         showGitHubCorner,
//         setShowGitHubCorner,
//         resetSettings,
//     } = useSettings()
//     const { viewHeight } = useResponsive()

//     const handleFontFamilyChange = (e) =>
//         setFontFamily(e.target.value)
//     const handleThemeChange = (e) =>
//         setTheme(e.target.value)
//     const handleLanguageChange = (e) =>
//         setLanguage(e.target.value)
//     const handleFontSizeChange = (e) =>
//         setFontSize(parseInt(e.target.value))
//     const handleShowGitHubCornerChange = (e) =>
//         setShowGitHubCorner(e.target.checked)

//     useEffect(() => {
//         // Set editor font family
//         const editor = document.querySelector(
//             ".cm-editor > .cm-scroller",
//         ) 
//         if (editor !== null) {
//             editor.style.fontFamily = `${fontFamily}, monospace`
//         }
//     }, [fontFamily])

//     return (
//         <div
//             className="flex flex-col items-center gap-2 p-4"
//             style={{ height: viewHeight }}
//         >
//             <h1 className="view-title">Settings</h1>
//             {/* Choose Font Family option */}
//             <div className="flex w-full items-end gap-2">
//                 <Select
//                     onChange={handleFontFamilyChange}
//                     value={fontFamily}
//                     options={editorFonts}
//                     title="Font Family"
//                 />
//                 {/* Choose font size option */}
//                 <select
//                     value={fontSize}
//                     onChange={handleFontSizeChange}
//                     className="rounded-md border-none bg-darkHover px-4 py-2 text-white outline-none"
//                     title="Font Size"
//                 >
//                     {[...Array(13).keys()].map((size) => {
//                         return (
//                             <option key={size} value={size + 12}>
//                                 {size + 12}
//                             </option>
//                         )
//                     })}
//                 </select>
//             </div>
//             {/* Choose theme option */}
//             <Select
//                 onChange={handleThemeChange}
//                 value={theme}
//                 options={Object.keys(editorThemes)}
//                 title="Theme"
//             />
//             {/* Choose language option */}
//             <Select
//                 onChange={handleLanguageChange}
//                 value={language}
//                 options={langNames}
//                 title="Language"
//             />
//             {/* Show GitHub corner option */}
//             <div className="mt-4 flex w-full items-center justify-between">
//                 <label>Show github corner</label>
//                 <label className="relative inline-flex cursor-pointer items-center">
//                     <input
//                         className="peer sr-only"
//                         type="checkbox"
//                         onChange={handleShowGitHubCornerChange}
//                         checked={showGitHubCorner}
//                     />
//                     <div className="peer h-6 w-12 rounded-full bg-darkHover outline-none duration-100 after:absolute after:left-1 after:top-1 after:flex after:h-4 after:w-4 after:items-center after:justify-center after:rounded-full after:bg-white after:font-bold after:outline-none after:duration-500 peer-checked:after:translate-x-6 peer-checked:after:border-white peer-focus:outline-none"></div>
//                 </label>
//             </div>
//             <button
//                 className="mt-auto w-full rounded-md border-none bg-darkHover px-4 py-2 text-white outline-none"
//                 onClick={resetSettings}
//             >
//                 Reset to default
//             </button>
//         </div>
//     )
// }

// export default SettingsView

import React, { useState } from 'react';

function Settings() {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Space Mono');
  const [theme, setTheme] = useState('Dracula');
  const [language, setLanguage] = useState('Javascript');
  const [showGithubCorner, setShowGithubCorner] = useState(false);

  return (
    <div className="flex flex-col w-full p-4 bg-zinc-800 text-white rounded-lg gap-6
    h-screen">
      <h2 className="text-lg font-semibold">Settings</h2>
      <hr className="border-gray-600" />
      {/* Font Family */}
      <div className="flex flex-col justify-between gap-1
      w-full">
        <label className="text-sm">Font Family</label>
        <div className="flex space-x-2 w-full">
          <select
            className="bg-gray-700 p-2 rounded text-white
            text-sm w-full"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option>Space Mono</option>
            <option>Roboto Mono</option>
            <option>Courier New</option>
          </select>
          <input
            type="number"
            className="w-12 bg-gray-700 p-2 rounded text-white
            text-sm"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Theme */}
      <div className="flex flex-col justify-between">
        <label className="text-sm">Theme</label>
        <select
          className="bg-gray-700 p-2 rounded w-full text-white
          text-sm "
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >

          <option>Dracula</option>
          <option>Light</option>
          <option>Solarized Dark</option>
        </select>
      </div>

      {/* Language */}
      <div className="flex flex-col justify-between">
        <label className="text-sm">Language</label>
        <select
          className="bg-gray-700 p-2 rounded w-full text-white"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>Javascript</option>
          <option>Python</option>
          <option>Java</option>
        </select>
      </div>

      {/* Reset Button */}
      <div className="flex h-full w-full">
      <button
        className="w-full  bg-gray-700 py-2 rounded text-white hover:bg-gray-600 mt-auto "
        onClick={() => {
          setFontSize(16);
          setFontFamily('Space Mono');
          setTheme('Dracula');
          setLanguage('Javascript');
          setShowGithubCorner(false);
        }}
      >
        Reset to default
      </button>
      </div>
    </div>
  );
}

export default Settings;
