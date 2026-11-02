// Part 1: Basics, Variables, Operators, Booleans
const r = String.raw;
window.LESSONS = window.LESSONS || [];
const L = (ch, title, body, task, starter, solution, expected, stdin = "") =>
  window.LESSONS.push({ ch, title, body, task, starter, solution, expected, stdin });

L("Basics", "Hello World",
r`Printing text is traditionally the first thing you do in any language. Python gives you a built-in function called ~print~. Put the text you want inside quotes, inside the parentheses.

    print("Welcome!")

Capital letters, spaces and punctuation all matter, so the output has to match exactly.`,
r`Print exactly: ~Hello, Python!~`,
r`print("")
`,
r`print("Hello, Python!")
`,
r`Hello, Python!`);

L("Basics", "What is Python?",
r`Python is an *interpreted* language: an interpreter reads your code line by line and runs it, instead of you compiling it to a program first. It is older than JavaScript (1991), has very readable syntax, and is used for scripting, backend work, data science and AI.`,
r`Python's first public release was in 1991. Fix the print statement so it prints exactly: ~Python was created in 1991~`,
r`print("Python was created in 1989")
`,
r`print("Python was created in 1991")
`,
r`Python was created in 1991`);

L("Basics", "Execution Order",
r`Code runs from top to bottom, one line at a time. Empty lines are ignored.

    print("one")
    print("two")

always prints ~one~ and then ~two~.`,
r`The three lines below are in the wrong order. Reorder them so the output is ~first~, ~second~, ~third~ (each on its own line).`,
r`print("second")
print("first")
print("third")
`,
r`print("first")
print("second")
print("third")
`,
r`first
second
third`);

L("Basics", "Printing Text",
r`Text in quotes is called a *string*. Python accepts both double quotes and single quotes. This is handy when the text itself contains a quote:

    print('She said "hi"')
    print("It's fine")

You can also *escape* a quote with a backslash, or use ~\n~ for a new line:

    print("She said \"hi\"")
    print("line one\nline two")`,
r`Print these two lines exactly (including the quotes and the apostrophe):

~He said "stop"~
~It's Python's turn~`,
r`print("He said "stop"")
print("It's Python's turn")
`,
r`print('He said "stop"')
print("It's Python's turn")
`,
r`He said "stop"
It's Python's turn`);

L("Basics", "Code Errors",
r`Python is strict about syntax. Forget a closing quote or parenthesis and you get a *SyntaxError* before anything runs. Read the message: it usually points right at the problem.

    print("hello"      # SyntaxError: '(' was never closed`,
r`This program has two syntax errors. Fix them so it prints ~All fixed~.`,
r`print("All fixed)
`,
r`print("All fixed")
`,
r`All fixed`);

L("Basics", "Comments",
r`A ~#~ starts a *comment*: Python ignores everything after it on that line. Comments explain your code to humans (or temporarily disable lines).

    # this does nothing
    print("this runs")   # so does this`,
r`Turn the two noisy lines into comments so only ~Only this prints~ appears in the output.`,
r`print("Debugging line 1")
print("Only this prints")
print("Debugging line 2")
`,
r`# print("Debugging line 1")
print("Only this prints")
# print("Debugging line 2")
`,
r`Only this prints`);

L("Variables", "Variable Declaration",
r`A *variable* is a name that holds a value. Use ~=~ to assign.

    message = "I love Python"
    print(message)
    print(message)

You do not repeat the text; you reuse the variable.`,
r`Store the text ~Practice makes perfect~ in a variable called ~motto~, then print it three times using the variable.`,
r`# create motto here

`,
r`motto = "Practice makes perfect"
print(motto)
print(motto)
print(motto)
`,
r`Practice makes perfect
Practice makes perfect
Practice makes perfect`);

L("Variables", "Variable Naming",
r`Variable names can contain letters, digits and underscores, but they **cannot start with a digit** and cannot contain spaces. Make them descriptive: ~capital_of_uk~ is better than ~x~.

    capital_of_uk = "London"   # valid
    1st_place = "Ann"          # invalid: starts with a digit
    best score = 10            # invalid: space`,
r`Two of these names are invalid and the program crashes. Rename them (anything valid) so it prints ~Ann scored 10~.`,
r`1st_place = "Ann"
best score = 10
print(1st_place + " scored " + str(best score))
`,
r`first_place = "Ann"
best_score = 10
print(first_place + " scored " + str(best_score))
`,
r`Ann scored 10`);

