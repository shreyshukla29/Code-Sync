const VIEWS = {
    FILES: "FILES",
    CHATS: "CHATS",
    CLIENTS: "CLIENTS",
    RUN: "RUN",
    SETTINGS: "SETTINGS",
};

class ViewContext {
    constructor(activeView, isSidebarOpen, viewComponents, viewIcons) {
        this.activeView = activeView;
        this.isSidebarOpen = isSidebarOpen;
        this.viewComponents = viewComponents; // This should be an object where keys are from VIEWS
        this.viewIcons = viewIcons;           // This should be an object where keys are from VIEWS
    }

    setActiveView(activeView) {
        this.activeView = activeView;
    }

    setIsSidebarOpen(isSidebarOpen) {
        this.isSidebarOpen = isSidebarOpen;
    }
}

// Exporting the constants and classes
export { VIEWS, ViewContext };
