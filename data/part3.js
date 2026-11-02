// Part 3: Strings, Lists, Tuples, Sets, Dicts, Input, Exceptions
const r3 = String.raw;
const L3 = (ch, title, body, task, starter, solution, expected, stdin = "") =>
  window.LESSONS.push({ ch, title, body, task, starter, solution, expected, stdin });

/* ---------- STRINGS ---------- */
L3("Strings", "Length Function",
r3`~len()~ returns how many characters a string has.

    print(len("neetcode"))   # 8`,
r3`Write ~get_longer_word(w1, w2)~ returning the longer word. If they have the same length, return the first one.`,
r3`def get_longer_word(w1, w2):
    pass

# Do not modify below this line
print(get_longer_word("cat", "horse"))
print(get_longer_word("python", "go"))
print(get_longer_word("same", "size"))
`,
r3`def get_longer_word(w1, w2):
    if len(w2) > len(w1):
        return w2
    return w1

print(get_longer_word("cat", "horse"))
print(get_longer_word("python", "go"))
print(get_longer_word("same", "size"))
`,
r3`horse
python
same`);

L3("Strings", "String Indexing",
r3`Each character has an *index* starting at **0**. Use square brackets. Negative indexes count from the end (~-1~ is the last character).

    s = "hello"
    print(s[0])    # h
    print(s[4])    # o
    print(s[-1])   # o`,
r3`Write ~first_and_last(s)~ returning the first and last characters joined together (e.g. ~"python"~ gives ~"pn"~).`,
r3`def first_and_last(s):
    pass

# Do not modify below this line
print(first_and_last("python"))
print(first_and_last("abc"))
print(first_and_last("xy"))
`,
r3`def first_and_last(s):
    return s[0] + s[-1]

print(first_and_last("python"))
print(first_and_last("abc"))
print(first_and_last("xy"))
`,
r3`pn
ac
xy`);

L3("Strings", "String Looping",
r3`To visit every character, loop over the valid indexes: ~range(len(s))~.

    s = "abc"
    for i in range(len(s)):
        print(s[i])`,
r3`Implement ~print_characters(s)~ printing each character on its own line, using ~range(len(s))~.`,
r3`def print_characters(s):
    pass

# Do not modify below this line
print_characters("code")
`,
r3`def print_characters(s):
    for i in range(len(s)):
        print(s[i])

print_characters("code")
`,
r3`c
o
d
e`);

L3("Strings", "String Looping Shorthand",
r3`If you don't need the index, loop over the string directly:

    for ch in "abc":
        print(ch)

~print(a, b)~ prints both values separated by a space.`,
r3`Write ~count_vowels(s)~ returning how many characters of the lowercase string ~s~ are one of ~a e i o u~. Loop directly over the characters.`,
r3`def count_vowels(s):
    pass

# Do not modify below this line
print(count_vowels("neetcode"))
print(count_vowels("rhythm"))
print(count_vowels("aeiou"))
`,
r3`def count_vowels(s):
    count = 0
    for ch in s:
        if ch in "aeiou":
            count += 1
    return count

print(count_vowels("neetcode"))
print(count_vowels("rhythm"))
print(count_vowels("aeiou"))
`,
r3`4
0
5`);

L3("Strings", "String Concatenation",
r3`~+~ joins two strings into a **new** string.

    print("Hello, " + "World")`,
r3`Write ~join_words(a, b)~: return ~a~ and ~b~ joined together. If the combined string is longer than 10 characters, return ~"too long"~ instead.`,
r3`def join_words(a, b):
    pass

# Do not modify below this line
print(join_words("good", "job"))
print(join_words("neet", "code"))
print(join_words("hello", "world!"))
print(join_words("12345", "67890"))
`,
r3`def join_words(a, b):
    result = a + b
    if len(result) > 10:
        return "too long"
    return result

print(join_words("good", "job"))
print(join_words("neet", "code"))
print(join_words("hello", "world!"))
print(join_words("12345", "67890"))
`,
r3`goodjob
neetcode
too long
1234567890`);

