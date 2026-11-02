// Part 4: Python for Coding Interviews (second video)
const r4 = String.raw;
const L4 = (ch, title, body, task, starter, solution, expected, stdin = "") =>
  window.LESSONS.push({ ch, title, body, task, starter, solution, expected, stdin });
const C = "Interview Essentials";

L4(C, "Math: Division Pitfalls",
r4`In most languages ~-3 / 2~ truncates toward zero (giving ~-1~). Python's ~//~ **floors** (rounds toward negative infinity):

    print(-3 // 2)        # -2
    print(int(-3 / 2))    # -1   (int() truncates toward zero)

If you need C/Java-style integer division, divide normally and wrap in ~int()~.`,
r4`Write ~trunc_div(a, b)~ that divides like Java/C++ (rounding toward zero) and ~floor_div(a, b)~ that uses Python's ~//~.`,
r4`def trunc_div(a, b):
    pass

def floor_div(a, b):
    pass

# Do not modify below this line
print(trunc_div(-3, 2), floor_div(-3, 2))
print(trunc_div(7, 2), floor_div(7, 2))
print(trunc_div(-9, 4), floor_div(-9, 4))
`,
r4`def trunc_div(a, b):
    return int(a / b)

def floor_div(a, b):
    return a // b

print(trunc_div(-3, 2), floor_div(-3, 2))
print(trunc_div(7, 2), floor_div(7, 2))
print(trunc_div(-9, 4), floor_div(-9, 4))
`,
r4`-1 -2
3 3
-2 -3`);

L4(C, "Math: Modulo & the math Module",
r4`Modulo with negatives also differs from C-style languages: ~-10 % 3~ is ~2~ in Python. ~math.fmod~ gives the C-style answer (~-1.0~).

The ~math~ module has ~floor~, ~ceil~, ~sqrt~, ~pow~. Infinity is ~float("inf")~ and ~float("-inf")~; they are handy as "bigger/smaller than anything" starting values. Python ints never overflow.

    import math
    math.floor(3 / 2)   # 1
    math.ceil(3 / 2)    # 2
    math.sqrt(16)       # 4.0
    2 ** 200 < float("inf")   # True`,
r4`Write ~ceil_div(a, b)~ (round up using ~math.ceil~) and ~smallest(nums)~ that finds the minimum by starting with ~float("inf")~ (don't use ~min~).`,
r4`import math

def ceil_div(a, b):
    pass

def smallest(nums):
    pass

# Do not modify below this line
print(ceil_div(7, 2), ceil_div(8, 2), ceil_div(1, 5))
print(smallest([4, -2, 9]))
print(math.fmod(-10, 3), -10 % 3)
print(2 ** 200 < float("inf"))
`,
r4`import math

def ceil_div(a, b):
    return math.ceil(a / b)

def smallest(nums):
    best = float("inf")
    for n in nums:
        if n < best:
            best = n
    return best

print(ceil_div(7, 2), ceil_div(8, 2), ceil_div(1, 5))
print(smallest([4, -2, 9]))
print(math.fmod(-10, 3), -10 % 3)
print(2 ** 200 < float("inf"))
`,
r4`4 4 1
-2
-1.0 2
True`);

L4(C, "Variables & Syntax Differences",
r4`Quick reminders for people coming from other languages:

- No ~n++~. Use ~n += 1~.
- Logic is spelled ~and~, ~or~, ~not~ (not ~&&~, ~||~, ~!~).
- ~elif~ replaces ~else if~.
- No parentheses or braces: a colon and indentation define blocks.
- A multi-line condition **must** be wrapped in parentheses.

    if (a > 0 and
        b > 0):
        print("both positive")`,
r4`Write ~in_range(x, lo, hi)~ returning True if ~x~ is ≥ lo and ≤ hi, using a **multi-line** condition inside parentheses, ~and~, and ~elif/else~ chain returning ~"in"~, ~"low"~, or ~"high"~.`,
r4`def in_range(x, lo, hi):
    pass

# Do not modify below this line
print(in_range(5, 1, 10))
print(in_range(0, 1, 10))
print(in_range(11, 1, 10))
`,
r4`def in_range(x, lo, hi):
    if (x >= lo and
        x <= hi):
        return "in"
    elif x < lo:
        return "low"
    else:
        return "high"

print(in_range(5, 1, 10))
print(in_range(0, 1, 10))
print(in_range(11, 1, 10))
`,
r4`in
low
high`);

