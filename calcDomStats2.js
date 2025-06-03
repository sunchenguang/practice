function calcDomStats2(dom) {
    const stats = {
        totalNodes: 0,
        totalTextNodes: 0,
        totalElements: 0,
    }
    const queue = [dom];
    while (queue.length > 0) {
        const node = queue.shift();
        stats.totalNodes++;
        if (node.nodeType === Node.TEXT_NODE) {
            stats.totalTextNodes++; 
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            stats.totalElements++;
        }
        if (node.children) {
            queue.push(...node.children);
        }
    }   
    return stats;
}   

// Example usage:
const dom = document.body;
const stats = calcDomStats2(dom);
console.log(stats);

