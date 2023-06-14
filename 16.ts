/*

# PROBLEM

https://leetcode.com/problems/3sum-closest/description/

16. 3Sum Closest

Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.


# SOLUTION

The brute force solution is to consider every possible triple of (i, j, k)
(with i != j, i != k and j != k) and return the closest sum nums[i] + nums[j] + nums[k].
This solution would be O(n^3).

Since we are not asked to return an array index, we are free to reorder the array.
If we sort the array in ascending order and consider a given triple (i, j, k) with
i < j < k then:

a) moving i to the left would guarantee a lower sum and
b) moving k to the right would guarantee a higher sum.

We can use this global knowledge of the array to eliminate some triples without
testing them. The following solution is O(n^2), because for a fixed i, we need to
consider at most len-i possible triples.

*/

function threeSumClosest(nums: number[], target: number): number {
    // Sort ascending.
    const sorted = nums.sort((a, b) => a - b);

    // Initial guess.
    let best = sorted[0] + sorted[1] + sorted[2];

    for (let i = 0; i < nums.length; i++) {

        // Consider the values to the right of i and at the far end of the array.
        let j = i + 1;
        let k = nums.length - 1;
        while (j < k) {

            // Take a triple and sum the values.
            let candidate = nums[i] + nums[j] + nums[k];

            // Maybe we hit the jackpot?
            if (candidate === target) return candidate;

            // If not, is this a better guess than we've seen so far?
            if (Math.abs(target - candidate) < Math.abs(target - best)) {
                best = candidate;
            }

            // If the guess was lower than the target, there's no need to 
            // consider any triples that are smaller.
            if (candidate < target) {
                j += 1;
            } else {
                // If the guess is larger than the target, there's no need to
                // consider any triples that are larger.
                k -= 1;
            }
        }
    }

    return best;
}