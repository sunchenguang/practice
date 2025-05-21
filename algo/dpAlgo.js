/**
 * 爬楼梯问题
 * 基本思想：动态规划，dp[i]表示爬到第i阶楼梯的方法数
 * 状态转移方程：dp[i] = dp[i-1] + dp[i-2]
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number} n - 楼梯的阶数
 * @returns {number} - 爬到第n阶的方法数
 */
function climbStairs(n) {
    if (n <= 2) return n

    const dp = new Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 2

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n]
}


/**
 * 爬楼梯问题（递归解法）
 * 基本思想：使用递归和记忆化搜索
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number} n - 楼梯的阶数
 * @returns {number} - 爬到第n阶的方法数
 */
function climbStairs2(n) {
    if (n <= 2) return n
    const f = [];

    if (!f[n]) {
        f[n] = climbStairs2(n - 1) + climbStairs2(n - 2)
    }

    return f[n]
}


/**
 * 零钱兑换
 * 基本思想：动态规划，dp[i]表示凑成金额i所需的最少硬币数
 * 状态转移方程：dp[i] = min(dp[i-coin] + 1) for coin in coins
 * 时间复杂度：O(amount * coins.length)
 * 空间复杂度：O(amount)
 * @param {number[]} coins - 硬币面值数组
 * @param {number} amount - 目标金额
 * @returns {number} - 最少需要的硬币数，如果无法凑成则返回-1
 */
function coinChange(coins, amount) {
    const dp = [];
    dp[0] = 0

    for (let i = 1; i <= amount; i++) {
        dp[i] = Infinity;

        for (let coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount]
}


/**
 * 最长递增子序列
 * 基本思想：动态规划，dp[i]表示以nums[i]结尾的最长递增子序列长度
 * 状态转移方程：dp[i] = max(dp[j] + 1) for j < i and nums[j] < nums[i]
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n)
 * @param {number[]} nums - 输入数组
 * @returns {number} - 最长递增子序列的长度
 */
function lengthOfLIS(nums) {
    const dp = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }

    return Math.max(...dp)
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))


/**
 * 检查字符串是否为回文串
 * @param {string} s - 待检查的字符串
 * @returns {boolean} - 是否为回文串
 */
function checkIsPalindrome(s) {
    return s === s.split('').reverse().join('');
}

/**
 * 最长回文子串（暴力解法）
 * 基本思想：枚举所有可能的子串，判断是否为回文串
 * 时间复杂度：O(n³)
 * 空间复杂度：O(1)
 * @param {string} s - 输入字符串
 * @returns {string} - 最长回文子串
 */
function longestPalindromeV2(s) {
    const len = s.length;
    if (len < 2) return s;

    let maxStr = s[0];

    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            let str = s.slice(i, j + 1)
            if (checkIsPalindrome(str)) {
                if (str.length > maxStr.length) {
                    maxStr = str;
                }
            }
        }
    }

    return maxStr;
}

console.log(longestPalindromeV2('demomom'))

/**
 * 最长回文子串（动态规划解法）
 * 基本思想：dp[i][j]表示s[i...j]是否为回文串
 * 状态转移方程：dp[i][j] = (s[i] === s[j]) && dp[i+1][j-1]
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n²)
 * @param {string} s - 输入字符串
 * @returns {string} - 最长回文子串
 */
function longestPalindrome(s) {
    const n = s.length;
    if (n < 2) return s;

    // dp[i][j] 表示 s[i...j] 是否为回文串
    const dp = Array(n).fill().map(() => Array(n).fill(false));

    // 记录最长回文子串的起始位置和长度
    let start = 0;
    let maxLen = 1;

    // 所有单个字符都是回文串
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // 检查长度为2的子串
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }

    // 检查长度大于2的子串
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;

            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                if (len > maxLen) {
                    start = i;
                    maxLen = len;
                }
            }
        }
    }

    return s.substring(start, start + maxLen);
}


class TreeNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * 根据前序遍历和中序遍历构建二叉树
 * 基本思想：递归构建，前序遍历的第一个节点为根节点
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} preorder - 前序遍历数组
 * @param {number[]} inorder - 中序遍历数组
 * @returns {TreeNode} - 构建的二叉树根节点
 */
function buildTree(preorder, inorder) {
    if (preorder.length === 0 || inorder.length === 0) return null;

    const root = new TreeNode(preorder[0]);

    root.left = buildTree(
        preorder.slice(1, inorder.indexOf(root.val) + 1),
        inorder.slice(0, inorder.indexOf(root.val))
    );
    root.right = buildTree(
        preorder.slice(inorder.indexOf(root.val) + 1),
        inorder.slice(inorder.indexOf(root.val) + 1)
    );

    return root;
}
// console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))
// console.log(buildTree([1, 2, 3, 4, 5, 6, 7], [3, 2, 4, 1, 6, 5, 7]))


/**
 * 根据中序遍历和后序遍历构建二叉树
 * 基本思想：递归构建，后序遍历的最后一个节点为根节点
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} inorder - 中序遍历数组
 * @param {number[]} postOrder - 后序遍历数组
 * @returns {TreeNode} - 构建的二叉树根节点
 */
function buildTreeV2(inorder, postOrder) {
    if (inorder.length === 0 || postOrder.length === 0) return null;

    const root = new TreeNode(postOrder[postOrder.length - 1]);

    const index = inorder.indexOf(root.val);

    root.left = buildTreeV2(
        inorder.slice(0, index),
        postOrder.slice(0, index)
    );
    root.right = buildTreeV2(
        inorder.slice(index + 1),
        postOrder.slice(index, postOrder.length - 1)
    );

    return root;
}

