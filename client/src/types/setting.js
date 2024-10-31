// settings.js

// Define the Settings constructor function
function Settings(theme, language, fontSize, fontFamily, showGitHubCorner) {
    this.theme = theme || 'light'; // Default theme
    this.language = language || 'en'; // Default language
    this.fontSize = fontSize || 16; // Default font size
    this.fontFamily = fontFamily || 'Arial'; // Default font family
    this.showGitHubCorner = showGitHubCorner !== undefined ? showGitHubCorner : true; // Default to true
}

// Define the SettingsContext constructor function
function SettingsContext(settings) {
    // Initialize with default settings or provided settings
    this.settings = settings || new Settings();
    
    // Setters for updating individual settings
    this.setTheme = (theme) => {
        this.settings.theme = theme;
    };
    
    this.setLanguage = (language) => {
        this.settings.language = language;
    };
    
    this.setFontSize = (fontSize) => {
        this.settings.fontSize = fontSize;
    };
    
    this.setFontFamily = (fontFamily) => {
        this.settings.fontFamily = fontFamily;
    };
    
    this.setShowGitHubCorner = (showGitHubCorner) => {
        this.settings.showGitHubCorner = showGitHubCorner;
    };

    // Reset settings to default values
    this.resetSettings = () => {
        this.settings = new Settings();
    };
}

// Exporting the Settings and SettingsContext constructors
export { Settings, SettingsContext };