L3("Strings", "String Slicing Part 1",
r3`A *slice* ~s[start:end]~ gives the characters from ~start~ up to, but **not including**, ~end~.

    s = "neetcode"
    print(s[1:5])   # eetc`,
r3`Write ~middle(s)~ returning the string without its first and last characters.`,
r3`def middle(s):
    pass

# Do not modify below this line
print(middle("python"))
print(middle("abc"))
print(middle("ab"))
`,
r3`def middle(s):
    return s[1:len(s) - 1]

print(middle("python"))
print(middle("abc"))
print(middle("ab"))
`,
r3`ytho
b
`);

L3("Strings", "String Slicing Part 2",
r3`Either side can be left out. ~s[:3]~ starts at the beginning; ~s[4:]~ goes to the end; negative numbers count from the end.

    s = "neetcode"
    s[:3]    # nee
    s[4:]    # code
    s[-4:]   # code`,
r3`Write ~split_in_half(s)~ returning the string ~first half + "|" + second half~. For odd lengths the first half is the shorter one (hint: ~//~).`,
r3`def split_in_half(s):
    pass

# Do not modify below this line
print(split_in_half("neetcode"))
print(split_in_half("abc"))
print(split_in_half("a"))
`,
r3`def split_in_half(s):
    mid = len(s) // 2
    return s[:mid] + "|" + s[mid:]

print(split_in_half("neetcode"))
print(split_in_half("abc"))
print(split_in_half("a"))
`,
r3`neet|code
a|bc
|a`);

L3("Strings", "Reversing a String",
r3`Slices accept a third value, the *step*. A step of ~-1~ walks backwards, so ~s[::-1]~ reverses the whole string.

    print("hello"[::-1])   # olleh`,
r3`Write ~is_palindrome(s)~ returning True if the string reads the same forwards and backwards.`,
r3`def is_palindrome(s):
    pass

# Do not modify below this line
print(is_palindrome("racecar"))
print(is_palindrome("python"))
print(is_palindrome("abba"))
print(is_palindrome("a"))
`,
r3`def is_palindrome(s):
    return s == s[::-1]

print(is_palindrome("racecar"))
print(is_palindrome("python"))
print(is_palindrome("abba"))
print(is_palindrome("a"))
`,
r3`True
False
True
True`);

L3("Strings", "Strings are Immutable",
r3`Strings cannot be changed in place; ~s[0] = "X"~ is a ~TypeError~. To "change" one, build a new string from pieces.

    s = "hello"
    s = "J" + s[1:]   # Jello`,
r3`Write ~replace_first(s, ch)~ returning a new string where the first character of ~s~ is replaced by ~ch~.`,
r3`def replace_first(s, ch):
    pass

# Do not modify below this line
print(replace_first("hello", "J"))
print(replace_first("cat", "b"))
print(replace_first("x", "y"))
`,
r3`def replace_first(s, ch):
    return ch + s[1:]

print(replace_first("hello", "J"))
print(replace_first("cat", "b"))
print(replace_first("x", "y"))
`,
r3`Jello
bat
y`);

L3("Strings", "String Formatting",
r3`~.format()~ fills ~{}~ placeholders in order:

    "Hello {}, you are {}".format("Alice", 25)

Modern Python also has *f-strings*, which put the variables right in the text:

    name = "Alice"
    print(f"Hello {name}")`,
r3`Write ~describe(name, age)~ returning ~"<name> is <age> years old"~ using ~.format()~ or an f-string.`,
r3`def describe(name, age):
    pass

# Do not modify below this line
print(describe("Alice", 25))
print(describe("Bob", 7))
`,
r3`def describe(name, age):
    return f"{name} is {age} years old"

print(describe("Alice", 25))
print(describe("Bob", 7))
`,
r3`Alice is 25 years old
Bob is 7 years old`);

/* ---------- LISTS ---------- */
L3("Lists", "Intro to Lists",
r3`A *list* is an ordered collection written in square brackets. Like strings it has ~len()~ and indexes, but lists are **mutable**: you can change elements.

    nums = [1, 2, 3]
    nums[0] = 10
    print(nums)        # [10, 2, 3]
    print(len(nums))   # 3`,
r3`Write ~replace_middle(nums, value)~ that sets the middle element (index ~len(nums) // 2~) to ~value~ and returns the list.`,
r3`def replace_middle(nums, value):
    pass

# Do not modify below this line
print(replace_middle([1, 2, 3], 99))
print(replace_middle([5, 6, 7, 8, 9], 0))
`,
r3`def replace_middle(nums, value):
    nums[len(nums) // 2] = value
    return nums

print(replace_middle([1, 2, 3], 99))
print(replace_middle([5, 6, 7, 8, 9], 0))
`,
r3`[1, 99, 3]
[5, 6, 0, 8, 9]`);

