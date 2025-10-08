# Book-Store-Application

## Table of Contents

- [ Description](#-description)
- [ Features ](#-features)
- [ Technologies Used](#-technologies-used)
- [ Installation](#-installation)
- [ Contribution](#-contribution)
- [ Contact](#-contact)
- [ License](#-license)

---

## Description

- A UI react application of **Book store** built using **TypeScript**, enabling users to find the books in the card format. 
---

## Features
**Book Listing:**

- Created dummy API and fetched data.
- Displayed the list of books with the details:
   - Cover page
   - Title
   - Author
   - Price 
- Implemented Add to Cart button to every card.
- Turned the button text to `Remove from cart` on adding it to cart.
- Implemented `Removed from Cart`  button used to remove item from cart.
- Allowed user to  Search  books by title of the book or author.

**Cart Functionality:**
- Displayed cart items in a sidebar with a cart icon
- Implemented that cart icon holds a number that indicates the  number of items in the cart.
- For each item in the cart:
     - Displayed cover page, title, author, price, quantity.
     - Allowed user to increase or decrease quantity.
     - Allowed user to remove the item from the cart.
- Order summary:
     - Subtotal and Total (including shipping charges).

**User Login:**
- The user is prompted to enter their login details(used
static data for user details).
- Upon successful login, the user is navigated to the Books Store and Cart.

**User Signup:**
- If the user is new, clicking the  Register  button it navigate them to the Register Page.
- After successful registration, the user is redirected back to the Login Page.
- Upon successful login, the user is navigated to the Books Store and Cart.

**Wishlist:**
- Each Book card contains a wish-list button/icon on it.
- On clicking wish-list icon, the book will be added to the wish-list.
- A Wishlist icon is placed beside the Cart icon.
- On clicking the wish-list icon, the user is navigated to the Wishlist Page.
- All the Wish-listed items will be displayed when user navigates.
- User details(name, email, etc) also be displayed in wish-list page.

**Book-Details:**

- Implemented the book description page with details:
   - Book image
   - Title
   - Author
   - Price
   - Description
   - Add to card button
   - Wishlist button
- If the user click on the add to cart button the item will be adds to the cart.
- If the user click on the wishlist button the item will be adds to the wishlist.

**Testing:**

- Implemented testing to the react application.

--- 

## Technologies Used

- **TypeScript** 
- **Reactjs** 
- **CSS**

---

## Technologies Stack
- **TypeScript**
    - TypeScript download and installation guide 
       - visit : https://www.typescriptlang.org/download/
- **Reactjs**
    - visit : https://react.dev/
- **Nodejs**
    - Visit : https://nodejs.org/en

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Umamaheswari-gude/book-store-application.git
cd book-store-application
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the application 
```bash
npm start
```
- The app will be available at `http://localhost:3008`
---

## Contribution

We welcome contributions from the community!

### Steps to Contribute:

1. Fork the repository
2. Create a feature branch
```bash

git checkout -b feat/<your-feature>
```

3. Write your code and tests
4. Commit changes with clear messages
```bash
git add .
git commit -m "Add your-feature"
```

5. Push to your branch
```bash
git push origin feat/<your-feature>
```

6. Create a Pull Request~

---

## Contact

- *Author:* Umamaheswari gude
- *GitHub:* [github.com/Umamaheswari-gude](https://github.com/Umamaheswari-gude)  
- ⁠*Email:* umamaheswari.g@everest.engineering

---

## License

This project is licensed under the *MIT License*.  
See the [LICENSE](LICENSE) file for details.








