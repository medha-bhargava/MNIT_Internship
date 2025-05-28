
function formatAuthors(authorsList) {
    return authorsList.map(author => {
        const parts = author.trim().split(' ');
        const lastName = parts.pop();
        const firstInitial = parts.length > 0 ? parts[parts.length - 1][0] + '.' : '';
        return `${firstInitial} ${lastName}`;
    }).join(' and ');
}

function formatIEEEDate(dateStr) {
    const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    const date = new Date(dateStr);
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function convertToIEEEFormat(publications) {
    const formatted = publications.map(pub => {
        const formattedAuthors = formatAuthors(pub.pAuthors);
        const formattedDate = formatIEEEDate(pub.pDate);
        const citation = `${formattedAuthors}, “${pub.pTitle},” ${pub.pVenue}, ${formattedDate}.`;
        return {
            type: pub.pType,
            ieeeCitation: citation
        };
    });
    return formatted;
}
export { convertToIEEEFormat };