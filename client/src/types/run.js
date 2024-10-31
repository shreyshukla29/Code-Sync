// runContext.js

// Define the Language constructor function
function Language(language, version, aliases) {
    this.language = language;      // Language name
    this.version = version;        // Language version
    this.aliases = aliases || [];  // Array of aliases
}

// Define the RunContext constructor function
function RunContext() {
    this.input = '';                // Input code as a string
    this.output = '';               // Output result as a string
    this.isRunning = false;         // Flag to indicate if the code is running
    this.supportedLanguages = [];    // Array of supported Language objects
    this.selectedLanguage = null;   // Currently selected Language object

    // Method to set the input
    this.setInput = (input) => {
        this.input = input;
    };

    // Method to set the selected language
    this.setSelectedLanguage = (language) => {
        this.selectedLanguage = language;
    };

    // Method to run the code
    this.runCode = () => {
        // Implementation for running the code goes here
        // For example, this could involve sending the input to a server for execution
        console.log(`Running code in ${this.selectedLanguage.language}...`);
    };
}

// Exporting the Language constructor and RunContext constructor
export { Language, RunContext };
