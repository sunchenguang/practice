/**
 * 冒泡排序
 * 基本思想：重复遍历要排序的数组，每次比较相邻两个元素，如果顺序错误则交换
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 * 稳定性：稳定
 * @param {number[]} arr - 待排序的数组
 * @returns {number[]} - 排序后的数组
 */
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

/**
 * 优化版冒泡排序
 * 基本思想：在基础冒泡排序的基础上，增加标志位，当某一轮没有发生交换时说明已经有序，可以提前退出
 * 时间复杂度：O(n²)，最好情况O(n)
 * 空间复杂度：O(1)
 * 稳定性：稳定
 * @param {number[]} arr - 待排序的数组
 * @returns {number[]} - 排序后的数组
 */
function betterBubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let flag = true

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

                flag = false
            }
        }
        if (flag) break
    }
    return arr
}

/**
 * 选择排序
 * 基本思想：每次从未排序区间中找到最小的元素，存放到已排序区间的末尾
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 * 稳定性：不稳定
 * @param {number[]} arr - 待排序的数组
 * @returns {number[]} - 排序后的数组
 */
function selectSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        }
    }
    return arr
}

/**
 * 插入排序
 * 基本思想：将数组分为已排序区间和未排序区间，每次从未排序区间取一个元素插入到已排序区间的合适位置
 * 时间复杂度：O(n²)，最好情况O(n)
 * 空间复杂度：O(1)
 * 稳定性：稳定
 * @param {number[]} arr - 待排序的数组
 * @returns {number[]} - 排序后的数组
 */
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let temp = arr[i]
        let j = i - 1;
        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = temp
    }
    return arr
}

/**
 * 归并排序
 * 基本思想：采用分治法，将数组分成两半，分别排序，然后合并两个有序数组
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 * 稳定性：稳定
 * @param {number[]} arr - 待排序的数组
 * @returns {number[]} - 排序后的数组
 */
function mergeSort(arr) {
    if (arr.length <= 1) return arr

    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)

    return merge(mergeSort(left), mergeSort(right))

}

/**
 * 归并排序的合并函数
 * 将两个有序数组合并成一个有序数组
 * @param {number[]} left - 第一个有序数组
 * @param {number[]} right - 第二个有序数组
 * @returns {number[]} - 合并后的有序数组
 */
function merge(left, right) {
    const result = []

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    return result.concat(left).concat(right)
}

/**
 * 快速排序
 * 基本思想：选择一个基准值，将数组分为小于基准值和大于基准值的两部分，递归排序
 * 时间复杂度：O(nlogn)，最坏情况O(n²)
 * 空间复杂度：O(logn)
 * 稳定性：不稳定
 * @param {number[]} arr - 待排序的数组
 * @returns {number[]} - 排序后的数组
 */
function quickSort(arr) {
    if (arr.length <= 1) return arr

    const pivot = arr[0];
    const left = []
    const right = []

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}



