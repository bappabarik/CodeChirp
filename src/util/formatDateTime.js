export default function formatDateTime(dateTime){
    const created = new Date(dateTime);

    const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true 
    };

    const formattedDate = created.toLocaleDateString('en-US', options);
    return formattedDate
}