# CS-554 Lab 05

## React Pokedex

For this lab, you will create a very simple Pokedex Single Page Application using React.

You will be creating a Single Page Application using React that implements the following routes using [create-react-app](https://github.com/facebookincubator/create-react-app) and [react router 4](https://reacttraining.com/react-router/web/guides/quick-start).

You will be using the [Pokeapi](https://pokeapi.co/docs/v2.html). You will use the Pokemon, Berries, and Machine listings, as well as the [Resource Lists](https://pokeapi.co/docsv2/#resource-lists).

## Pages

### /

The root directory of your application will be a simple page explaining the purpose of your site (to talk about Pokemon, Berries, and MachineContainer). You should also explain what each of these things are, as if this was a little tutorial in Pokemon. Think of this app as your first steps through Palette Town.

This page will have a `<Link>` to the Pokemon Listing (`/pokemon/page/0`), The Berry Listing (`/berries/page/0`), and the Machine Listing (`/machines/page/0`)

### /pokemon/page/:page

This route will render a paginated list of Pokemon. It will use the :page param to determine what page to request from the API. If you are on page 0, you will show a button to go to the _next_ page. If you are on page 1+, you will show a _next_ button and a _previous_ button, that will take you to the previous page. **If the Page does not contain any more Pokemon in the list, the SPA will redirect to a 404 page.**

### /pokemon/:id

This route will show details about a single Pokemon. **If the Pokemon does not exist, the SPA will redirect to a 404 page.**

### /berries/page/:page

This route will render a paginated list of berries. It will use the :page param to determine what page to request from the API. **If the Page does not contain any more berries in the list, the SPA will redirect to a 404 page.**

### /berries/:id

This route will show details about a single berry. **If the berry does not exist, the SPA will redirect to a 404 page.**

### /machines/page/:page

This route will render a paginated list of machines. It will use the :page param to determine what page to request from the API. You will also show some sort of pagination UI (see below). **If the Page does not contain any more machines in the list, the SPA will redirect to a 404 page.**

### /machines/:id

This route will show details about a single machine. **If the machine does not exist, the SPA will redirect to a 404 page**.

**Hint**: you can use the `ContactContainer` to store a value on the state such as `ShowingDetails`, and in the `render` method of the `ContactContainer` you can check the state to show if you want to render a `ContactOverview` or a `ContactDetails`.

## Pagination

Pagination can be done using an external library from NPM, such as [react-bootstrap's pagination](https://react-bootstrap.github.io/components/pagination/) or [react-paginate](https://github.com/AdeleD/react-paginate).

The minimum you must provide for a pagination UI:

* **If you are on page 0, you will show a button to go to the _next_ page.**
* **If you are on page 1+, you will show a _next_ button and a _previous_ button, that will take you to the previous page.**

## HTML, Look, and Content

Besides the specified settings, as long as your HTML is valid and your page runs passes a [tota11y](http://khan.github.io/tota11y/) test, the general look and feel is up to you. If you want to update it, you may; if you do not, that is fine.

I do, however, recommend using [React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) to make your life easier if you need any UI elements.

## General Requirements

1. Remember to submit your `package.json` file but **not** your `node_modules` folder.
2. Remember to run HTML Validator and tota11y tests!
3. Remember to have fun with the content.
4. Remember to practice usage of async / await!

## Steps to Run


### Run

`npm start`
