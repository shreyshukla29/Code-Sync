
import Editor from './../component/Editor';
import Sidebar from './../component/sidebar/Sidebar';
function EditorPage() {
    return (
        <div className="flex h-screen"> 
        <Sidebar/>
           <Editor></Editor>
        </div>
    );
}

export default EditorPage;