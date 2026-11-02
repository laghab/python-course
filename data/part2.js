// Part 2: Functions, Conditionals, Loops
const r2 = String.raw;
const L2 = (ch, title, body, task, starter, solution, expected, stdin = "") =>
  window.LESSONS.push({ ch, title, body, task, starter, solution, expected, stdin });

L2("Functions", "Introduction to Functions",
r2`A *function* is a named, reusable block of code. Define one with ~def~, a name, parentheses and a colon. The body is **indented** (this course uses 4 spaces). Run it by *calling* it.

    def say_hi():
        print("hi")

    say_hi()
    say_hi()`,
r2`Define a function ~show_banner~ that prints ~=== Welcome ===~, then call it twice.`,
r2`# define and call show_banner
`,
r2`def show_banner():
    print("=== Welcome ===")

show_banner()
show_banner()
`,
r2`=== Welcome ===
=== Welcome ===`);

L2("Functions", "Function Declaration",
r2`A function must be defined **before** it is called, just like a variable must be assigned before it is used. Code that is not indented belongs to the main program, not to the function.`,
r2`The calls below run before the function exists, causing an error. Move the function definition above the calls (keep the calls un-indented). Expected output: ~10~ then ~20~.`,
r2`show_number(10)
show_number(20)

def show_number(n):
    print(n)
`,
r2`def show_number(n):
    print(n)

show_number(10)
show_number(20)
`,
r2`10
20`);

L2("Functions", "Parameters",
r2`*Parameters* are variables listed in the parentheses that let a function receive input. The values you pass when calling are *arguments*.

    def greet(name):
        print("Hello, " + name)

    greet("Alice")   # Hello, Alice`,
r2`Write ~shout(word)~ which prints the word in a form like ~word!!!~ (the word followed by three exclamation marks).`,
r2`def shout(word):
    pass

# Do not modify below this line
shout("hey")
shout("python")
`,
r2`def shout(word):
    print(word + "!!!")

shout("hey")
shout("python")
`,
r2`hey!!!
python!!!`);

L2("Functions", "Multiple Parameters",
r2`Separate parameters with commas. Arguments are matched **by position**: the first argument goes to the first parameter, and so on.

    def greet(name, greeting):
        print(greeting + " " + name)

    greet("Alice", "Hello")   # Hello Alice`,
r2`Write ~two_sum(a, b)~ and ~three_sum(a, b, c)~, each printing the sum of its parameters.`,
r2`# define two_sum and three_sum


# Do not modify below this line
two_sum(10, 9)
three_sum(1, 2, 3)
three_sum(10, 20, 30)
`,
r2`def two_sum(a, b):
    print(a + b)

def three_sum(a, b, c):
    print(a + b + c)

two_sum(10, 9)
three_sum(1, 2, 3)
three_sum(10, 20, 30)
`,
r2`19
6
60`);

L2("Functions", "Return Statement",
r2`Instead of printing, a function can *return* a value to the caller, which can store or reuse it.

    def add(x, y):
        return x + y

    result = add(3, 5)
    print(result)   # 8

~return~ also ends the function immediately.`,
r2`Write ~product(a, b)~ that **returns** the product of its two parameters.`,
r2`def product(a, b):
    pass

# Do not modify below this line
print(product(2, 4))
print(product(8, 2))
print(product(-3, 5))
print(product(0, 99))
`,
r2`def product(a, b):
    return a * b

print(product(2, 4))
print(product(8, 2))
print(product(-3, 5))
print(product(0, 99))
`,
r2`8
16
-15
0`);

L2("Functions", "Type Hints",
r2`*Type hints* are optional notes about what types a function expects and returns. Python does not enforce them but they make code easier to read and tools can check them.

    def add(x: int, y: int) -> int:
        return x + y`,
r2`Add type hints to ~average~: both parameters are ~float~ and it returns a ~float~. (The output must stay the same.)`,
r2`def average(a, b):
    return (a + b) / 2

# Do not modify below this line
print(average(4.0, 6.0))
print(average(1.5, 2.5))
`,
r2`def average(a: float, b: float) -> float:
    return (a + b) / 2

print(average(4.0, 6.0))
print(average(1.5, 2.5))
`,
r2`5.0
2.0`);

