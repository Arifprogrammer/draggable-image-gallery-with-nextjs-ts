## Description

Easily organize, select, and highlight your images in this user-friendly gallery. Drag and drop to rearrange, select multiple images, and set a featured picture with simplicity and speed. Ideal for photographers, artists, and content creators looking for a hassle-free way to manage their visual content.

## Technologies used:

- `HTML`,
- `CSS`,
- `TailwindCSS`,
- `JavaScript`,
- `React.js`,
- `Next.js`,
- `Typescript`,

## Project

- [@Live-link](https://draggable-image-gallery-with-nextjs-ts.vercel.app/)

## Faced Problems & Solutions:

Problem 1: If we want to make an element draggable then we have to use on that element {...listeners}(import from "@dnd-kit/sortable")
Now the problem is if we add any event[exept(mouse event)] on the children element of that draggable parent then the
event handler won't work for {...listeners}. {...listeners} will block it.

Solution - 1: To work the events on children of draggable parent we have to use the children outside of the draggable
parent and use css positioning for position the children over the draggable parent.
**NOTE**: In this approach the children won't be draggable with draggable parent.

Solution - 2: Using mouseEnter & mouseLeave event on the children to deactivate the {...listeners} by applying conditions.
**NOTE**: In this approach the children will be draggable with draggable parent but draggable feature won't work on mouseEnter of
that children.

_Other Solutions_ -

- [Link -1](https://github.com/clauderic/dnd-kit/issues/477)
- [Link -2](https://github.com/clauderic/dnd-kit/issues/913)
- [Link -3](https://github.com/clauderic/dnd-kit/issues/1085)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Author

- [@Arifprogrammer](https://github.com/Arifprogrammer)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/Arifprogrammer?tab=repositories/)