L4(C, "Lists as Stacks",
r4`Python lists are dynamic arrays. ~append~ and ~pop~ at the end are O(1), so a list is a stack. ~insert(i, x)~ puts ~x~ at index ~i~ but is O(n).

    s = [1, 2, 3]
    s.append(4); s.append(5)
    s.pop()          # 5
    s.insert(1, 7)   # [1, 7, 2, 3, 4]
    s[0] = 0         # O(1) reassign`,
r4`Write ~is_balanced(s)~: using a list as a stack, return True if every ~(~ in the string has a matching ~)~ in the right order.`,
r4`def is_balanced(s):
    pass

# Do not modify below this line
print(is_balanced("(())"))
print(is_balanced("(()"))
print(is_balanced(")("))
print(is_balanced("()()"))
print(is_balanced(""))
`,
r4`def is_balanced(s):
    stack = []
    for ch in s:
        if ch == "(":
            stack.append(ch)
        elif ch == ")":
            if not stack:
                return False
            stack.pop()
    return len(stack) == 0

print(is_balanced("(())"))
print(is_balanced("(()"))
print(is_balanced(")("))
print(is_balanced("()()"))
print(is_balanced(""))
`,
r4`True
False
False
True
True`);

L4(C, "Array Initialisation & Unpacking",
r4`Make a list of size n filled with a value by multiplying: ~[1] * 5~ gives ~[1, 1, 1, 1, 1]~. Negative indexes are legal (~-1~ is last, ~-2~ second to last).

Unpacking assigns elements to variables; the counts must match:

    a, b, c = [1, 2, 3]
    for x, y in [[1, 2], [3, 4]]:
        print(x + y)`,
r4`Write ~make_zeros(n)~ returning a list of n zeros, ~last_two(nums)~ returning the last two elements as a list using negative indexes, and ~sum_pairs(pairs)~ returning a list of ~x + y~ for each pair (use unpacking in the loop).`,
r4`def make_zeros(n):
    pass

def last_two(nums):
    pass

def sum_pairs(pairs):
    pass

# Do not modify below this line
print(make_zeros(4))
print(last_two([1, 2, 3, 4]))
print(sum_pairs([[1, 2], [3, 4], [10, -10]]))
`,
r4`def make_zeros(n):
    return [0] * n

def last_two(nums):
    return [nums[-2], nums[-1]]

def sum_pairs(pairs):
    result = []
    for x, y in pairs:
        result.append(x + y)
    return result

print(make_zeros(4))
print(last_two([1, 2, 3, 4]))
print(sum_pairs([[1, 2], [3, 4], [10, -10]]))
`,
r4`[0, 0, 0, 0]
[3, 4]
[3, 7, 0]`);

L4(C, "Looping: enumerate & zip",
r4`Three ways to loop a list: by index, by value, or both using ~enumerate~. To walk two lists in parallel use ~zip~, which pairs them up:

    for i, n in enumerate(["a", "b"]):
        print(i, n)       # 0 a / 1 b
    for x, y in zip([1, 2], [10, 20]):
        print(x + y)      # 11 / 22`,
r4`Write ~indexes_of(nums, target)~ returning every index where ~target~ occurs (use ~enumerate~), and ~dot(a, b)~ returning the dot product of two equal-length lists (use ~zip~).`,
r4`def indexes_of(nums, target):
    pass

def dot(a, b):
    pass

# Do not modify below this line
print(indexes_of([1, 2, 1, 3, 1], 1))
print(indexes_of([5], 9))
print(dot([1, 2, 3], [4, 5, 6]))
`,
r4`def indexes_of(nums, target):
    result = []
    for i, n in enumerate(nums):
        if n == target:
            result.append(i)
    return result

def dot(a, b):
    total = 0
    for x, y in zip(a, b):
        total += x * y
    return total

print(indexes_of([1, 2, 1, 3, 1], 1))
print(indexes_of([5], 9))
print(dot([1, 2, 3], [4, 5, 6]))
`,
r4`[0, 2, 4]
[]
32`);

