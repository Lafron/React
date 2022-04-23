export default function paginate(items, pageNumber, pageSize) {
    if (items) {
        const startIndex = (pageNumber - 1) * pageSize;
        return [...items].splice(startIndex, pageSize);
    } else {
        return null;
    }
}