L2("Functions", "Scope",
r2`*Scope* is where a variable can be seen. A parameter or a variable created inside a function is **local**: it exists only while the function runs, and does not affect a variable of the same name outside.

    n = 10
    def show(n):
        n = n + 1
        print(n)    # 11
    show(n)
    print(n)        # still 10`,
r2`Predict the behaviour, then make the program print ~100~ and then ~10~: complete ~double_then_show~ so it prints ~value * 10~ for whatever it receives, without changing the outer ~value~.`,
r2`value = 10

def double_then_show(value):
    pass

# Do not modify below this line
double_then_show(value)
print(value)
`,
r2`value = 10

def double_then_show(value):
    value = value * 10
    print(value)

double_then_show(value)
print(value)
`,
r2`100
10`);

L2("Functions", "Global vs Local Scope",
r2`A function can **read** a global variable, but a variable created inside a function disappears when it ends. Using it outside gives a ~NameError~.

    def make():
        x = 10        # local to make()

    make()
    print(x)          # NameError

    y = 5
    def show():
        print(y)      # fine: reads the global
    show()`,
r2`~total~ is defined inside the function but printed outside, causing a ~NameError~. Fix it so the function **returns** the value and the outside code prints it. Expected: ~42~`,
r2`def compute():
    total = 42

compute()
print(total)
`,
r2`def compute():
    total = 42
    return total

print(compute())
`,
r2`42`);

L2("Functions", "Default Arguments",
r2`A parameter can have a *default value* used when the caller omits it.

    def greet(name="world"):
        print("Hello, " + name)

    greet()        # Hello, world
    greet("Bob")   # Hello, Bob`,
r2`Give ~power(base, exponent)~ a default ~exponent~ of 2 so the calls below work.`,
r2`def power(base, exponent):
    return base ** exponent

# Do not modify below this line
print(power(5))
print(power(2, 10))
print(power(3))
`,
r2`def power(base, exponent=2):
    return base ** exponent

print(power(5))
print(power(2, 10))
print(power(3))
`,
r2`25
1024
9`);

L2("Conditionals", "Comparison Operators",
r2`Comparisons produce ~True~ or ~False~: ~==~ equal, ~!=~ not equal, ~<~, ~>~, ~<=~, ~>=~. A single ~=~ is assignment; use ~==~ to compare.`,
r2`Fill in each print with the comparison described in its comment.`,
r2`a = 7
b = 7
c = 3
print()  # a equals b
print()  # a is not equal to c
print()  # c is less than a
print()  # c is greater than or equal to a
print()  # b is less than or equal to a
`,
r2`a = 7
b = 7
c = 3
print(a == b)
print(a != c)
print(c < a)
print(c >= a)
print(b <= a)
`,
r2`True
True
True
False
True`);

L2("Conditionals", "If Statements",
r2`An ~if~ statement runs its indented block only when the condition is true.

    balance = -100
    if balance < 0:
        print("Overdrawn")
    print("Done")      # not indented: always runs`,
r2`Write ~check_temperature(t)~: if ~t~ is above 30, print ~Hot~. Otherwise print nothing.`,
r2`def check_temperature(t):
    pass

# Do not modify below this line
check_temperature(35)
check_temperature(10)
check_temperature(31)
check_temperature(30)
`,
r2`def check_temperature(t):
    if t > 30:
        print("Hot")

check_temperature(35)
check_temperature(10)
check_temperature(31)
check_temperature(30)
`,
r2`Hot
Hot`);

L2("Conditionals", "If Statement Scope",
r2`Unlike functions, ~if~ blocks do **not** create a new scope. A variable assigned inside an ~if~ is usable afterwards, and an ~if~ can update an outer variable.

    if True:
        msg = "hi"
    print(msg)   # works`,
r2`Write ~clamp_to_zero(balance)~ that sets ~balance~ to 0 if it is negative (inside an ~if~), then returns it.`,
r2`def clamp_to_zero(balance):
    pass

# Do not modify below this line
print(clamp_to_zero(-50))
print(clamp_to_zero(25))
print(clamp_to_zero(0))
`,
r2`def clamp_to_zero(balance):
    if balance < 0:
        balance = 0
    return balance

print(clamp_to_zero(-50))
print(clamp_to_zero(25))
print(clamp_to_zero(0))
`,
r2`0
25
0`);