L("Variables", "Naming Conventions",
r`Conventions are not rules, but they make code easy to read.

- camelCase: ~myVariableName~
- PascalCase: ~MyVariableName~
- snake_case: ~my_variable_name~

Python uses **snake_case** for variables and functions.`,
r`Rename the variables to snake_case (do not change the values or the print line's output).`,
r`firstName = "Ada"
lastName = "Lovelace"
favoriteNumber = 42
print(first_name)
print(last_name)
print(favorite_number)
`,
r`first_name = "Ada"
last_name = "Lovelace"
favorite_number = 42
print(first_name)
print(last_name)
print(favorite_number)
`,
r`Ada
Lovelace
42`);

L("Variables", "Reassigning Variables",
r`A name can be re-pointed at a new value at any time. There is still just one variable; its value changed. Order matters.

    msg = "first"
    print(msg)     # first
    msg = "second"
    print(msg)     # second`,
r`Add a single line so the program prints ~hello~ and then ~goodbye~.`,
r`greeting = "hello"
print(greeting)

print(greeting)
`,
r`greeting = "hello"
print(greeting)
greeting = "goodbye"
print(greeting)
`,
r`hello
goodbye`);

L("Variables", "Multiple Assignments",
r`You can assign several variables at once. Names go on the left, values on the right, separated by commas:

    a, b = 1, 2

This also lets you swap two variables in one line:

    a, b = b, a`,
r`Assign ~x~ and ~y~ in one line (x = 5, y = 9), then swap them in one line, then print ~x~ and ~y~.`,
r`# assign and swap here

print(x)
print(y)
`,
r`x, y = 5, 9
x, y = y, x
print(x)
print(y)
`,
r`9
5`);

L("Variables", "Variable Types",
r`Every value has a *type*: ~int~ (whole number), ~float~ (decimal), ~bool~ (~True~/~False~), ~str~ (text) and ~list~ (a sequence). Use the built-in ~type()~ to check:

    print(type(25))      # <class 'int'>
    print(type(3.5))     # <class 'float'>`,
r`Create variables so the program prints the five types in the order shown by the expected output. Fill in the five values.`,
r`a =
b =
c =
d =
e =
print(type(a))
print(type(b))
print(type(c))
print(type(d))
print(type(e))
`,
r`a = 7
b = 2.5
c = True
d = "text"
e = [1, 2, 3]
print(type(a))
print(type(b))
print(type(c))
print(type(d))
print(type(e))
`,
r`<class 'int'>
<class 'float'>
<class 'bool'>
<class 'str'>
<class 'list'>`);

L("Variables", "Dynamic Typing",
r`Python is *dynamically typed*: the type belongs to the value, not the variable, so one variable can hold different types over time. (Java or C++ would refuse this.)

    v = 10         # int
    v = "ten"      # now a str`,
r`Using a single variable ~item~, make the program print the types: int, str, list, float (in that order). Add assignments before each print.`,
r`item = 10
print(type(item))
print(type(item))
print(type(item))
print(type(item))
`,
r`item = 10
print(type(item))
item = "ten"
print(type(item))
item = [10]
print(type(item))
item = 10.0
print(type(item))
`,
r`<class 'int'>
<class 'str'>
<class 'list'>
<class 'float'>`);

L("Variables", "Type Casting",
r`You can convert between types with ~int()~, ~float()~, ~str()~. Converting a float to an int drops everything after the point.

    print(int(10.9))   # 10
    print(str(5) + "!")  # 5!`,
r`Use type casting so the program prints ~3~ and then ~2~. Do not change the lines that start with ~print~.`,
r`pi = 3.14159
root_of_8 = 2.828
# convert here

print(pi)
print(root_of_8)
`,
r`pi = 3.14159
root_of_8 = 2.828
pi = int(pi)
root_of_8 = int(root_of_8)
print(pi)
print(root_of_8)
`,
r`3
2`);

L("Variables", "Type Errors",
r`Not every conversion works, and mixing types can fail too. You can't add a string and a number:

    "25" + 5    # TypeError

Convert first, then do the math:

    int("25") + 5   # 30`,
r`~age~ is text, so ~age + 5~ crashes. Fix the last line so it prints ~30~.`,
r`age = "25"
print(age + 5)
`,
r`age = "25"
print(int(age) + 5)
`,
r`30`);

