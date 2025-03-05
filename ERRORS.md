# Task Manager - List of Errors

This document contains a list of all the intentional errors in the Task Manager application for your review after you complete the debugging exercise.

## HTML Errors (index.html)

1. Missing closing `</head>` tag after the script element
2. Unclosed `<h1>` tags in the header and form section
3. Unclosed `<select>` tag in the priority selection dropdown
4. Missing closing quote in `id="filter-low` class="filter-btn"` button
5. Incorrect closing tag `</span>` instead of `</button>` for the "All" filter
6. Duplicate ID for `notification-container` - appears twice in nested divs
7. Missing closing `</body>` tag

## CSS Errors (style.css)

1. Typo in `box-sizing: boder-box;` - should be `border-box`
2. Missing semicolons after several properties:
   - `background-color: #f4f4f4`
   - `padding: 20px`
   - `color: #3498db`
3. Incorrect selector `.submit-btn` instead of `#submit-btn` (doesn't match HTML)
4. Missing colon in `.success { background-color #2ecc71; }`

## JavaScript Errors (scripts.js)

1. Wrong ID in `const tasksContainer = document.getElementById('task');` - should be 'tasks'
2. Typo in function name: `filterTask('low')` - should be `filterTasks('low')`
3. Incorrect localStorage save: `localStorage.setItem('tasks', JSON.stringify(task));` - should be storing the `tasks` array, not the individual `task`
4. Assignment instead of comparison in the `completeTask` function: `if (task.id = id)` - should be `if (task.id === id)`
5. `filterAll` isn't properly handled with the active class like other filter buttons
6. Missing 'active-filter' class handling for the "All" filter button

## Logical Errors

1. When adding a new task, it should append to the existing list but might replace all tasks due to localStorage error
2. Filter functionality doesn't correctly reset when "All" is selected
3. Task completion state doesn't persist properly after page refresh

## Debugging Approach

When debugging, consider:
1. Using browser developer tools to inspect elements and check console errors
2. Testing each feature of the application systematically
3. Verifying that localStorage is working correctly
4. Making sure all event listeners are attached to the right elements
5. Checking that CSS selectors match your HTML elements
6. Validating HTML structure and proper tag nesting