L2("Conditionals", "If-Else Statements",
r2`~else~ runs when the ~if~ condition was false. Exactly one of the two blocks executes.

    if balance < 0:
        print("Overdrawn")
    else:
        print("Good standing")`,
r2`Write ~parity(n)~ that returns ~"even"~ if n is even and ~"odd"~ otherwise (hint: ~n % 2~).`,
r2`def parity(n):
    pass

# Do not modify below this line
print(parity(4))
print(parity(7))
print(parity(0))
`,
r2`def parity(n):
    if n % 2 == 0:
        return "even"
    else:
        return "odd"

print(parity(4))
print(parity(7))
print(parity(0))
`,
r2`even
odd
even`);

L2("Conditionals", "Else-If Statements",
r2`~elif~ ("else if") lets you check several conditions in order. The first true branch runs and the rest are skipped. ~else~ at the end catches everything else.

    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    else:
        grade = "C"`,
r2`Write ~grade(score)~: 90 and above is ~"A"~, 80-89 is ~"B"~, 70-79 is ~"C"~, below 70 is ~"F"~.`,
r2`def grade(score):
    pass

# Do not modify below this line
print(grade(95))
print(grade(85))
print(grade(70))
print(grade(69))
print(grade(80))
`,
r2`def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"

print(grade(95))
print(grade(85))
print(grade(70))
print(grade(69))
print(grade(80))
`,
r2`A
B
C
F
B`);

L2("Conditionals", "Logic Condition",
r2`Combine conditions with ~and~, ~or~, ~not~:

    if age >= 13 and age < 20:
        print("teenager")`,
r2`Write ~discount_applies(age)~: return True if the age is under 18 **or** 65 and over, else False.`,
r2`def discount_applies(age):
    pass

# Do not modify below this line
print(discount_applies(10))
print(discount_applies(18))
print(discount_applies(40))
print(discount_applies(64))
print(discount_applies(65))
`,
r2`def discount_applies(age):
    return age < 18 or age >= 65

print(discount_applies(10))
print(discount_applies(18))
print(discount_applies(40))
print(discount_applies(64))
print(discount_applies(65))
`,
r2`True
False
False
False
True`);

L2("Conditionals", "Truthy and Falsy",
r2`Any value can be used as a condition. These are *falsy*: ~False~, ~None~, ~0~, ~0.0~, ~""~ (empty string), empty collections. Almost everything else is *truthy*.

    name = ""
    if name:
        print("has a name")
    else:
        print("empty")`,
r2`Write ~describe(value)~ that returns ~"truthy"~ if the value is truthy and ~"falsy"~ otherwise, using the value directly in the ~if~ (no comparisons).`,
r2`def describe(value):
    pass

# Do not modify below this line
print(describe(""))
print(describe("hi"))
print(describe(0))
print(describe(7))
print(describe(None))
print(describe([]))
print(describe([0]))
`,
r2`def describe(value):
    if value:
        return "truthy"
    return "falsy"

print(describe(""))
print(describe("hi"))
print(describe(0))
print(describe(7))
print(describe(None))
print(describe([]))
print(describe([0]))
`,
r2`falsy
truthy
falsy
truthy
falsy
falsy
truthy`);

L2("Loops", "While Loops",
r2`A ~while~ loop repeats its body as long as the condition is true. Make sure something in the loop changes the condition, otherwise it runs forever.

    i = 0
    while i < 5:
        print("Python!")
        i += 1`,
r2`Use a ~while~ loop to print ~I love loops~ exactly 4 times.`,
r2`# write your loop
`,
r2`i = 0
while i < 4:
    print("I love loops")
    i += 1
`,
r2`I love loops
I love loops
I love loops
I love loops`);