L3("Lists", "List Operations",
r3`An empty list is falsy, a non-empty one truthy. Use ~in~ to test membership:

    if 2 in [1, 2, 3]:
        print("found")
    if not []:
        print("empty")`,
r3`Write ~check(nums, target)~ returning ~"empty"~ if the list is empty, else ~"found"~ if ~target~ is in it, else ~"missing"~.`,
r3`def check(nums, target):
    pass

# Do not modify below this line
print(check([], 1))
print(check([1, 2, 3], 2))
print(check([1, 2, 3], 9))
`,
r3`def check(nums, target):
    if not nums:
        return "empty"
    if target in nums:
        return "found"
    return "missing"

print(check([], 1))
print(check([1, 2, 3], 2))
print(check([1, 2, 3], 9))
`,
r3`empty
found
missing`);

L3("Lists", "List Looping",
r3`Loop over a list just like a string: ~for x in nums~, or by index with ~range(len(nums))~. Prefer the first when you don't need the index.

    for x in [4, 5, 6]:
        print(x)`,
r3`Write ~count_x(nums, x)~ returning how many times ~x~ appears in ~nums~ (do not use ~.count()~).`,
r3`def count_x(nums, x):
    pass

# Do not modify below this line
print(count_x([1, 2, 2, 3, 2], 2))
print(count_x([5, 5, 5], 4))
print(count_x([], 1))
`,
r3`def count_x(nums, x):
    count = 0
    for n in nums:
        if n == x:
            count += 1
    return count

print(count_x([1, 2, 2, 3, 2], 2))
print(count_x([5, 5, 5], 4))
print(count_x([], 1))
`,
r3`3
0
0`);

L3("Lists", "List Functions",
r3`Python has built-ins ~sum()~, ~min()~ and ~max()~ for number lists. A good exercise is writing them yourself with a loop that tracks the running total / smallest / largest.`,
r3`Implement ~get_sum~, ~get_min~ and ~get_max~ **without** using the built-ins. Assume the list has at least one element.`,
r3`def get_sum(nums):
    pass

def get_min(nums):
    pass

def get_max(nums):
    pass

# Do not modify below this line
data = [4, -2, 9, 3]
print(get_sum(data))
print(get_min(data))
print(get_max(data))
print(get_max([7]))
`,
r3`def get_sum(nums):
    total = 0
    for n in nums:
        total += n
    return total

def get_min(nums):
    best = nums[0]
    for n in nums:
        if n < best:
            best = n
    return best

def get_max(nums):
    best = nums[0]
    for n in nums:
        if n > best:
            best = n
    return best

data = [4, -2, 9, 3]
print(get_sum(data))
print(get_min(data))
print(get_max(data))
print(get_max([7]))
`,
r3`14
-2
9
7`);

L3("Lists", "List Append",
r3`~.append(x)~ adds ~x~ to the end of a list. It changes the list in place (and returns ~None~).

    nums = [1, 2, 3]
    nums.append(4)   # [1, 2, 3, 4]

A function called with a dot like this is called a *method*.`,
r3`Write ~evens_up_to(n)~ that builds and returns a list of the even numbers from 0 to n inclusive, using ~append~.`,
r3`def evens_up_to(n):
    pass

# Do not modify below this line
print(evens_up_to(10))
print(evens_up_to(7))
print(evens_up_to(0))
`,
r3`def evens_up_to(n):
    result = []
    for i in range(0, n + 1, 2):
        result.append(i)
    return result

print(evens_up_to(10))
print(evens_up_to(7))
print(evens_up_to(0))
`,
r3`[0, 2, 4, 6, 8, 10]
[0, 2, 4, 6]
[0]`);

