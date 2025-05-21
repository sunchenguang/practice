function calcDomStats() {
    const root = document.documentElement;
    let elementCount = 0;
    let maxDepth = 0;
    let maxChildren = 0;


    function traverse(node, depth) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            elementCount++;
            maxDepth = Math.max(maxDepth, depth);
            maxChildren = Math.max(maxChildren, node.children.length);

            for (let i = 0; i < node.children.length; i++) {
                traverse(node.children[i], depth + 1)
            }
        }
    }


    traverse(root, 1)


}