L2("Loops", "While Loops Counting",
r2`Loops can print the counter itself, not just text.

    n = 0
    while n < 3:
        print(n)
        n += 1      # prints 0, 1, 2`,
r2`Use a ~while~ loop to print the digits 0 through 9, each on its own line.`,
r2`# write your loop
`,
r2`n = 0
while n <= 9:
    print(n)
    n += 1
`,
r2`0
1
2
3
4
5
6
7
8
9`);

L2("Loops", "While Loops Multiples",
r2`The counter does not have to go up by one. Change the starting value, the stopping condition and the increment to fit.`,
r2`Use a ~while~ loop to print the multiples of 10 from 10 up to and including 90.`,
r2`# write your loop
`,
r2`n = 10
while n <= 90:
    print(n)
    n += 10
`,
r2`10
20
30
40
50
60
70
80
90`);

L2("Loops", "For Loops",
r2`A ~for~ loop with ~range()~ is the compact way to count. ~range(n)~ produces 0 up to **n - 1**.

    for i in range(5):
        print(i)   # 0 1 2 3 4`,
r2`Use a ~for~ loop to print the digits 0 through 9.`,
r2`# write your loop
`,
r2`for i in range(10):
    print(i)
`,
r2`0
1
2
3
4
5
6
7
8
9`);

L2("Loops", "For Loops Start",
r2`~range(start, stop)~ begins at ~start~ and stops **before** ~stop~.

    for i in range(2, 5):
        print(i)   # 2 3 4`,
r2`Use a ~for~ loop to print the numbers 10 through 20 inclusive.`,
r2`# write your loop
`,
r2`for i in range(10, 21):
    print(i)
`,
r2`10
11
12
13
14
15
16
17
18
19
20`);

L2("Loops", "For Loops Step",
r2`~range(start, stop, step)~ takes a third argument: how much to add each time.

    for i in range(0, 10, 2):
        print(i)   # 0 2 4 6 8`,
r2`Use a ~for~ loop to print every odd number from 1 to 15 inclusive.`,
r2`# write your loop
`,
r2`for i in range(1, 16, 2):
    print(i)
`,
r2`1
3
5
7
9
11
13
15`);

L2("Loops", "For Loops Reverse",
r2`A **negative step** counts down. The stop value is still excluded, so to include 10 when counting down, stop at 9.

    for i in range(10, 0, -1):
        print(i)   # 10 down to 1`,
r2`Use a ~for~ loop to print the numbers 20 down to 10 inclusive.`,
r2`# write your loop
`,
r2`for i in range(20, 9, -1):
    print(i)
`,
r2`20
19
18
17
16
15
14
13
12
11
10`);

L2("Loops", "Nested Loops",
r2`A loop inside a loop runs the inner loop completely for every pass of the outer one. Use it for pairs, grids and tables.

    for i in range(1, 3):
        for j in range(1, 3):
            print(i, j)   # 1 1 / 1 2 / 2 1 / 2 2`,
r2`Print every pair ~i j~ where i goes 1 to 3 and j goes 1 to 3 (printed as ~print(i, j)~, which separates with a space). 9 lines total.`,
r2`# write your nested loops
`,
r2`for i in range(1, 4):
    for j in range(1, 4):
        print(i, j)
`,
r2`1 1
1 2
1 3
2 1
2 2
2 3
3 1
3 2
3 3`);

L2("Loops", "Control Flow",
r2`Three keywords control loops:

- ~break~: exit the loop immediately
- ~continue~: skip to the next iteration
- ~pass~: do nothing (a placeholder where code is required)

    for i in range(10):
        if i == 3:
            continue   # skip 3
        if i == 6:
            break      # stop at 6
        print(i)       # 0 1 2 4 5`,
r2`Loop from 1 to 20. Skip multiples of 3 (~continue~) and stop completely once you reach a number greater than 10 (~break~). Print the others.`,
r2`# write your loop
`,
r2`for i in range(1, 21):
    if i > 10:
        break
    if i % 3 == 0:
        continue
    print(i)
`,
r2`1
2
4
5
7
8
10`);
