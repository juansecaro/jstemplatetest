// Object mapping template names to file paths
const templatePaths = {
    template1: 'templates/template1.html',
    template2: 'templates/template2.html',
    // Add more templates as needed
};

// Function to load template from file
async function loadTemplate(templateName) {
    try {
        const response = await fetch(templatePaths[templateName]);
        const templateHTML = await response.text();
        return templateHTML;
    } catch (error) {
        console.error("Error loading template:", error);
    }
}

// Function to render template with variables
async function renderTemplate(templateName, variables) {
    const templateHTML = await loadTemplate(templateName);
    if (templateHTML) {
        const renderedHTML = interpolateVariables(templateHTML, variables);
        const container = document.getElementById('templateContainer');
        container.innerHTML = renderedHTML;
    }
}

// Function to interpolate variables into template
function interpolateVariables(templateHTML, variables) {
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        templateHTML = templateHTML.replace(regex, value);
    }
    return templateHTML;
}

// Function to dynamically load and execute additional JavaScript files
async function loadAndExecuteScript(scriptPath) {
    try {
        const response = await fetch(scriptPath);
        const scriptContent = await response.text();
        const scriptElement = document.createElement('script');
        scriptElement.text = scriptContent;
        document.body.appendChild(scriptElement);
    } catch (error) {
        console.error("Error loading script:", error);
    }
}

// Example usage
const templateVariables = {
    name: 'John',
    age: 30,
    job: 'Engineer'
    // Add more variables as needed
};

renderTemplate('template1', templateVariables);
loadAndExecuteScript('additional.js');