L3("Lists", "List Pop",
r3`~.pop()~ removes **and returns** the last element. ~.pop(i)~ removes the element at **index** ~i~ (not the value ~i~).

    nums = [1, 2, 3]
    nums.pop()     # removes 3
    nums.pop(0)    # removes 1, leaving [2]`,
r3`Write ~remove_at(nums, i)~ that removes the element at index ~i~ and returns the list.`,
r3`def remove_at(nums, i):
    pass

# Do not modify below this line
print(remove_at([10, 20, 30], 0))
print(remove_at([10, 20, 30], 2))
print(remove_at([5, 6, 7, 8], 1))
`,
r3`def remove_at(nums, i):
    nums.pop(i)
    return nums

print(remove_at([10, 20, 30], 0))
print(remove_at([10, 20, 30], 2))
print(remove_at([5, 6, 7, 8], 1))
`,
r3`[20, 30]
[10, 20]
[5, 7, 8]`);

L3("Lists", "List Find",
r3`~.index(x)~ returns the index of the **first** occurrence of ~x~, and raises a ~ValueError~ if it is absent.

    [1, 2, 3, 4, 5, 3].index(3)   # 2`,
r3`Write ~find_index(nums, target)~ returning the index of ~target~ or ~-1~ if it is not in the list. Do not use ~.index()~ (loop instead).`,
r3`def find_index(nums, target):
    pass

# Do not modify below this line
print(find_index([1, 2, 3, 4, 5, 3], 3))
print(find_index([1, 2, 3], 9))
print(find_index([7], 7))
`,
r3`def find_index(nums, target):
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1

print(find_index([1, 2, 3, 4, 5, 3], 3))
print(find_index([1, 2, 3], 9))
print(find_index([7], 7))
`,
r3`2
-1
0`);

L3("Lists", "List Slicing",
r3`Lists slice exactly like strings, and negative indexes work too.

    nums = [1, 2, 3, 4, 5]
    nums[1:3]   # [2, 3]
    nums[:3]    # [1, 2, 3]
    nums[-2:]   # [4, 5]
    nums[::-1]  # [5, 4, 3, 2, 1]`,
r3`Write ~rotate_left(nums)~ returning a new list where the first element moves to the end (~[1,2,3]~ becomes ~[2,3,1]~). Handle the empty list.`,
r3`def rotate_left(nums):
    pass

# Do not modify below this line
print(rotate_left([1, 2, 3]))
print(rotate_left([9]))
print(rotate_left([]))
print(rotate_left([1, 2, 3, 4, 5]))
`,
r3`def rotate_left(nums):
    return nums[1:] + nums[:1]

print(rotate_left([1, 2, 3]))
print(rotate_left([9]))
print(rotate_left([]))
print(rotate_left([1, 2, 3, 4, 5]))
`,
r3`[2, 3, 1]
[9]
[]
[2, 3, 4, 5, 1]`);

/* ---------- TUPLES / SETS / DICTS ---------- */
L3("Tuples", "Tuples",
r3`A *tuple* is like a list but **immutable**, written with parentheses. You can index and slice it, but not modify it (no ~append~, no ~pop~, no item assignment).

    point = (3, 4)
    print(point[0])    # 3
    x, y = point       # unpacking`,
r3`Write ~min_max(nums)~ returning the smallest and largest as a tuple ~(smallest, largest)~.`,
r3`def min_max(nums):
    pass

# Do not modify below this line
print(min_max([4, 1, 9, 3]))
print(min_max([5]))
low, high = min_max([10, -3, 8])
print(low, high)
`,
r3`def min_max(nums):
    return (min(nums), max(nums))

print(min_max([4, 1, 9, 3]))
print(min_max([5]))
low, high = min_max([10, -3, 8])
print(low, high)
`,
r3`(1, 9)
(5, 5)
-3 10`);

L3("Sets", "Intro to Sets",
r3`A *set* is an **unordered** collection of **unique** elements, written with curly braces. Duplicates are dropped automatically. An empty set must be made with ~set()~ (~{}~ is an empty dictionary!).

    s = {1, 2, 2, 3}
    print(len(s))      # 3
    s.add(4)
    print(2 in s)      # True`,
r3`Write ~unique_count(nums)~ returning how many distinct values are in the list, using a set.`,
r3`def unique_count(nums):
    pass

# Do not modify below this line
print(unique_count([1, 2, 2, 3, 3, 3]))
print(unique_count([]))
print(unique_count([5, 5, 5]))
`,
r3`def unique_count(nums):
    seen = set()
    for n in nums:
        seen.add(n)
    return len(seen)

print(unique_count([1, 2, 2, 3, 3, 3]))
print(unique_count([]))
print(unique_count([5, 5, 5]))
`,
r3`3
0
1`);

