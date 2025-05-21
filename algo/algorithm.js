const root = {
    value: 'A',
    left: {
        value: 'B',
        left: {
            value: 'D',

        },
        right: {
            value: 'E',
        }
    },
    right: {
        value: 'C',
        right: {
            value: 'F',
        }
    }
}

/**
 * 二叉树的前序遍历
 * 遍历顺序：根节点 -> 左子树 -> 右子树
 * 
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {void} - 无返回值，直接打印节点值
 * 
 * 示例：
 *     1
 *    / \
 *   2   3
 *  / \
 * 4   5
 * 
 * 输出顺序：1 2 4 5 3
 */
function preOrder(root) {
    if (!root) return;
    console.log(root.value);
    preOrder(root.left);
    preOrder(root.right);
}

/**
 * 二叉树的中序遍历
 * 遍历顺序：左子树 -> 根节点 -> 右子树
 * 
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {void} - 无返回值，直接打印节点值
 * 
 * 示例：
 *     1
 *    / \
 *   2   3
 *  / \
 * 4   5
 * 
 * 输出顺序：4 2 5 1 3
 */
function inOrder(root) {
    if (!root) return;
    inOrder(root.left);
    console.log(root.value);
    inOrder(root.right);
}

/**
 * 二叉树的后序遍历
 * 遍历顺序：左子树 -> 右子树 -> 根节点
 * 
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {void} - 无返回值，直接打印节点值
 * 
 * 示例：
 *     1
 *    / \
 *   2   3
 *  / \
 * 4   5
 * 
 * 输出顺序：4 5 2 3 1
 */
function postOrder(root) {
    if (!root) return;
    postOrder(root.left);
    postOrder(root.right);
    console.log(root.value);
}

/**
 * 两数之和
 * 在数组中找到两个数，使它们的和等于目标值
 * 
 * @param {number[]} nums - 输入数组
 * @param {number} target - 目标值
 * @returns {number[][]} - 返回所有满足条件的数对的下标
 * 
 * 示例：
 * 输入：nums = [2, 7, 11, 15], target = 9
 * 输出：[[0, 1]]
 */
function twoSum(nums, target) {
    const map = new Map();
    let result = [];
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            result.push([map.get(complement), i]);
        }
        map.set(nums[i], i);
    }
    return result;
}

/**
 * 三数之和
 * 在数组中找到所有和为0的三个数
 * 
 * @param {number[]} nums - 输入数组
 * @returns {number[][]} - 返回所有满足条件的三元组
 * 
 * 示例：
 * 输入：nums = [-1, 0, 1, 2, -1, -4]
 * 输出：[[-1, -1, 2], [-1, 0, 1]]
 */
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    let result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}

/**
 * 三数之和的另一种实现
 * 使用两数之和的方法来解决三数之和问题
 * 
 * @param {number[]} nums - 输入数组
 * @returns {number[][]} - 返回所有满足条件的三元组
 */
function threeSumV2(nums) {
    let result = [];
    for (let i = 0; i < nums.length; i++) {
        let item = nums[i];
        let arr = nums.slice();
        arr.splice(i, 1);

        let twoSumResult = twoSum(arr, -item);
        if (twoSumResult.length > 0) {
            twoSumResult.forEach(twoSumArr => {
                let threeItemStr = [item, ...(twoSumArr.map(item => arr[item]))].sort((a, b) => a - b).join('_');
                if (!result.includes(threeItemStr)) {
                    result.push(threeItemStr);
                }
            })
        }
    }
    return result.map(item => item.split('_').map(Number));
}

// console.log(threeSumV2([-1, 0, 1, 2, -1, -4]));

/**
 * 合并两个有序数组
 * 将nums2合并到nums1中，保持有序
 * 
 * @param {number[]} nums1 - 第一个有序数组
 * @param {number} m - nums1中的元素个数
 * @param {number[]} nums2 - 第二个有序数组
 * @param {number} n - nums2中的元素个数
 * @returns {number[]} - 返回合并后的数组
 */
function merge(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }

    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }

    return nums1;
}

/**
 * 判断字符串是否为回文串
 * 
 * @param {string} str - 输入字符串
 * @param {number} start - 起始位置
 * @param {number} end - 结束位置
 * @returns {boolean} - 是否为回文串
 */
function isPalindrome(str, start, end) {
    while (start < end) {
        if (str[start] !== str[end]) return false;
        start++;
        end--;
    }
    return true;
}

/**
 * 判断是否可以通过删除一个字符变成回文串
 * 
 * @param {string} str - 输入字符串
 * @returns {boolean} - 是否可以通过删除一个字符变成回文串
 * 
 * 示例：
 * 输入：str = "abca"
 * 输出：true
 * 解释：可以删除字符'c'变成回文串"aba"
 */
function validPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) {
            return isPalindrome(str, left + 1, right) || isPalindrome(str, left, right - 1);
        }
        left++;
        right--;
    }
    return true;
}