L4(C, "Sorting",
r4`~list.sort()~ sorts in place (ascending). Use ~reverse=True~ for descending. A custom order uses ~key=~ with a *lambda*, an unnamed one-line function that maps each element to the value to sort by.

    nums.sort()
    nums.sort(reverse=True)
    words.sort(key=lambda w: len(w))
    pairs.sort(key=lambda p: p[1])

~.reverse()~ reverses a list in place.`,
r4`Write ~sort_by_length(words)~ returning the words sorted by length (shortest first), and ~top_scores(pairs)~ where each pair is ~[name, score]~: return the names sorted by score, highest first.`,
r4`def sort_by_length(words):
    pass

def top_scores(pairs):
    pass

# Do not modify below this line
print(sort_by_length(["pear", "fig", "banana", "kiwi"]))
print(top_scores([["ann", 70], ["bob", 95], ["cy", 82]]))
`,
r4`def sort_by_length(words):
    words.sort(key=lambda w: len(w))
    return words

def top_scores(pairs):
    pairs.sort(key=lambda p: p[1], reverse=True)
    return [name for name, score in pairs]

print(sort_by_length(["pear", "fig", "banana", "kiwi"]))
print(top_scores([["ann", 70], ["bob", 95], ["cy", 82]]))
`,
r4`['fig', 'pear', 'kiwi', 'banana']
['bob', 'cy', 'ann']`);

L4(C, "List Comprehension",
r4`A list comprehension builds a list in one line: ~[expression for item in iterable]~, with an optional ~if~ filter.

    [i for i in range(5)]            # [0, 1, 2, 3, 4]
    [2 * i for i in range(5)]        # [0, 2, 4, 6, 8]
    [n for n in nums if n % 2 == 0]  # only evens`,
r4`Write ~squares(n)~ (squares of 0..n-1) and ~evens(nums)~ (only the even numbers), each as a single list comprehension.`,
r4`def squares(n):
    pass

def evens(nums):
    pass

# Do not modify below this line
print(squares(5))
print(evens([1, 2, 3, 4, 5, 6]))
print(squares(0))
`,
r4`def squares(n):
    return [i * i for i in range(n)]

def evens(nums):
    return [x for x in nums if x % 2 == 0]

print(squares(5))
print(evens([1, 2, 3, 4, 5, 6]))
print(squares(0))
`,
r4`[0, 1, 4, 9, 16]
[2, 4, 6]
[]`);

L4(C, "2D Lists",
r4`Build a grid with a nested comprehension: ~[[0] * 4 for i in range(4)]~. That makes 4 **separate** rows.

The tempting shortcut ~[[0] * 4] * 4~ makes 4 references to the **same** row, so changing one cell changes every row!

    good = [[0] * 3 for _ in range(3)]
    bad  = [[0] * 3] * 3
    good[0][0] = 1   # only row 0 changes
    bad[0][0] = 1    # every row changes`,
r4`Write ~make_grid(rows, cols)~ returning a grid of zeros with independent rows. The test sets one cell and prints the grid, so a shared-row bug will show up.`,
r4`def make_grid(rows, cols):
    pass

# Do not modify below this line
g = make_grid(3, 4)
g[0][0] = 1
g[2][3] = 9
print(g)
print(len(g), len(g[0]))
`,
r4`def make_grid(rows, cols):
    return [[0] * cols for i in range(rows)]

g = make_grid(3, 4)
g[0][0] = 1
g[2][3] = 9
print(g)
print(len(g), len(g[0]))
`,
r4`[[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 9]]
3 4`);

L4(C, "Strings: ord, join, and Cost",
r4`Strings are immutable, so ~s += "x"~ builds a **new** string each time (O(n)). Collect pieces in a list and ~"".join(...)~ them at the end. ~ord("a")~ is 97 (the character code). ~"-".join(["a","b"])~ joins with a delimiter.

    "".join(["a", "b", "c"])    # abc
    " ".join(["a", "b", "c"])   # a b c
    ord("b") - ord("a")         # 1`,
r4`Write ~shift_letters(s)~ that shifts each lowercase letter forward by one (~a~→~b~, ~z~→~a~) using ~ord~/~chr~, collecting into a list and joining. Also write ~alphabet_index(c)~ returning ~ord(c) - ord("a")~.`,
r4`def shift_letters(s):
    pass

def alphabet_index(c):
    pass

# Do not modify below this line
print(shift_letters("abc"))
print(shift_letters("xyz"))
print(alphabet_index("a"), alphabet_index("e"), alphabet_index("z"))
print("-".join(["a", "b", "c"]))
`,
r4`def shift_letters(s):
    out = []
    for ch in s:
        idx = (ord(ch) - ord("a") + 1) % 26
        out.append(chr(idx + ord("a")))
    return "".join(out)

def alphabet_index(c):
    return ord(c) - ord("a")

print(shift_letters("abc"))
print(shift_letters("xyz"))
print(alphabet_index("a"), alphabet_index("e"), alphabet_index("z"))
print("-".join(["a", "b", "c"]))
`,
r4`bcd
yza
0 4 25
a-b-c`);

