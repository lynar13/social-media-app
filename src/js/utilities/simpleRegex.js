// Find a fragment anywhere in the string
function findFragmentAnywhere(form, stringToSearch) {
    const regex = new RegExp(form, 'i');
    return regex.test(stringToSearch);
}

// Find a fragment at the start of the string
function findFragmentAtStart(form, stringToSearch) {
    const regex = new RegExp(`^${form}`, 'i');
    return regex.test(stringToSearch);
}

// Find a fragment at the end of the string
function findFragmentAtEnd(form, stringToSearch) {
    const regex = new RegExp(`${form}$`, 'i');
    return regex.test(stringToSearch);
}

// Find a whole word in the string
function findWholeWord(form, stringToSearch) {
    const regex = new RegExp(`\\b${form}\\b`, 'i');
    return regex.test(stringToSearch);
}

// Count occurrences of a fragment in the string
function countOccurrences(form, stringToSearch) {
    const regex = new RegExp(form, 'gi');
    const matches = stringToSearch.match(regex);
    return matches ? matches.length : 0;
}
