def maxSubArray(self, nums):
    if not nums:
        # Handle empty array case
        return 0  # or raise an exception if preferred
    max_so_far = -float('inf')
    max_ending_here = 0

    for num in nums:
        max_ending_here = max(num, max_ending_here + num)
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

# List of test cases and their expected outputs
test_cases = [
    ([1, 2, 3, 4, 5], 15),
    ([-1, -2, -3, -4, -5], -1),
    ([-2, 1, -3, 4, -1, 2, 1, -5, 4], 6),
    ([7], 7),
    ([-7], -7),
    ([], 0),  # Assuming we return 0 for empty array
    ([1000000, -1, 1000000], 1999999),
    ([50, -100, 50, -100, 50, -100, 50], 50),
    ([0, 0, 0, 0], 0),
    ([0, -1, 0, -2, 0, -3], 0),
    ([5, 4, -1, -2, -3], 9),
    ([-3, -2, -1, 5, 4], 9),
    ([1, 2, 3, -100, 4, 5, 6], 15),
    ([-10, 20, -30, 40, -50, 60], 60),
    ([-1, -2, -3, -4], -1)
]

# Running the tests
for i, (nums, expected) in enumerate(test_cases, 1):
    result = maxSubArray(nums)
    print(f"Test Case {i}:")
    print(f"Input: {nums}")
    print(f"Expected Output: {expected}")
    print(f"Actual Output: {result}")
    print(f"Test {'Passed' if result == expected else 'Failed'}\n")