L4(C, "Queues (deque)",
r4`A list is a poor queue because ~pop(0)~ is O(n). Use ~collections.deque~, a double-ended queue: ~append~ / ~pop~ on the right and ~appendleft~ / ~popleft~ on the left are all O(1).

    from collections import deque
    q = deque()
    q.append(1); q.append(2)
    q.popleft()        # 1
    q.appendleft(1)
    q.pop()            # 2`,
r4`Write ~first_n(n)~: simulate a queue; push 1, 2, ..., n using ~append~, then pop everything with ~popleft~ and return the popped values as a list. Also write ~rotate(q)~ that moves the front element of a deque to the back.`,
r4`from collections import deque

def first_n(n):
    pass

def rotate(q):
    pass

# Do not modify below this line
print(first_n(4))
d = deque([1, 2, 3])
rotate(d)
print(list(d))
`,
r4`from collections import deque

def first_n(n):
    q = deque()
    for i in range(1, n + 1):
        q.append(i)
    result = []
    while q:
        result.append(q.popleft())
    return result

def rotate(q):
    q.append(q.popleft())

print(first_n(4))
d = deque([1, 2, 3])
rotate(d)
print(list(d))
`,
r4`[1, 2, 3, 4]
[2, 3, 1]`);

L4(C, "Hash Sets in Interviews",
r4`Sets give O(1) add, remove and membership checks. Build one from a list with ~set(nums)~ or with a *set comprehension*:

    s = {i for i in range(3)}   # {0, 1, 2}
    s.add(5)
    s.remove(5)
    5 in s                      # False`,
r4`Write ~has_pair(nums, target)~: return True if two **different** elements sum to ~target~, using a set of numbers seen so far (one pass).`,
r4`def has_pair(nums, target):
    pass

# Do not modify below this line
print(has_pair([2, 7, 11, 15], 9))
print(has_pair([1, 2, 3], 7))
print(has_pair([5], 10))
print(has_pair([3, 3], 6))
`,
r4`def has_pair(nums, target):
    seen = set()
    for n in nums:
        if target - n in seen:
            return True
        seen.add(n)
    return False

print(has_pair([2, 7, 11, 15], 9))
print(has_pair([1, 2, 3], 7))
print(has_pair([5], 10))
print(has_pair([3, 3], 6))
`,
r4`True
False
False
True`);

L4(C, "Hash Maps in Interviews",
r4`Dictionaries are *the* interview data structure: O(1) insert, lookup, update, delete. Initialise with literal pairs or a **dict comprehension**:

    d = {i: 2 * i for i in range(3)}   # {0: 0, 1: 2, 2: 4}
    "x" in d
    d.pop("x")

Loop three ways: ~for k in d~, ~for v in d.values()~, ~for k, v in d.items()~. Dict comprehensions are great for building adjacency lists in graph problems.`,
r4`Write ~two_sum(nums, target)~: return the indexes ~[i, j]~ (i < j) of the two numbers adding up to ~target~, using a dictionary that maps value → index. Exactly one answer is guaranteed.`,
r4`def two_sum(nums, target):
    pass

# Do not modify below this line
print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))
print(two_sum([3, 3], 6))
`,
r4`def two_sum(nums, target):
    index_of = {}
    for i, n in enumerate(nums):
        if target - n in index_of:
            return [index_of[target - n], i]
        index_of[n] = i

print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))
print(two_sum([3, 3], 6))
`,
r4`[0, 1]
[1, 2]
[0, 1]`);