L3("Sets", "Set Operations",
r3`~.remove(x)~ deletes ~x~ (error if missing; ~.discard(x)~ doesn't complain). ~set(list)~ converts a list to a set, removing duplicates. Sets also support ~&~ (intersection) and ~|~ (union).

    set([1, 1, 2])     # {1, 2}
    {1, 2} & {2, 3}    # {2}`,
r3`Write ~common(a, b)~ returning a **sorted list** of the values that appear in both lists (~sorted(...)~ turns a set into a sorted list).`,
r3`def common(a, b):
    pass

# Do not modify below this line
print(common([1, 2, 3, 4], [3, 4, 5]))
print(common([1, 1, 2], [2, 2, 1]))
print(common([1], [2]))
`,
r3`def common(a, b):
    return sorted(set(a) & set(b))

print(common([1, 2, 3, 4], [3, 4, 5]))
print(common([1, 1, 2], [2, 2, 1]))
print(common([1], [2]))
`,
r3`[3, 4]
[1, 2]
[]`);

L3("Sets", "Set Practice",
r3`Sets are great for "have I seen this before?" because membership checks are fast.

    seen = set()
    for w in words:
        if w in seen:
            ...   # duplicate!
        seen.add(w)`,
r3`Write ~contains_duplicate(words)~ returning True if any word appears more than once, using a set.`,
r3`def contains_duplicate(words):
    pass

# Do not modify below this line
print(contains_duplicate(["a", "b", "c"]))
print(contains_duplicate(["a", "b", "a"]))
print(contains_duplicate([]))
print(contains_duplicate(["x", "x"]))
`,
r3`def contains_duplicate(words):
    seen = set()
    for w in words:
        if w in seen:
            return True
        seen.add(w)
    return False

print(contains_duplicate(["a", "b", "c"]))
print(contains_duplicate(["a", "b", "a"]))
print(contains_duplicate([]))
print(contains_duplicate(["x", "x"]))
`,
r3`False
True
False
True`);

L3("Dictionaries", "Intro to Dictionaries",
r3`A *dictionary* stores **key: value** pairs (also called a map or hash map). Look values up by key.

    ages = {"Alice": 25, "Bob": 30}
    print(ages["Bob"])      # 30
    ages["Carol"] = 35      # add a new pair
    print(len(ages))        # 3`,
r3`Complete the code: add ~"Dan": 41~ to ~ages~, then print Alice's age and the number of people.`,
r3`ages = {"Alice": 25, "Bob": 30}
# add Dan here

print(ages["Alice"])
print(len(ages))
`,
r3`ages = {"Alice": 25, "Bob": 30}
ages["Dan"] = 41
print(ages["Alice"])
print(len(ages))
`,
r3`25
3`);

L3("Dictionaries", "Dict Operations",
r3`Keys are unique: assigning to an existing key **overwrites** its value. Use ~in~ to check whether a key exists (reading a missing key raises ~KeyError~). Values can be any type, even lists or other dicts.

    d = {"a": 1}
    d["a"] = 4        # overwrite
    "b" in d          # False`,
r3`Write ~safe_get(d, key)~ returning the value for ~key~, or ~"none"~ if the key isn't in the dictionary.`,
r3`def safe_get(d, key):
    pass

# Do not modify below this line
data = {"a": 1, "b": 2}
print(safe_get(data, "a"))
print(safe_get(data, "z"))
print(safe_get({}, "a"))
`,
r3`def safe_get(d, key):
    if key in d:
        return d[key]
    return "none"

data = {"a": 1, "b": 2}
print(safe_get(data, "a"))
print(safe_get(data, "z"))
print(safe_get({}, "a"))
`,
r3`1
none
none`);

