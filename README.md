# Shopify Helpers
## Ajax shopify api maked simple
###### v. 0.0.1 Beta (up to date: 04/09/2023)

Shopify Helpers is a free-to-use library that assists in frontend development, saving time, space, and potentially enhancing scalability for Shopify frontend stores.

The bundle includes functionality for working with the Ajax API, covering:
- Cart
- Product
- Product recommendations
- Predictive search
- Section rendering API

## Features
- Cart Management: Provides tools to efficiently manage shopping carts for Shopify stores.
- Product Handling: Offers features for handling product quantities and properties.
- Product Recommendations: Includes functionality to provide product recommendations.
- Predictive Search: Facilitates predictive search capabilities, improving search functionality for users.
- Section Rendering API: Provides tools for get website sections with updated data.

## Getting started
This library works in conjunction with the [Shopify AJAX API](https://shopify.dev/docs/api/ajax). Please refer to the official documentation if needed.

### 1. Add the script to your store

Choose one of the following methods:

**Method A: Use CDN (recommended)**
```html
<script defer src="https://cdn.jsdelivr.net/gh/Giot08/Shopify-Helpers@main/releases/sh_1.0.0.js"></script>
```
Or copy the code from the latest release in the [repository's releases section](https://github.com/Giot08/Shopify-Helpers/tree/main/releases).

**Method B: Upload the file manually**
1. Create a new file in your store's `/theme/assets` folder.
2. Add the file to your `theme.liquid` with a `<script defer>` element:
   ```liquid
   <script src="{{ 'shopify-helpers.js' | asset_url }}" defer="defer"></script>
   ```

### 2. Initialize the library

After adding the script using any of the previous methods, initialize the library in your code:

```javascript
addEventListener("DOMContentLoaded", (event) => {
    //my-store-name.myshopify.com
    const sh = new ShopifyHelpers("my-store-name");
});
```
This ensures that your code runs only after the HTML document has fully loaded.

## Methods

### Product Methods

- `addToCart`: This method simplifies the process of adding products to the cart and supports up to four arguments: `id`, `quantity`, `properties`, and `callback`. The `id` is required, while the other arguments are optional and may be used in specific situations. Examples:

    ```javascript
    // Example 1: Adding 3 items with properties and a callback
    sh.addToCart(46167254794513, 3, { gift_paper: "with gift paper", write_letter: "With love Jhon Doe" }, (response) => {
        console.log("response", response);
    });

    // Example 2: Adding 3 items with a callback
    sh.addToCart(46167254794513, 3, null, (response) => {
        console.log("response", response);
    });

    // Example 3: Adding 3 items
    sh.addToCart(46167254794513, 3);

    // Example 4: Adding 1 item
    sh.addToCart(46167254794513);

- substractFromCart is made to decrease an specific quantity. carefully with this, for now work with the first line item founded with same ID.
- `substractFromCart`: This method is designed to decrease the quantity of a specific product in the cart. Please note that it currently works with the first line item found with the same ID. Examples:

    ```javascript
    // Example 1: Decreasing the quantity by 4 with a callback
    sh.substractFromCart(46167254794513, 4, (response) => {
        console.log("response", response);
    });

    // Example 2: Decreasing the quantity by 1
    sh.substractFromCart(46167254794513);
    ```

- `removeFromCart`: This method clears the first line item with the provided ID. Example:

    ```javascript
    // Example: Removing the product from the cart with a callback
    sh.removeFromCart(46167254794513, (response) => {
        console.log("response", response);
    });
    ```

- `addBundle`: Use this method to add a bundle of products to the cart. The callback is only for the second argument and cannot be passed to each product individually. Example:
    
    ```javascript
    // Example: Adding a bundle of products
    const bundle = [
        {
            id: 46167254794513,
            quantity: 1,
            properties: { gift_wrap: "Gift wrap" },
        },
        {
            id: 46167253713169,
            quantity: 3,
        },
        {
            id: 46167240507665,
            quantity: 2,
            properties: {
                shirt_name: "Typescript is awesome",
                hex_color: "#f3f3f3",
                font: "Arial",
            },
        },
    ];
    sh.addBundle(bundle, (bundle) => {
        console.log("bundle", bundle);
    });
    ```

- `getProduct`: This method retrieves the full JSON data of a product based on its handle. Example:

    ```javascript
    // Example: Getting product details by handle
    sh.getProduct("product-handle", (product) => {
        console.log("product", product);
    });
    ```

### Cart Methods

- `getCart`: Retrieve cart data. Example:

    ```javascript
    // Example: Getting cart data
    sh.getCart((cart) => {
        console.log("cart", cart);
    });
    ```
    
- `addCartAttributes`: Add attributes to the cart. Example:

    ```javascript
    // Example: Adding cart attributes
    const attrs = {
        att1: "Leave in front door",
        att2: "Simple ticket",
    };
    sh.addCartAttributes(attrs, (response) => {
        console.log("response", response);
    });
    ```

- `addCartNote`: Add a note to the cart. Example:

    ```javascript
    // Example: Adding a cart note
    sh.addCartNote("Call me before delivery!", (response) => {
        console.log("response", response);
    });
    ```

- `cleanCartAttributes`: Remove all cart attributes. Example:

    ```javascript
    // Example: Removing all cart attributes
    sh.cleanCartAttributes((response) => {
        console.log("response", response);
    });
    ```

- `cleanCartNote`: Remove the cart note. Example:

    ```javascript
    // Example: Removing the cart note
    sh.cleanCartNote((response) => {
        console.log("response", response);
    });
    ```

- `emptyCart`: Empty the cart, leaving it without any products. Example:

    ```javascript
    // Example: Emptying the cart
    sh.emptyCart((res) => {
        console.log("res", res);
    });
    ```

### Recommendation Methods

- `getRecommendations`: Get product recommendations based on product ID, recommendation limit, and type (related/complementary). Example:

    ```javascript
    // Example: Getting product recommendations
    sh.getRecommendations(1234567890123, 4, "related", (response) => {
        console.log("response", response);
    });
    ```

- `getRecommendationsWithSection`: Get product recommendations with a specified section. Example:

    ```javascript
    // Example: Getting product recommendations with a section
    sh.getRecommendationsWithSection(1234567890123, 4, "product-recommendations", "related", (response) => {
        console.log("response", response);
    });
    ```

### Section Methods

- `getSection`: Retrieve the updated HTML from the requested section. Example:

    ```javascript
    // Example: Getting updated section HTML
    sh.getSection("cart-drawer", (section) => {
        console.log("section", section);
    });
    ```

### Search Methods

- `searchProduct`: Get an array of products similar to the query. Example:

    ```javascript
    // Example: Searching for products
    const options = {
        limit: 7,
        options_unavailable_products: "show",
        options_fields: "code",
        section: "predictive-search",
    };

    sh.searchProduct("White T-shirt", options, (products) => {
        console.log(products);
    });
    ```

- `searchPage`: Retrieve the page based on the query. Example:

    ```javascript
    // Example: Searching for a page
    sh.searchPage("contact", options, (page) => {
        console.log(page);
    });
    ```

- `searchArticle`: Get an array of articles based on the query. Example:

    ```javascript
    // Example: Searching for articles
    sh.searchArticle("news", options, (articles) => {
        console.log(articles);
    });
    ```

- `searchCollection`: Retrieve the collection based on the query. Example:

    ```javascript
    // Example: Searching for a collection
    sh.searchCollection("Summer Sale", options, (collection) => {
        console.log(collection);
    });
    ```