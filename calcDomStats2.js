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
        if (node.nodeType === 3) {
            stats.totalTextNodes++; 
        } else if (node.nodeType === 1) {
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