L3("Dictionaries", "Dict Looping",
r3`Looping over a dict gives its **keys**. ~.items()~ gives (key, value) pairs.

    d = {"a": 1, "b": 2}
    for key in d:
        print(key, d[key])
    for key, value in d.items():
        print(key, value)`,
r3`Write ~total_age(ages)~ returning the sum of all values in the dictionary by looping with ~.items()~.`,
r3`def total_age(ages):
    pass

# Do not modify below this line
print(total_age({"Alice": 25, "Bob": 30, "Carol": 35}))
print(total_age({}))
`,
r3`def total_age(ages):
    total = 0
    for name, age in ages.items():
        total += age
    return total

print(total_age({"Alice": 25, "Bob": 30, "Carol": 35}))
print(total_age({}))
`,
r3`90
0`);

L3("Dictionaries", "Dict Practice",
r3`A classic use of a dictionary is **counting**. Because a missing key raises an error, check ~in~ first (or use ~.get(key, 0)~).

    counts = {}
    for x in items:
        if x in counts:
            counts[x] += 1
        else:
            counts[x] = 1`,
r3`Write ~count_chars(word)~ returning a dictionary that maps each character to how many times it appears.`,
r3`def count_chars(word):
    pass

# Do not modify below this line
print(count_chars("banana"))
print(count_chars(""))
print(count_chars("aab"))
`,
r3`def count_chars(word):
    counts = {}
    for c in word:
        if c in counts:
            counts[c] += 1
        else:
            counts[c] = 1
    return counts

print(count_chars("banana"))
print(count_chars(""))
print(count_chars("aab"))
`,
r3`{'b': 1, 'a': 3, 'n': 2}
{}
{'a': 2, 'b': 1}`);

L3("Dictionaries", "Dict Remove",
r3`~.pop(key)~ removes a pair (KeyError if missing). ~.pop(key, default)~ returns the default instead of erroring. The ~del~ keyword also removes a key.

    d = {"a": 1, "b": 2}
    d.pop("a")
    d.pop("zzz", 0)    # no error
    del d["b"]`,
r3`Write ~remove_keys(d, keys)~ removing every key in the list ~keys~ from the dictionary (ignore keys that don't exist) and returning it.`,
r3`def remove_keys(d, keys):
    pass

# Do not modify below this line
print(remove_keys({"a": 1, "b": 2, "c": 3}, ["a", "c"]))
print(remove_keys({"a": 1}, ["x", "y"]))
print(remove_keys({"a": 1, "b": 2}, ["a", "b"]))
`,
r3`def remove_keys(d, keys):
    for k in keys:
        d.pop(k, None)
    return d

print(remove_keys({"a": 1, "b": 2, "c": 3}, ["a", "c"]))
print(remove_keys({"a": 1}, ["x", "y"]))
print(remove_keys({"a": 1, "b": 2}, ["a", "b"]))
`,
r3`{'b': 2}
{'a': 1}
{}`);

L3("Dictionaries", "Dict Values",
r3`~.values()~ gives just the values and ~.keys()~ just the keys. Wrap with ~list()~ to get a real list.

    d = {"a": 1, "b": 2}
    list(d.values())   # [1, 2]
    list(d.keys())     # ['a', 'b']`,
r3`Write ~get_values(d)~ returning the dictionary's values as a list.`,
r3`def get_values(d):
    pass

# Do not modify below this line
print(get_values({"a": 1, "b": 2, "c": 3}))
print(get_values({}))
`,
r3`def get_values(d):
    return list(d.values())

print(get_values({"a": 1, "b": 2, "c": 3}))
print(get_values({}))
`,
r3`[1, 2, 3]
[]`);

/* ---------- INPUT ---------- */
L3("Input", "Reading Input",
r3`~input()~ reads one line from standard input and returns it as a string. If you pass a prompt, it is printed first. In this course the input is pre-filled for you (see the *stdin* box).

    name = input()
    print("Hi " + name)`,
r3`Read one line (a name) and print ~Hello, <name>!~`,
r3`# read the name and print the greeting
`,
r3`name = input()
print("Hello, " + name + "!")
`,
r3`Hello, Ada!`,
"Ada\n");

L3("Input", "Type Conversion with Input",
r3`~input()~ **always** returns a string. Convert it if you need a number:

    age = int(input())
    price = float(input())`,
r3`Read an integer ~age~ and print the age they will be **next year**.`,
r3`# read age and print next year's age
`,
r3`age = int(input())
print(age + 1)
`,
r3`31`,
"30\n");

