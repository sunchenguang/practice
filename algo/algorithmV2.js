/**
 * 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。
 * @param {number[]} arr - 输入的数字数组
 * @returns {number[][]} - 返回所有可能的排列组合
 */
function permute(arr) {
    if (arr.length <= 1) {
        return arr
    }

    if (arr.length === 2) {
        return [
            arr,
            arr.slice().reverse()
        ]
    }

    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let otherArr = arr.slice();
        otherArr.splice(i, 1);
        let res = permute(otherArr);
        res.forEach((el) => {
            result.push(
                [item, ...el]
            )
        })
    }


    return result;
}


// console.log(permute([1, 1, 3, 4]))

/**
 * 使用深度优先搜索(DFS)实现全排列
 * @param {number[]} nums - 输入的数字数组
 * @returns {number[][]} - 返回所有可能的排列组合
 */
function permuteV2(nums) {
    const len = nums.length;
    const current = [];
    const res = [];
    const visited = {};

    function dfs(depth) {
        if (depth === len) {
            res.push(current.slice())
            return
        }

        for (let i = 0; i < len; i++) {
            let item = nums[i];
            if (!visited[i]) {
                visited[i] = 1;
                current.push(item);
                dfs(depth + 1);
                current.pop();
                visited[i] = 0;
            }
        }
    }

    dfs(0);
    return res;


}

// console.log(permuteV2([1, 1, 3, 4]))

/**
 * 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 * 说明：解集不能包含重复的子集。
 * @param {number[]} nums - 输入的数字数组
 * @returns {number[][]} - 返回所有可能的子集
 */
function subsets(nums) {
    const res = [];
    const len = nums.length;;
    const subset = [];

    function dfs(index) {
        res.push(subset.slice());

        for (let i = index; i < len; i++) {
            subset.push(nums[i]);
            dfs(i + 1);
            subset.pop();
        }
    }

    dfs(0);
    return res;
}

// console.log(subsets([1, 2, 3]))

/**
 * 题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * @param {number} n - 范围上限
 * @param {number} k - 组合中数字的个数
 * @returns {number[][]} - 返回所有可能的组合
 */
function combine(n, k) {
    const res = [];
    const combination = [];

    function dfs(index) {
        if (combination.length === k) {
            res.push(combination.slice());
            return;
        }

        for (let i = index; i <= n; i++) {
            combination.push(i);
            dfs(i + 1);
            combination.pop();
        }
    }

    dfs(1);
    return res;
}

// console.log(combine(4, 3))

/**
 * 二叉树的前序遍历（根-左-右）
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {number[]} - 返回前序遍历的结果数组
 */
function preorderTraversal(root) {
    const res = [];
    const stack = [];
    stack.push(root);

    while (stack.length) {
        const node = stack.pop(); // 应该用pop而不是shift,因为要实现前序遍历
        if (!node) continue;
        res.push(node.val);
        if (node.right) stack.push(node.right); // 先压入右节点
        if (node.left) stack.push(node.left); // 再压入左节点,这样出栈时会先处理左节点
    }

    return res;
}

// console.log(preorderTraversal({
//     val: 1,
//     left: { val: 2, left: { val: 4, left: null, right: null }, right: null },
//     right: { val: 3, left: null, right: null }
// }))

/**
 * 二叉树的后序遍历（左-右-根）
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {number[]} - 返回后序遍历的结果数组
 */
function postorderTraversal(root) {
    const res = [];
    const stack = [];
    stack.push(root);

    while (stack.length) {
        const node = stack.pop();
        if (!node) continue;
        res.unshift(node.val);
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }

    return res;
}

// console.log(postorderTraversal({
//     val: 1,
//     left: { val: 2, left: { val: 4, left: null, right: null }, right: null },
//     right: { val: 3, left: null, right: null }
// }))


/**
 * 二叉树的中序遍历（左-根-右）
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {number[]} - 返回中序遍历的结果数组
 */
function inorderTraversal(root) {
    const res = [];
    const stack = [];
    let current = root;

    while (current || stack.length) {
        while (current) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();
        res.push(current.val);
        current = current.right;
    }

    return res;
}

/**
 * 翻转二叉树
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {TreeNode} - 返回翻转后的二叉树根节点
 */
function invertTree(root) {
    if (!root) return null;

    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;

    return root;
}

// console.log(invertTree({
//     val: 1,
//     left: { val: 2, left: { val: 4, left: null, right: null }, right: null },
//     right: { val: 3, left: null, right: null }
// }))


/**
 * 在二叉搜索树中搜索指定值
 * @param {TreeNode} root - 二叉搜索树的根节点
 * @param {number} val - 要搜索的值
 * @returns {TreeNode|null} - 返回找到的节点或null
 */
function searchBST(root, val) {
    if (!root) return null;
    if (root.val === val) {
        console.log(root);
    } else if (root.val > val) {
        searchBST(root.left, val);
    } else {
        searchBST(root.right, val);
    }
}



/**
 * 二叉搜索树节点类
 */
class TreeNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * 向二叉搜索树中插入新节点
 * @param {TreeNode} root - 二叉搜索树的根节点
 * @param {number} val - 要插入的值
 * @returns {TreeNode} - 返回插入后的二叉搜索树根节点
 */
function insertIntoBST(root, val) {
    if (!root) return new TreeNode(val);

    if (root.val > val) {
        root.left = insertIntoBST(root.left, val);
    } else {
        root.right = insertIntoBST(root.right, val);
    }

    return root;
}

// console.log(insertIntoBST({
//     val: 1,
//     left: { val: 2, left: { val: 4, left: null, right: null }, right: null },
//     right: { val: 3, left: null, right: null }
// }, 5))

/**
 * 查找二叉搜索树中的最大值节点
 * @param {TreeNode} root - 二叉搜索树的根节点
 * @returns {TreeNode} - 返回最大值节点
 */
function findMax(root) {
    while (root.right) {
        root = root.right;
    }
    return root;
}

/**
 * 查找二叉搜索树中的最小值节点
 * @param {TreeNode} root - 二叉搜索树的根节点
 * @returns {TreeNode} - 返回最小值节点
 */
function findMin(root) {
    while (root.left) {
        root = root.left;
    }
    return root;
}


/**
 * 从二叉搜索树中删除指定值的节点
 * @param {TreeNode} root - 二叉搜索树的根节点
 * @param {number} key - 要删除的值
 * @returns {TreeNode} - 返回删除后的二叉搜索树根节点
 */
function deleteNode(root, key) {
    if (!root) return null;

    if (root.val === key) {
        if (!root.left && !root.right) {
            root = null
        } else if (root.left) {
            const max = findMax(root.left);
            root.val = max.val;
            root.left = deleteNode(root.left, max.val);
        } else {
            const min = findMin(root.right);
            root.val = min.val;
            root.right = deleteNode(root.right, min.val);

        }
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    } else {
        root.right = deleteNode(root.right, key);
    }

    return root;
}


/**
 * 判断一棵树是否是有效的二叉搜索树
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {boolean} - 返回是否是有效的二叉搜索树
 */
function isValidBST(root) {
    if (!root) return true;

    if (root.left && root.left.val >= root.val) return false;
    if (root.right && root.right.val <= root.val) return false;

    return isValidBST(root.left) && isValidBST(root.right);
}

/**
 * 使用上下界判断一棵树是否是有效的二叉搜索树
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {boolean} - 返回是否是有效的二叉搜索树
 */
function isValidBST_V2(root) {
    if (!root) return true;
    function dfs(node, min, max) {
        if (!node) return true;

        if (node.val <= min || node.val >= max) return false;

        return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
    }

    return dfs(root, -Infinity, Infinity);
}

/**
 * 将有序数组转换为高度平衡的二叉搜索树
 * @param {number[]} nums - 有序数组
 * @returns {TreeNode} - 返回构建的二叉搜索树根节点
 */
function sortArrayToBST(nums) {
    if (!nums.length) return null;

    const mid = Math.floor(nums.length / 2);
    const root = new TreeNode(nums[mid]);

    root.left = sortArrayToBST(nums.slice(0, mid));
    root.right = sortArrayToBST(nums.slice(mid + 1));

    return root;
}

// console.log(sortArrayToBST([-10, -3, 0, 5]))


/**
 * 将有序数组转换为高度平衡的二叉搜索树（优化版本）
 * @param {number[]} nums - 有序数组
 * @returns {TreeNode} - 返回构建的二叉搜索树根节点
 */
function sortedArrayToBST_V2(nums) {
    if (!nums.length) return null;

    function buildBST(low, high) {
        if (low > high) return null;
        let mid = Math.floor((low + high) / 2);
        let root = new TreeNode(nums[mid]);
        root.left = buildBST(low, mid - 1);
        root.right = buildBST(mid + 1, high);

        return root;
    }

    return buildBST(0, nums.length - 1);
}

// console.log(sortedArrayToBST_V2([-10, -3, 0, 5]))

/**
 * 判断一棵树是否是平衡二叉树
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {boolean} - 返回是否是平衡二叉树
 */
function isBalanced(root) {
    if (!root) return true;
    let flag = true;

    function dfs(node) {
        if (!node) return 0;

        let left = dfs(node.left);
        let right = dfs(node.right);

        if (Math.abs(left - right) > 1) {
            flag = false;
            return 0;
        }

        return Math.max(left, right) + 1;
    }

    dfs(root);
    return flag;
}

console.log(isBalanced({
    val: 1,
    left: { val: 2, left: { val: 4, left: null, right: null }, right: null },
    right: { val: 3, left: null, right: null }
}))


/**
 * 将一棵树转换为平衡二叉搜索树
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {TreeNode} - 返回平衡后的二叉搜索树根节点
 */
function balanceBST(root) {
    const nums = [];

    function inOrder(root) {
        if (!root) {
            return
        }
        inOrder(root.left);
        nums.push(root.value)
        inOrder(root.right)
    }

    inOrder(root)
    return sortedArrayToBST_V2(nums)
}