L4(C, "Dict Comprehension & Adjacency Lists",
r4`Build a dictionary mapping each node to an empty list of neighbours in one line, then fill it from edges. This is the standard way to represent a graph.

    graph = {n: [] for n in range(3)}
    graph[0].append(1)`,
r4`Write ~build_graph(n, edges)~ returning an **undirected** adjacency list for nodes ~0..n-1~ (edges are ~[a, b]~ pairs; add each to both nodes' lists in the order given).`,
r4`def build_graph(n, edges):
    pass

# Do not modify below this line
print(build_graph(3, [[0, 1], [1, 2]]))
print(build_graph(2, []))
print(build_graph(4, [[0, 3], [0, 1], [2, 3]]))
`,
r4`def build_graph(n, edges):
    graph = {i: [] for i in range(n)}
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    return graph

print(build_graph(3, [[0, 1], [1, 2]]))
print(build_graph(2, []))
print(build_graph(4, [[0, 3], [0, 1], [2, 3]]))
`,
r4`{0: [1], 1: [0, 2], 2: [1]}
{0: [], 1: []}
{0: [3, 1], 1: [0], 2: [3], 3: [0, 2]}`);

L4(C, "Tuples as Keys",
r4`Lists are **not hashable**, so they can't be dictionary keys or set members. Tuples are, because they are immutable. Use a tuple for coordinates or pairs:

    visited = set()
    visited.add((1, 2))
    (1, 2) in visited      # True
    grid_value = {(0, 0): "a"}`,
r4`Write ~count_unique_cells(moves)~: starting at ~(0, 0)~, each move is ~"U"~, ~"D"~, ~"L"~ or ~"R"~ (y+1, y-1, x-1, x+1). Return how many distinct positions you visit (including the start). Store positions as tuples in a set.`,
r4`def count_unique_cells(moves):
    pass

# Do not modify below this line
print(count_unique_cells("UD"))
print(count_unique_cells("UURR"))
print(count_unique_cells("UDUDUD"))
print(count_unique_cells(""))
`,
r4`def count_unique_cells(moves):
    x, y = 0, 0
    seen = {(x, y)}
    for m in moves:
        if m == "U":
            y += 1
        elif m == "D":
            y -= 1
        elif m == "L":
            x -= 1
        elif m == "R":
            x += 1
        seen.add((x, y))
    return len(seen)

print(count_unique_cells("UD"))
print(count_unique_cells("UURR"))
print(count_unique_cells("UDUDUD"))
print(count_unique_cells(""))
`,
r4`2
5
2
1`);

L4(C, "Heaps: Min Heap",
r4`The ~heapq~ module turns a plain list into a **min heap**. ~heappush(h, x)~ adds, ~heappop(h)~ removes and returns the smallest, and the smallest is always at ~h[0]~.

    import heapq
    h = []
    heapq.heappush(h, 3)
    heapq.heappush(h, 1)
    print(h[0])               # 1
    print(heapq.heappop(h))   # 1`,
r4`Write ~heap_sort(nums)~: push every number onto a min heap, then pop them all into a list. The result is sorted ascending.`,
r4`import heapq

def heap_sort(nums):
    pass

# Do not modify below this line
print(heap_sort([5, 1, 4, 2, 3]))
print(heap_sort([]))
print(heap_sort([2, 2, 1]))
`,
r4`import heapq

def heap_sort(nums):
    h = []
    for n in nums:
        heapq.heappush(h, n)
    result = []
    while h:
        result.append(heapq.heappop(h))
    return result

print(heap_sort([5, 1, 4, 2, 3]))
print(heap_sort([]))
print(heap_sort([2, 2, 1]))
`,
r4`[1, 2, 3, 4, 5]
[]
[1, 2, 2]`);

L4(C, "Heaps: Max Heap & Heapify",
r4`Python has no max heap. The trick: push **negated** values and negate again when you pop.

    heapq.heappush(h, -3)
    largest = -heapq.heappop(h)

If you already have all the values, ~heapq.heapify(list)~ builds a heap **in place** in O(n), faster than pushing one by one.`,
r4`Write ~k_largest(nums, k)~ returning the k largest numbers, biggest first, using a max heap built with negation (negate everything, ~heapify~, then pop k times).`,
r4`import heapq

def k_largest(nums, k):
    pass

# Do not modify below this line
print(k_largest([3, 1, 5, 2, 4], 2))
print(k_largest([9, 8, 7], 3))
print(k_largest([1], 1))
`,
r4`import heapq

def k_largest(nums, k):
    h = [-n for n in nums]
    heapq.heapify(h)
    result = []
    for _ in range(k):
        result.append(-heapq.heappop(h))
    return result

print(k_largest([3, 1, 5, 2, 4], 2))
print(k_largest([9, 8, 7], 3))
print(k_largest([1], 1))
`,
r4`[5, 4]
[9, 8, 7]
[1]`);

