/*

# PROBLEM

https://leetcode.com/problems/letter-combinations-of-a-phone-number/

17. Letter Combinations of a Phone Number

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

# SOLUTION

If there were a fixed number of telephone digits, we could just use nested
loops to find all possible strings. However, since the number of digits are
uncertain, we will use a recursive solution instead.

Once the digit string has been converted into nested array of the form

[['a', 'b', 'c'], ['d', 'e', 'f']]

we can define a function that in the case of a single inner array simply
returns that array, and in other cases returns every combination of ever character
in the first inner array with every result of applying the function recursively
to the remaining inner arrays. That is:

f([['a', 'b', c']]) = ['a', 'b', 'c']

and

f([['a', 'b', 'c'], ['d', 'e', f']]) = [
    'a' + f(['d', 'e', 'f']),
    'b' + f(['d', 'e', 'f']),
    'c' + f(['d', 'e', 'f'])
]

and so on.

*/

type LetterMap = {
    [key: string]: string[]
}

const letterMap: LetterMap = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
}

function findStrings(arrayOfArrays: string[][]): string[]  {
    // The special case of a single digit. Just return the first subarray.
    if (arrayOfArrays.length === 1) return arrayOfArrays[0];

    // Otherwise, work out what the result is for everything but the
    // first digit.
    const remaining = findStrings(arrayOfArrays.slice(1));

    // And then for each of those results, glue each of the characters from
    // the first digit onto it.
    let result: string[] = [];
    for (let i = 0; i < arrayOfArrays[0].length; i++) {
        for (let j = 0; j < remaining.length; j++) {
            result.push(arrayOfArrays[0][i] + remaining[j]);
        }
    }

    return result;
}

function letterCombinations(digits: string): string[] {
    // Bail if leetcode tries to trick us with an empty input.
    if (digits === '') return [];

    // Otherwise, convert each digit into an arracy of characters and start recursing.
    return findStrings(digits.split('').map(digit => letterMap[digit]));
}