console.log(buildTreeV2([3, 2, 4, 1, 6, 5, 7], [3, 4, 2, 6, 7, 5, 1]))


class ListNode {
    constructor(val, next, random) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

/**
 * 复制带随机指针的链表
 * 基本思想：使用Map存储原节点和新节点的映射关系
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {ListNode} head - 原链表的头节点
 * @returns {ListNode} - 复制后的链表头节点
 */
function copyRandomList(head) {
    if (!head) return null;

    const map = new Map();

    let current = head;

    while (current) {
        map.set(current, new ListNode(current.val));
        current = current.next;
    }

    current = head;

    while (current) {
        map.get(current).next = map.get(current.next);
        map.get(current).random = map.get(current.random);
        current = current.next;
    }

    return map.get(head);
}
const moveX = [0, 0, 1, -1];
const moveY = [1, -1, 0, 0];

/**
 * 深度优先搜索遍历岛屿
 * @param {string[][]} grid - 二维网格
 * @param {number} i - 当前行索引
 * @param {number} j - 当前列索引
 */
function dfs(grid, i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;

    grid[i][j] = '0';

    for (let k = 0; k < 4; k++) {
        dfs(grid, i + moveX[k], j + moveY[k]);
    }
}

/**
 * 岛屿数量
 * 基本思想：深度优先搜索，遍历所有陆地，将相连的陆地标记为已访问
 * 时间复杂度：O(m*n)
 * 空间复杂度：O(m*n)
 * @param {string[][]} grid - 二维网格，'1'表示陆地，'0'表示水域
 * @returns {number} - 岛屿的数量
 */
function numIslands(grid) {
    if (grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;

    let count = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }

    return count;
}

console.log(numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
]))

class Robot {
    constructor(x, y, direction) {

    }

    move() {
    }

    turnLeft() {
    }

    turnRight() {
    }
    clean() {
    }
}

/**
 * 机器人清扫房间
 * 基本思想：深度优先搜索，使用相对方向进行探索
 * 时间复杂度：O(4^(n-m))，其中n是房间格子数，m是障碍物数量
 * 空间复杂度：O(n-m)
 * @param {Robot} robot - 机器人实例
 */
function cleanRoom(robot) {
    const visited = new Set();
    const moveX = [0, 0, 1, -1];
    const moveY = [1, -1, 0, 0];

    function dfs(robot, x, y, direction) {
        const key = `${x}-${y}`;
        if (visited.has(key)) return;

        visited.add(key);
        robot.clean();

        for (let i = 0; i < 4; i++) {

            if (robot.move()) {
                let x = i, y = j;
                switch (direction) {
                    case 0:
                        x = x - 1;
                        break;
                    case 90:
                        y = y + 1;
                        break;
                    case 180:
                        x = x + 1;
                        break;
                    case 270:
                        y = y - 1;
                        break;
                    default:
                        break;
                }

                dfs(robot, x, y, direction);
                robot.turnLeft();
                robot.turnLeft();
                robot.move();
                robot.turnRight();
                robot.turnRight();

            }

            robot.turnRight();
            direction += 90;
            direction %= 360;
        }
    }

    dfs(robot, 0, 0, 0);
}


/**
 * 合并区间
 * 基本思想：先排序，然后遍历合并重叠的区间
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 * @param {number[][]} intervals - 区间数组，每个区间表示为[start, end]
 * @returns {number[][]} - 合并后的区间数组
 */
function mergeIntervals(intervals) {
    if (intervals.length === 0) return [];

    intervals.sort((a, b) => a[0] - b[0]);

    const result = [];

    for (let i = 0; i < intervals.length; i++) {
        const current = intervals[i];
        const next = intervals[i + 1];

        if (!next) {
            result.push(current);
            break;
        }

        if (next[0] <= current[1]) {
            result.push([current[0], next[1]]);
            i++;
        } else {
            result.push(current);
        }
    }

    return result;
}

// console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]))

/**
 * 二叉树的最近公共祖先
 * 基本思想：递归查找，如果当前节点是p或q，或者p和q分别在左右子树中，则当前节点是LCA
 * 时间复杂度：O(n)
 * 空间复杂度：O(h)，h为树的高度
 * @param {TreeNode} root - 二叉树的根节点
 * @param {TreeNode} p - 第一个节点
 * @param {TreeNode} q - 第二个节点
 * @returns {TreeNode} - 最近公共祖先节点
 */
function lowestCommonAncestor(root, p, q) {
    if (!root) return null;

    if (root.val === p.val || root.val === q.val) return root;

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;

    return left || right;

}

/**
 * 粉刷房子
 * 基本思想：动态规划，dp[i][j]表示第i个房子刷第j种颜色的最小花费
 * 状态转移方程：dp[i][j] = costs[i][j] + min(dp[i-1][k]) for k != j
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {number[][]} costs - 每个房子刷不同颜色的花费
 * @returns {number} - 最小花费
 */
function minCost(costs) {
    if (costs.length === 0) return 0;

    const n = costs.length;

    for (let i = 1; i < n; i++) {
        const now = costs[i];
        const prev = costs[i - 1];

        now[0] += Math.min(prev[1], prev[2]);
        now[1] += Math.min(prev[0], prev[2]);
        now[2] += Math.min(prev[0], prev[1]);
    }

    return Math.min(...costs[n - 1]);
}

console.log(minCost([[17, 2, 17], [16, 16, 5], [14, 3, 19]]))