L4(C, "Nested Functions",
r4`A function defined inside another function can **read** the outer function's variables without them being passed in. This keeps recursive helpers short (very common in graph / backtracking problems).

    def outer(a, b):
        def inner():
            return a + b
        return inner()`,
r4`Write ~count_paths(grid)~ with an inner helper ~dfs(r, c)~ that uses the outer ~grid~ without it being passed. Count the paths from the top-left to the bottom-right moving only right or down, where ~1~ marks a blocked cell and ~0~ is open.`,
r4`def count_paths(grid):
    rows, cols = len(grid), len(grid[0])

    def dfs(r, c):
        pass

    return dfs(0, 0)

# Do not modify below this line
print(count_paths([[0, 0], [0, 0]]))
print(count_paths([[0, 0, 0], [0, 1, 0], [0, 0, 0]]))
print(count_paths([[0, 1], [1, 0]]))
`,
r4`def count_paths(grid):
    rows, cols = len(grid), len(grid[0])

    def dfs(r, c):
        if r >= rows or c >= cols or grid[r][c] == 1:
            return 0
        if r == rows - 1 and c == cols - 1:
            return 1
        return dfs(r + 1, c) + dfs(r, c + 1)

    return dfs(0, 0)

print(count_paths([[0, 0], [0, 0]]))
print(count_paths([[0, 0, 0], [0, 1, 0], [0, 0, 0]]))
print(count_paths([[0, 1], [1, 0]]))
`,
r4`2
2
0`);

L4(C, "Nested Functions: nonlocal",
r4`An inner function can **modify** a list or dict it can see, but plain assignment to an outer variable creates a new *local* instead. To reassign an outer variable, declare it ~nonlocal~.

    def outer():
        total = 0
        def add(n):
            nonlocal total
            total += n
        add(5)
        return total   # 5`,
r4`Write ~double_all(nums, value)~: it has an inner helper ~helper()~ that doubles every item of the list ~nums~ **and** the number ~value~ (needs ~nonlocal~). Return a tuple ~(nums, value)~.`,
r4`def double_all(nums, value):
    def helper():
        pass

    helper()
    return (nums, value)

# Do not modify below this line
print(double_all([1, 2, 3], 10))
print(double_all([], 5))
`,
r4`def double_all(nums, value):
    def helper():
        nonlocal value
        for i in range(len(nums)):
            nums[i] *= 2
        value *= 2

    helper()
    return (nums, value)

print(double_all([1, 2, 3], 10))
print(double_all([], 5))
`,
r4`([2, 4, 6], 20)
([], 10)`);

L4(C, "Classes",
r4`A class bundles data and methods. ~__init__~ is the constructor. Every method receives ~self~ (like ~this~ in other languages) as its first parameter, and member variables are created on ~self~. Call other methods with ~self.method()~.

    class MyClass:
        def __init__(self, nums):
            self.nums = nums
            self.size = len(nums)

        def get_length(self):
            return self.size

        def get_double_length(self):
            return 2 * self.get_length()

    obj = MyClass([1, 2, 3])
    obj.get_double_length()   # 6`,
r4`Implement a ~Counter~ class: ~__init__(self, start)~ stores the value; ~increment(self)~ adds 1; ~add(self, n)~ adds n; ~get(self)~ returns the value; ~double_then_get(self)~ doubles the value and returns it (reuse your other methods where you can).`,
r4`class Counter:
    pass

# Do not modify below this line
c = Counter(5)
c.increment()
c.add(10)
print(c.get())
print(c.double_then_get())
d = Counter(0)
print(d.get())
`,
r4`class Counter:
    def __init__(self, start):
        self.value = start

    def increment(self):
        self.value += 1

    def add(self, n):
        self.value += n

    def get(self):
        return self.value

    def double_then_get(self):
        self.value *= 2
        return self.get()

c = Counter(5)
c.increment()
c.add(10)
print(c.get())
print(c.double_then_get())
d = Counter(0)
print(d.get())
`,
r4`16
32
0`);
