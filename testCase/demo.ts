function minCostClimbingStairs(cost: number[]) {
    const n = cost.length;
    const dp = [];
    dp[0] = 0;
    dp[1] = 0;
    for (let i = 2; i <= n; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
    }
    return dp[n];
}

// 测试代码
// console.log(minCostClimbingStairs([10, 15, 20])); // 输出: 15
// console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 输出: 6


class RecentCounter {
    queue: number[] = [];

    ping(t: number) {
        this.queue.push(t);
        while (this.queue[0] < t - 3000) {
            this.queue.shift();
        }
        return this.queue.length;
    }
}

// let recentCounter = new RecentCounter();
// console.log(recentCounter.ping(1));     // requests = [1]，范围是 [-2999,1]，返回 1
// console.log(recentCounter.ping(100));   // requests = [1, 100]，范围是 [-2900,100]，返回 2
// console.log(recentCounter.ping(3001));  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
// console.log(recentCounter.ping(3002));  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3

/**
 * 输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
 * @param nums 
 */
function moveZeroes(nums: number[]) {
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        if (nums[i] === 0) {
            nums.splice(i, 1);
            nums.push(0);
            len--;
            i--;
        }
    }
    return nums;
}


// console.log(moveZeroes([0, 1, 0, 3, 12]))
// console.log(moveZeroes([0, 0, 1]))


/**
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。    
 * 输入：s = "abc", t = "ahbgdc"
输出：true
 * @param s 
 * @param t 
 */
function isSubsequence(s: string, t: string) {
    let i = 0;
    let j = 0;

    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++;
        }

        j++;
    }

    return i === s.length;
}


// console.log(isSubsequence('abc', 'ahbgdc'))

/**
 * 给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。
请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。
 * @param nums 
 * @param k 
 */
function findMaxAverage(nums: number[], k: number) {
    let maxSum = 0;
    let currentSum = 0;

    for (let i = 0; i < k; i++) {
        currentSum += nums[i];
    }

    maxSum = currentSum;

    for (let i = k; i < nums.length; i++) {
        currentSum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum / k;
}

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4))
console.log(findMaxAverage([-1], 1))

interface ListNode {
    val: number;
    next: ListNode | null;
}

function reverseList(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }

    const last = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return last;
}


function isValidBracket(s: string) {
    const stack: string[] = [];
    const map = {
        '(': ')',
        '{': '}',
        '[': ']',
    }
    const rightToLeft = {
        ')': '(',
        '}': '{',
        ']': '[',
    }

    for (let i = 0; i < s.length; i++) {
        if (s[i] in map) {
            stack.push(s[i]);
        } else {
            if (stack.pop() !== rightToLeft[s[i] as keyof typeof rightToLeft]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

console.log(isValidBracket('()'))
console.log(isValidBracket('()[]{}'))



function sortColors(nums: number[]) {
    let red = 0, white = 0, blue = 0;

    for (const num of nums) {
        if (num === 0) {
            red++;
        } else if (num === 1) {
            white++;
        } else {
            blue++;
        }
    }

    return nums.fill(0, 0, red).fill(1, red, red + white).fill(2, red + white);
}


console.log(sortColors([2, 0, 2, 1, 1, 0]))



function findKthLargest(nums: number[], k: number) {
    return nums.sort((a, b) => b - a)[k - 1];
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))


function shuffle(arr: number[]) {
    // Fisher-Yates 洗牌算法
    // 从后向前遍历数组，每次随机选择一个位置与当前位置交换
    // 时间复杂度 O(n)，空间复杂度 O(1)
    const len = arr.length;
    for (let i = len - 1; i > 0; i--) {
        // 生成一个 [0,i] 范围内的随机索引
        const randomIndex = Math.floor(Math.random() * (i + 1));
        // 交换当前位置和随机位置的元素
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))


/**
 * 反转链表的迭代实现
 * 基本思想：使用三个指针(prev、current、next)遍历链表，每次改变current的next指针指向
 * 时间复杂度：O(n)，其中n是链表的长度
 * 空间复杂度：O(1)，只使用了常数个变量
 * @param {ListNode | null} head - 链表的头节点
 * @returns {ListNode | null} - 反转后的链表头节点
 */
function reverseListV2(head: ListNode | null): ListNode | null {
    // 处理空链表和只有一个节点的情况
    if (head === null || head.next === null) {
        return head;
    }

    // 初始化三个指针
    let prev = null;          // 指向当前节点的前一个节点
    let current = head;       // 指向当前正在处理的节点
    let next = null;          // 指向当前节点的下一个节点

    while (current !== null) {
        next = current.next;

        current.next = prev;

        prev = current;
        current = next as ListNode;
    }

    return prev;
}

// console.log(reverseListV2({ val: 1, next: { val: 2, next: { val: 3, next: null } } }))
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

function getTreeMaxDepth(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }

    return Math.max(getTreeMaxDepth(root.left), getTreeMaxDepth(root.right)) + 1;

}

// console.log(getTreeMaxDepth({
//     val: 1, left: {
//         val: 2, left: {
//             val: 4, left: null, right: null
//         }, right: { val: 5, left: null, right: null }
//     }, right: {
//         val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null }
//     }
// }))

function longestIncreasingSubSequence(nums: number[]) {
    const dp = nums.map((item) => {
        return [item]
    });

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = [...dp[j], nums[i]]
            }
        }
    }

    return dp;

    // return dp.sort((a, b) => b.length - a.length)[0];
}

console.log(longestIncreasingSubSequence([10, 9, 2, 5, 3, 7, 101, 18]))