// console.log(validPalindrome('abca'));

/**
 * 字符串转整数
 * 实现类似C++中的atoi函数
 * 
 * @param {string} str - 输入字符串
 * @returns {number} - 转换后的整数
 * 
 * 示例：
 * 输入：str = "42"
 * 输出：42
 */
function myAtoi(str) {
    const reg = /^\s*([+-]?\d+)/;
    const result = str.match(reg);
    if (!result) return 0;
    const num = Number(result[1]);
    if (isNaN(num)) return 0;
    if (num > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
    if (num < Math.pow(-2, 31)) return Math.pow(-2, 31);

    return num;
}

console.log(myAtoi('+fff42dddd'));

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * 合并两个有序链表
 * 
 * @param {ListNode} l1 - 第一个有序链表
 * @param {ListNode} l2 - 第二个有序链表
 * @returns {ListNode} - 合并后的有序链表
 */
function mergeTwoLists(l1, l2) {
    let head = new ListNode();
    let current = head;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    current.next = l1 !== null ? l1 : l2;
    return head.next;
}

/**
 * 删除链表中的重复元素
 * 保留所有重复元素中的一个
 * 
 * @param {ListNode} head - 链表头节点
 * @returns {ListNode} - 删除重复元素后的链表
 */
function deleteDuplicates(head) {
    let current = head;
    while (current && current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    return head;
}

/**
 * 删除链表中的重复元素（保留一个）
 * 删除所有重复元素，只保留不重复的元素
 * 
 * @param {ListNode} head - 链表头节点
 * @returns {ListNode} - 删除重复元素后的链表
 */
function deleteDuplicatesV2(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    while (current.next && current.next.next) {
        if (current.next.val === current.next.next.val) {
            let val = current.next.val;
            while (current.next.val === val) {
                current.next = current.next.next;
            }
        } else {
            current = current.next;
        }
    }
    return dummy.next;
}

/**
 * 删除链表的倒数第N个节点
 * 
 * @param {ListNode} head - 链表头节点
 * @param {number} n - 要删除的节点位置（从1开始）
 * @returns {ListNode} - 删除节点后的链表
 */
function removeNthFromEnd(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;
    return dummy.next;
}

/**
 * 删除链表的倒数第N个节点（另一种实现）
 * 先计算链表长度，再删除指定节点
 * 
 * @param {ListNode} head - 链表头节点
 * @param {number} n - 要删除的节点位置（从1开始）
 * @returns {ListNode} - 删除节点后的链表
 */
function removeNthFromEndV2(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;

    let count = 0;
    let current = head;
    while (current) {
        count++;
        current = current.next;
    }

    current = dummy;
    for (let i = 0; i < count - n; i++) {
        current = current.next;
    }

    current.next = current.next.next;
    return dummy.next;
}

/**
 * 反转链表
 * 迭代实现
 * 
 * @param {ListNode} head - 链表头节点
 * @returns {ListNode} - 反转后的链表
 */
function reverseList(head) {
    let prev = null;
    let current = head;
    while (current) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

/**
 * 反转链表
 * 递归实现
 * 
 * @param {ListNode} head - 链表头节点
 * @returns {ListNode} - 反转后的链表
 */
function reverseListV2(head) {
    if (!head || !head.next) return head;
    let last = reverseListV2(head.next);
    head.next.next = head;
    head.next = null;
    return last;
}

function reverseBetween(head, m, n) {

}

/**
 * 判断链表是否有环
 * 使用visited标记实现
 * 
 * @param {ListNode} head - 链表头节点
 * @returns {boolean} - 是否存在环
 */
function hasCycle(head) {
    while (head) {
        if (head.visited) return true;
        head.visited = true;
        head = head.next;
    }
    return false;
}

/**
 * 判断链表是否有环
 * 使用快慢指针实现
 * 
 * @param {ListNode} head - 链表头节点
 * @returns {boolean} - 是否存在环
 */
function hasCycleV2(head) {
    // 使用快慢指针,快指针每次走两步,慢指针每次走一步
    // 如果有环,快慢指针最终会相遇
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next; // 慢指针走一步
        fast = fast.next.next; // 快指针走两步
        if (slow === fast) {
            return true; // 指针相遇说明有环
        }
    }
    return false; // 如果快指针到达链表尾部,说明无环
}

/**
 * 检测链表中环的起始位置
 * 
 * @param {ListNode} head - 链表头节点
 * @returns {ListNode} - 环的起始节点，如果没有环则返回null
 */
function detectCycle(head) {
    while (head) {
        if (head.visited) return head;
        head.visited = true;
        head = head.next;
    }
    return null;
}

/**
 * 检查括号是否有效
 * 
 * @param {string} s - 包含括号的字符串
 * @returns {boolean} - 括号是否有效
 * 
 * 示例：
 * 输入：s = "()[]{}"
 * 输出：true
 */
function checkBracketValid(s) {
    let leftToRight = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    let stack = []
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (['(', '{', '['].includes(char)) {
            stack.push(leftToRight[char])
        } else {
            if (!stack.length || stack.pop() !== char) {
                return false
            }
        }
    }
    return !stack.length
}

/**
 * 每日温度
 * 对于每一天，找到下一个更高温度的天数
 * 
 * @param {number[]} arr - 温度数组
 * @returns {number[]} - 等待天数数组
 * 
 * 示例：
 * 输入：temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
 * 输出：[1, 1, 4, 2, 1, 1, 0, 0]
 */
function dailyTemperatures(arr) {
    let len = arr.length;
    let result = new Array(len).fill(0);
    for (let i = 0; i < len; i++) {
        let item = arr[i];
        let rightArr = arr.slice(i + 1);
        let index = rightArr.findIndex((el) => {
            return el > item
        });
        result[i] = index === -1 ? 0 : (index + 1)
    }
    return result;
}

// console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))

/**
 * 每日温度（优化版本）
 * 使用单调栈实现
 * 
 * @param {number[]} arr - 温度数组
 * @returns {number[]} - 等待天数数组
 */
function dailyTemperaturesV2(arr) {
    let len = arr.length;
    const stack = [];
    const res = new Array(len).fill(0);
    for (let i = 0; i < len; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            let index = stack.pop();
            res[index] = i - index;
        }
        stack.push(i);
    }
    return res;
}

