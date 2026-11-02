# Python for Beginners

An interactive Python course you work through in the browser: **102 short lessons**, each with an explanation and a challenge that your code must pass. Python runs locally in the page via [Pyodide](https://pyodide.org), so there's no server and no sign-up.

Live at **https://raghavdaksh.com/python**.

- Lessons 1–82 cover the core language: printing, variables, operators, functions, conditionals, loops, strings, lists, tuples, sets, dictionaries, input and exceptions.
- Lessons 83–102 (*Interview Essentials*) cover the Python you need for coding interviews: integer division and modulo pitfalls, sorting with `key=`, comprehensions, 2D lists, `deque`, `heapq`, nested functions with `nonlocal`, and classes.

The order of topics follows NeetCode's free YouTube courses *Python for Beginners* and *Python for Coding Interviews*. All lesson text and exercises here are original.

## Keyboard

| Key | Action |
|---|---|
| <kbd>Ctrl</kbd>/<kbd>⌘</kbd> <kbd>Enter</kbd> | Submit, then leave the editor so <kbd>]</kbd> goes to the next lesson |
| <kbd>Ctrl</kbd>/<kbd>⌘</kbd> <kbd>'</kbd> or <kbd>`</kbd> | Run, then leave the editor |
| <kbd>Esc</kbd> | Leave the editor / close a panel |
| <kbd>?</kbd> | All shortcuts |
| <kbd>/</kbd> or <kbd>g</kbd> <kbd>c</kbd> | Contents and search |
| <kbd>]</kbd> / <kbd>[</kbd> | Next / previous lesson |
| <kbd>g</kbd> <kbd>n</kbd> | Next unfinished lesson |
| <kbd>j</kbd> / <kbd>k</kbd>, <kbd>g</kbd> <kbd>g</kbd> / <kbd>G</kbd> | Scroll the lesson |
| <kbd>s</kbd> | Show or hide the solution |
| <kbd>e</kbd> | Focus the editor |
| <kbd>t</kbd> | Cycle theme |
| <kbd>,</kbd> | Settings |

Single-key shortcuts only fire when the editor isn't focused, and you can switch them off in Settings ([WCAG 2.1.4](https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html)). No browser shortcuts are overridden.

**Vim mode** (Settings → Vim keybindings) uses [`@replit/codemirror-vim`](https://github.com/replit/codemirror-vim) and adds Ex commands: `:w` run, `:wq`/`:x` submit, `:e` reset, `:n`/`:N` next/previous lesson, `:sol` solution, `:toc` contents, `:h` help, `:set novim`.

## Development

```sh
npm ci
npm run dev      # build and serve on http://localhost:8000/python/
npm run build    # production build into dist/python/
npm run verify   # run every reference solution with local python3
```

The stack is deliberately small: vanilla ES modules, [CodeMirror 6](https://codemirror.net), and esbuild. There's no framework. Vim mode is a separate chunk that only loads when you turn it on. Fonts are self-hosted: Source Serif 4 and IBM Plex Mono, both under the SIL Open Font License.

Lessons live in `data/part1.js`–`part4.js`. Each lesson has a body, a task, starter code, a reference solution and the expected output (plus optional stdin). Submissions pass when their output matches the expected output, ignoring trailing whitespace.

The site is served under `/python/` and deployed on Vercel. raghavdaksh.com proxies `/python` to it.

## License

MIT
