// js/utils.js
// Utility to get the correct path prefix based on current location
const getPathPrefix = () => window.location.pathname.includes('/pages/') ? '../' : '';

/**
 * Enhanced fetch wrapper to prevent "URL not provided" errors
 */
async function safeFetch(relativeRootPath) {
    const fullPath = getPathPrefix() + relativeRootPath;
    const response = await fetch(fullPath);
    if (!response.ok) throw new Error(`Could not fetch ${fullPath}: ${response.status}`);
    return response;
}