// console.log(dailyTemperaturesV2([73, 74, 75, 71, 69, 72, 76, 73]))

/**
 * 滑动窗口最大值
 * 
 * @param {number[]} nums - 输入数组
 * @param {number} k - 滑动窗口大小
 * @returns {number[]} - 每个滑动窗口的最大值
 * 
 * 示例：
 * 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
 * 输出：[3,3,5,5,6,7]
 */
function maxSlidingWindow(nums, k) {
    let result = [];

    for (let i = 0; i <= nums.length - k; i++) {
        let item = nums.slice(i, i + k);
        result.push(Math.max(...item));
    }
    return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))

/**
 * 滑动窗口最大值（优化版本）
 * 使用单调队列实现
 * 
 * @param {number[]} nums - 输入数组
 * @param {number} k - 滑动窗口大小
 * @returns {number[]} - 每个滑动窗口的最大值
 */
function maxSlidingWindowV2(nums, k) {
    if (!nums.length || k === 0) return [];

    const result = [];
    const deque = []; // 存储下标

    for (let i = 0; i < nums.length; i++) {
        // 移除队列中所有小于当前元素的下标
        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }

        // 将当前元素的下标加入队列
        deque.push(i);

        // 移除队列中超出窗口范围的下标
        while (deque[0] <= i - k) {
            deque.shift();
        }

        // 如果窗口已满，记录当前窗口最大值
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}

// 测试代码
// console.log(maxSlidingWindowV2([1, 3, -1, -3, 5, 3, 6, 7], 3)); // 输出: [3, 3, 5, 5, 6, 7]

/**
 * 二叉树的广度优先搜索(BFS)
 * 按照从上到下、从左到右的顺序遍历二叉树的每个节点
 * 
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {void} - 无返回值，直接打印节点值
 * 
 * 示例：
 *     1
 *    / \
 *   2   3
 *  / \
 * 4   5
 * 
 * 输出顺序：1 2 3 4 5
 * 
 * 实现思路：
 * 1. 使用队列存储待访问的节点
 * 2. 每次从队列头部取出一个节点
 * 3. 访问该节点
 * 4. 将该节点的左右子节点（如果存在）加入队列
 */
function BFS(root) {
    let queue = [];
    queue.push(root)

    while (queue.length > 0) {
        const top = queue.shift();
        console.log(top.value);

        if (top.left) {
            queue.push(top.left)
        }

        if (top.right) {
            queue.push(top.right)
        }
    }
}

BFS(root)

/**
 * 二叉树的层序遍历
 * 按照从上到下、从左到右的顺序遍历二叉树的每一层
 * 
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {Array<Array<number>>} - 返回一个二维数组，每个子数组代表一层的节点值
 * 
 * 示例：
 *     1
 *    / \
 *   2   3
 *  / \
 * 4   5
 * 
 * 输出：[[1], [2, 3], [4, 5]]
 * 
 * 实现思路：
 * 1. 使用队列存储待访问的节点
 * 2. 每次处理一层，记录当前层的节点数
 * 3. 将当前层的节点值收集到数组中
 * 4. 将下一层的节点加入队列
 */
function levelOrder(root) {
    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
        const level = [];
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const top = queue.shift();
            level.push(top.value);
            if (top.left) queue.push(top.left);
            if (top.right) queue.push(top.right);
        }
        result.push(level);
    }
    return result;
}