L3("Input", "Parse Input",
r3`*Parsing* means turning raw text into structured data. ~.split(delimiter)~ breaks a string into a list of pieces.

    "1,2,3".split(",")     # ['1', '2', '3']
    "a b c".split()        # ['a', 'b', 'c']  (splits on whitespace)`,
r3`Read one line of space-separated integers, e.g. ~4 8 15~. Print their **sum**.`,
r3`# read the line, split it, convert, add
`,
r3`parts = input().split()
total = 0
for p in parts:
    total += int(p)
print(total)
`,
r3`42`,
"4 8 15 15\n");

L3("Input", "Reading Input Practice",
r3`Combine everything: read a line, split on a delimiter, convert the pieces, compute, and return.`,
r3`Implement ~add_two_numbers()~: it takes no parameters, reads **one line** like ~"3,4"~ (two integers separated by a comma) and returns their sum.`,
r3`def add_two_numbers():
    pass

# Do not modify below this line
print(add_two_numbers())
print(add_two_numbers())
`,
r3`def add_two_numbers():
    parts = input().split(",")
    return int(parts[0]) + int(parts[1])

print(add_two_numbers())
print(add_two_numbers())
`,
r3`7
-5`,
"3,4\n10,-15\n");

/* ---------- EXCEPTIONS ---------- */
L3("Exceptions", "Try Except",
r3`An error at runtime *crashes* the program. Wrap risky code in ~try~ and handle failure in ~except~:

    try:
        print(10 / 0)
    except:
        print("cannot divide by zero")
    print("still running")`,
r3`Write ~safe_divide(a, b)~ returning ~a / b~, or ~0~ if the division fails.`,
r3`def safe_divide(a, b):
    pass

# Do not modify below this line
print(safe_divide(10, 2))
print(safe_divide(5, 0))
print(safe_divide(9, 3))
`,
r3`def safe_divide(a, b):
    try:
        return a / b
    except:
        return 0

print(safe_divide(10, 2))
print(safe_divide(5, 0))
print(safe_divide(9, 3))
`,
r3`5.0
0
3.0`);

L3("Exceptions", "Error Catching",
r3`You can capture the error object to see what went wrong:

    try:
        int("abc")
    except Exception as e:
        print("Error:", e)`,
r3`Write ~divide_numbers(a, b)~ taking two **strings**. Convert both to ints and return ~a / b~. If anything goes wrong, return the text ~"Error: " + str(e)~ using the exception.`,
r3`def divide_numbers(a, b):
    pass

# Do not modify below this line
print(divide_numbers("10", "2"))
print(divide_numbers("10", "0"))
print(divide_numbers("ten", "2"))
`,
r3`def divide_numbers(a, b):
    try:
        return int(a) / int(b)
    except Exception as e:
        return "Error: " + str(e)

print(divide_numbers("10", "2"))
print(divide_numbers("10", "0"))
print(divide_numbers("ten", "2"))
`,
r3`5.0
Error: division by zero
Error: invalid literal for int() with base 10: 'ten'`);

L3("Exceptions", "Multiple Except Blocks",
r3`Catch specific error types separately; the first matching ~except~ runs. Keep a generic ~except Exception~ last as a fallback.

    try:
        ...
    except ValueError:
        ...
    except ZeroDivisionError:
        ...
    except Exception:
        ...`,
r3`Write ~calc(a, b)~ (two strings): return ~int(a) // int(b)~. On a ~ValueError~ return ~"not a number"~; on a ~ZeroDivisionError~ return ~"divide by zero"~; on any other exception return ~"unknown"~.`,
r3`def calc(a, b):
    pass

# Do not modify below this line
print(calc("20", "4"))
print(calc("x", "4"))
print(calc("20", "0"))
print(calc(None, "4"))
`,
r3`def calc(a, b):
    try:
        return int(a) // int(b)
    except ValueError:
        return "not a number"
    except ZeroDivisionError:
        return "divide by zero"
    except Exception:
        return "unknown"

print(calc("20", "4"))
print(calc("x", "4"))
print(calc("20", "0"))
print(calc(None, "4"))
`,
r3`5
not a number
divide by zero
unknown`);
