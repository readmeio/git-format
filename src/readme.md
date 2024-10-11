# Custom CSS, JS, and HTML

Any `*.js` and `*.css` files in this folder are included on every page in the docs—in alphabetical order. 

`head.html` is included in the `<head />` tag of every page, and `footer.html` is included before the closing `</body>` tag on every page.

# JSX

In lieu of `head.html` or `footer.html`, you can use `head.jsx` or `footer.jsx`. These are mutually exclusive, you cannot have both `head.html` and `head.jsx`.

# Folders

Files in folders are not automatically compiled into your docs, but can be referenced. For example:

Directory:
```
📁 styles
📁 components
head.jsx
index.css
```

index.css
```
@import './styles/global.css'

.App {
...
}
```

head.jsx
```
@import Button from './components/Button'

...
```
