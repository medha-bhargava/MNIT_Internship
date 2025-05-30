function formatAuthors(authorsList = []) {
  // authorsList is array of strings like ['Rohit Lohar', 'Meenakshi Tripathi']
  return authorsList.map(author => {
    const parts = author.trim().split(' ');
    const lastName = parts.pop();
    const firstInitial = parts.length > 0 ? parts[0][0] + '.' : '';
    return `${firstInitial} ${lastName}`;
  }).join(', ');
}

function formatIEEEDate(dateStr) {
  if (!dateStr) return ''; // no date given
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  const date = new Date(dateStr);
  if (isNaN(date)) return ''; // invalid date
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function convertToIEEEFormat(publications = []) {
  return publications.map(pub => {
    const formattedAuthors = formatAuthors(pub.pAuthors || []);
    const formattedDate = formatIEEEDate(pub.pDate || pub.dateFrom); // try pDate else fallback
    // Use pVenue or fallbacks (e.g. journalName, conferenceName) to form citation venue
    const venue = pub.pVenue || pub.journalName || pub.conferenceName || '';
    const citation = `${formattedAuthors}, “${pub.pTitle}”, ${venue ? venue + ', ': ''}${formattedDate ? formattedDate : pub.pYear}.`;
    return {
      pType: pub.pType,
      ieeeCitation: citation
    };
  });
}

export { convertToIEEEFormat };




// function formatAuthors(authorsList) {
//     return authorsList.map(author => {
//         const parts = author.trim().split(' ');
//         const lastName = parts.pop();
//         const firstInitial = parts.length > 0 ? parts[parts.length - 1][0] + '.' : '';
//         return `${firstInitial} ${lastName}`;
//     }).join(' and ');
// }

// function formatIEEEDate(dateStr) {
//     const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
//     const date = new Date(dateStr);
//     return `${months[date.getMonth()]} ${date.getFullYear()}`;
// }

// function convertToIEEEFormat(publications) {
//     const formatted = publications.map(pub => {
//         const formattedAuthors = formatAuthors(pub.pAuthors);
//         const formattedDate = formatIEEEDate(pub.pDate);
//         const citation = `${formattedAuthors}, “${pub.pTitle},” ${pub.pVenue}, ${formattedDate}.`;
//         return {
//             type: pub.pType,
//             ieeeCitation: citation
//         };
//     });
//     return formatted;
// }
// export { convertToIEEEFormat };