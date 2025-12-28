// FIXED CSV PARSER - Replace the parseCSV function in your HTML file

function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    if (lines.length === 0) return [];
    
    // Get headers from first line
    const headerLine = lines[0];
    const headers = parseCSVLine(headerLine);
    
    // Parse data rows
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue; // Skip empty lines
        
        const values = parseCSVLine(lines[i]);
        const obj = {};
        
        headers.forEach((header, index) => {
            let value = values[index] || '';
            
            // Handle Points column - remove commas and convert to number
            if (header === 'Points') {
                obj[header] = parseInt(value.replace(/,/g, ''));
            } 
            // Handle Rank column - convert to number
            else if (header === 'Rank') {
                obj[header] = parseInt(value);
            } 
            // All other columns - keep as string
            else {
                obj[header] = value;
            }
        });
        
        data.push(obj);
    }
    
    return data;
}

// Helper function to parse a single CSV line
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Handle escaped quotes
                current += '"';
                i++; // Skip next quote
            } else {
                // Toggle quote state
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            // Found field separator
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    // Add last field
    result.push(current);
    
    return result;
}
