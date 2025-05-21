function kidsWithCandies(candies, extraCandies) {
    let max = Math.max(...candies);
    return candies.map(candy => candy + extraCandies >= max);
}


function canPlaceFlowers(flowerbed, n) {
    let count = 0;
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0 && (i === 0 || flowerbed[i - 1] === 0) && (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)) {
            flowerbed[i] = 1;
            count++;
        }
    }
    return count >= n;
}

// console.log(canPlaceFlowers([1, 0, 0, 0, 0, 0, 1], 2));

function reverseVowels(s) {
    let arr = s.split('');
    let i = 0, j = arr.length - 1;
    let coreArr = ['a', 'e', 'i', 'o', 'u']

    while (i < j) {
        if (coreArr.includes(arr[i].toLowerCase())) {
            while (!coreArr.includes(arr[j].toLowerCase())) {
                j--;
            }
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        } else {
            i++;
        }
    }
    return arr.join('')
}

function reverseWords(s) {
    s = s.trim();
    return s.split(/\s+/).reverse().join(' ');
}

// console.log(reverseWords('the sky is blue'))

/**
 * 计算除自身外数组乘积
 * @param {number[]} nums - 输入数组
 * @return {number[]} - 返回一个新数组，其中每个元素是除自身外所有元素的乘积
 */
function productExceptSelf(nums) {
    // 创建结果数组，初始值都是1
    let result = new Array(nums.length).fill(1);
    // 用于存储左边元素的乘积
    let left = 1;
    // 用于存储右边元素的乘积
    let right = 1;

    // 第一次遍历：计算每个位置左边的乘积
    for (let i = 0; i < nums.length; i++) {
        result[i] = left;  // 当前位置的结果先等于左边的乘积
        left *= nums[i];   // 更新左边的乘积
    }

    // 第二次遍历：计算每个位置右边的乘积并合并
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= right;  // 当前位置的结果乘以右边的乘积
        right *= nums[i];    // 更新右边的乘积
    }

    return result;
}

// console.log(productExceptSelf([1, 2, 3, 4]))

function increasingTriplet(nums) {
    let first = Infinity;
    let second = Infinity;

    for (let i = 0; i < nums.length; i++) {
        const item = nums[i];
        if (item <= first) {
            first = item;
        } else if (item <= second) {
            second = item;
        } else {
            return true;
        }
    }

    return false;
}

// console.log(increasingTriplet([1, 2, 3, 4, 5]))

/**
 * 输入：n = 4
输出：4
解释：
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
 * @param {*} n 
 */
function tribonacci(n) {
    let f = [];

    function dfs(n) {
        if (n === 0) {
            return 0;
        }
        if (n === 1 || n === 2) {
            return 1;
        }

        if (f[n]) {
            return f[n];
        }

        f[n] = dfs(n - 1) + dfs(n - 2) + dfs(n - 3);
        return f[n];
    }

    return dfs(n);
}

// console.log(tribonacci(5))

/**
 * 0-1背包问题的动态规划解法
 * @param {number[]} weights - 物品的重量数组
 * @param {number[]} values - 物品的价值数组
 * @param {number} capacity - 背包的容量
 * @return {number} - 返回能装入背包的最大价值
 */
function knapsack(weights, values, capacity) {
    // 物品数量
    const n = weights.length;
    // 创建动态规划数组，dp[i][j]表示前i个物品，容量为j时的最大价值
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    // 遍历每个物品
    for (let i = 1; i <= n; i++) {
        // 遍历每个可能的容量
        for (let j = 0; j <= capacity; j++) {
            // 如果当前物品的重量小于等于当前容量
            if (weights[i - 1] <= j) {
                // 状态转移方程：
                // 1. 不选当前物品：dp[i-1][j]
                // 2. 选当前物品：dp[i-1][j-weights[i-1]] + values[i-1]
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i - 1]] + values[i - 1]);
            } else {
                // 如果当前物品重量大于容量，则不能选择该物品
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // 返回最终结果：前n个物品，容量为capacity时的最大价值
    return dp[n][capacity];
}

console.log(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5))

function bubbleSort(arr) {
    let len = arr.length

    for (let i = 0; i < len - 1; i++) {
        let flag = true;
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

                flag = false
            }
        }

        if (flag) {
            return arr;
        }
    }

    return arr;
}

console.log(bubbleSort([2, 3, 1, 4]))