L("Variables", "Empty Variable",
r`Python has a special value for "no value": ~None~. (Many languages call it ~null~.) It is not 0 and not an empty string; it means *nothing is here*.

    result = None
    print(result)   # None`,
r`~winner~ has not been decided yet. Declare it so it holds no value and print it. Expected output: ~None~`,
r`# declare winner here

print(winner)
`,
r`winner = None
print(winner)
`,
r`None`);

L("Operators", "Arithmetic Operators",
r`Python does maths with ~+~, ~-~, ~*~ and ~/~. Division always gives a float, even when it divides evenly.

    print(7 + 2)    # 9
    print(7 * 2)    # 14
    print(8 / 2)    # 4.0`,
r`Fill in the expressions using the variables so the output is the sum, difference, product and quotient of ~a~ and ~b~.`,
r`a = 12
b = 4
print()
print()
print()
print()
`,
r`a = 12
b = 4
print(a + b)
print(a - b)
print(a * b)
print(a / b)
`,
r`16
8
48
3.0`);

L("Operators", "More Operators",
r`Three more operators:

- ~//~ floor division: divide, then round **down** to an int (~7 // 2~ is ~3~)
- ~%~ modulus: the remainder (~7 % 2~ is ~1~)
- ~**~ exponent: power (~2 ** 3~ is ~8~)`,
r`With ~n = 17~, print ~n // 5~, then ~n % 5~, then ~2 ** 10~ (each on its own line).`,
r`n = 17
print()
print()
print()
`,
r`n = 17
print(n // 5)
print(n % 5)
print(2 ** 10)
`,
r`3
2
1024`);

L("Operators", "Shorthand Operators",
r`Updating a variable using its own value is so common that Python has shortcuts:

    count += 1     # count = count + 1
    count -= 2     # count = count - 2
    count *= 3
    count /= 4`,
r`Starting from ~score = 10~, use only shorthand operators to: add 5, multiply by 2, subtract 6. Then print the result.`,
r`score = 10
# update score here

print(score)
`,
r`score = 10
score += 5
score *= 2
score -= 6
print(score)
`,
r`24`);

L("Booleans", "Boolean OR",
r`A *boolean* is ~True~ or ~False~. The ~or~ operator is true when **at least one** side is true.

    True or False    # True
    False or False   # False`,
r`Implement ~can_enter(has_ticket, is_vip)~ so it returns True if the person has a ticket or is a VIP.`,
r`def can_enter(has_ticket, is_vip):
    pass

# Do not modify below this line
print(can_enter(True, False))
print(can_enter(False, True))
print(can_enter(False, False))
print(can_enter(True, True))
`,
r`def can_enter(has_ticket, is_vip):
    return has_ticket or is_vip

print(can_enter(True, False))
print(can_enter(False, True))
print(can_enter(False, False))
print(can_enter(True, True))
`,
r`True
True
False
True`);

L("Booleans", "Boolean AND",
r`~and~ is true only when **both** sides are true. With three or more operands, all of them must be true.

    True and True    # True
    True and False   # False`,
r`Implement ~can_drive(has_license, has_car)~ so it returns True only if both are true.`,
r`def can_drive(has_license, has_car):
    pass

# Do not modify below this line
print(can_drive(True, True))
print(can_drive(True, False))
print(can_drive(False, True))
print(can_drive(False, False))
`,
r`def can_drive(has_license, has_car):
    return has_license and has_car

print(can_drive(True, True))
print(can_drive(True, False))
print(can_drive(False, True))
print(can_drive(False, False))
`,
r`True
False
False
False`);

L("Booleans", "Boolean Negation",
r`~not~ flips a boolean. You can combine ~and~, ~or~ and ~not~, and use parentheses to control order.

    not True              # False
    not (True and False)  # True`,
r`Implement ~is_weekend_off(is_weekend, is_on_call)~: it should be True when it is the weekend and the person is **not** on call.`,
r`def is_weekend_off(is_weekend, is_on_call):
    pass

# Do not modify below this line
print(is_weekend_off(True, False))
print(is_weekend_off(True, True))
print(is_weekend_off(False, False))
print(is_weekend_off(False, True))
`,
r`def is_weekend_off(is_weekend, is_on_call):
    return is_weekend and not is_on_call

print(is_weekend_off(True, False))
print(is_weekend_off(True, True))
print(is_weekend_off(False, False))
print(is_weekend_off(False, True))
`,
r`True
False
False
False`);
