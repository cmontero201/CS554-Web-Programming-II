# CS-554 Lab 02

## Compiling SASS and Bootstrap

### Required Reading:

For this lab, you will read the following sections of Bootstrap's documentation page to learn how to use its HTML classes to achieve the lab's objectives.

* [The Grid System](https://getbootstrap.com/docs/4.0/layout/grid/)
* [Card Components](https://getbootstrap.com/docs/4.0/components/card/)
* [Modals](https://getbootstrap.com/docs/4.0/components/modal/)

### Objective

For this lab, you will submit a semantically valid HTML document that is styled accordingly.

You will download the source of [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/download/) and use the SASS files to customize the codebase. At the very least, you should update your variables to give it your own look and feel in terms of colors and fonts. You will then create the necessary Gulp setup to create an optimized bundle from the SASS source.

Using your custom version of bootstrap, you will make a home page demonstrating understanding of the bootstrap grid system, as well as a fake portfolio.

For this portfolio, you will showcase a list of 10 theoretical products that you created, complete with fake images and details. These products will be displayed in the form of a [card component](https://getbootstrap.com/docs/4.0/components/card/).

You will create a side navigation that has anchor tags to each of your fake products (ie, `#the-worlds-best-spaghetti-maker` to scroll to a fake listing of how you created the world's greatest spaghetti maker). On the smallest screen size, your navigation will sit above your product grid.

On the right of the navigation you will make a fake listing of all your products in a grid. On small screen sizes, you will show 1 item per row. On medium size screens you will show 2 items per row. On large screen sizes, you will show 3 items per row. In the grid, you will only list a brief description of each item and provide a link to hit to open a [modal](https://getbootstrap.com/docs/4.0/components/modal/) describing details about that product.

When you open a modal for the product, you should describe your product in more detail, with a longer description and any other details you may find relevant about it such as awards your fake product will have totally won.

## HTML, Look, and Content

Besides the specified settings, as long as your HTML is valid and your page runs passes a [tota11y](http://khan.github.io/tota11y/) test, the general look and feel is up to you.

While you do not have to be creative, I encourage you to be as _preposterous_ as humanly possible.

Have fun!

## The Server

You will load an express server that will allow static assets to be loaded from a directory called `/public`

You will have a single route, `/`, that will load your description page.

All other routes will load a 404 page.

## Extra Credit

It was not discussed in the lecture as to what package would be involved or how to set up the task, so you'll need to research it on your own but if you add a gulp task that optimizes the images you use in lab 2, it will be worth 5 extra points on your lab 2 grade making the total possible score 105%
<br>

## Notes

1. Remember to submit your `package.json` file but **not** your `node_modules` folder.
2. Remember to run HTML Validator and tota11y tests!
3. Remember to have fun with the content.

## Steps to Run

### Install Dependencies

`npm install`

### Build SASS and Vendor Bundles

`gulp`

### Run

`npm start`
