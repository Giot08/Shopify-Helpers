"use strict";
  // app/modules/cartControl.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var getCart = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield fetch("/cart.js");
      const data = yield response.json();
      if (callback)
        callback(data);
    } catch (error) {
      console.error(error);
    }
  });
  var addCartAttributes = (attributes, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield fetch("/cart/update.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ attributes })
      });
      const data = yield response.json();
      if (callback)
        callback(data);
    } catch (error) {
      console.error(error);
    }
  });
  var addCartNote = (note, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield fetch("/cart/update.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ note })
      });
      const data = yield response.json();
      if (callback)
        callback(data);
    } catch (error) {
      console.error(error);
    }
  });
  var cleanCartAttributes = (callback) => {
    getCart((res) => {
      const resetAttributes = res.attributes;
      for (let i in resetAttributes) {
        resetAttributes[i] = "";
      }
      addCartAttributes(resetAttributes, callback);
    });
  };
  var cleanCartNote = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield fetch("/cart/update.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ note: "" })
      });
      const data = yield response.json();
      if (callback)
        callback(data);
    } catch (error) {
      console.error(error);
    }
  });
  var emptyCart = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield fetch("/cart/clear.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = yield response.json();
      if (callback)
        callback(data);
    } catch (error) {
      console.error(error);
    }
  });

  // app/modules/productControls.js
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var headers = {
    "Content-Type": "application/json"
  };
  var addToCart = (id, quantity, properties, callback) => __awaiter2(void 0, void 0, void 0, function* () {
    const props = properties != void 0 ? properties : null;
    try {
      const response = yield fetch("/cart/add.js", {
        method: "POST",
        headers,
        body: JSON.stringify({ id, quantity, properties: props })
      });
      const data = yield response.json();
      if (callback)
        callback(data);
    } catch (error) {
      console.error(error);
    }
  });
  var substractFromCart = (id, quantity, callback) => {
    try {
      getCart((cart) => __awaiter2(void 0, void 0, void 0, function* () {
        const { items } = cart;
        if (items.length === 0)
          return console.warn("Cart is empty");
        const product = items.find((item) => item.id === id);
        if (!product)
          return console.warn("The product is not in cart.");
        let newQuantity;
        if (quantity === void 0) {
          newQuantity = product.quantity - 1;
        } else {
          newQuantity = product.quantity - quantity;
        }
        if (newQuantity < 0)
          newQuantity = 0;
        const productId = product.id;
        const updates = {};
        updates[productId] = newQuantity;
        const response = yield fetch("/cart/update.js", {
          method: "POST",
          headers,
          body: JSON.stringify({ updates })
        });
        const data = yield response.json();
        if (callback)
          callback(data);
      }));
    } catch (error) {
      console.error(error);
    }
  };
  var removeFromCart = (id, callback) => {
    try {
      getCart((cart) => __awaiter2(void 0, void 0, void 0, function* () {
        const { items } = cart;
        if (items.length === 0)
          return console.warn("Cart is empty");
        const product = items.find((item) => item.id === id);
        if (!product)
          return console.warn("The product is not in cart.");
        const productId = product.id;
        const updates = {};
        updates[productId] = 0;
        const response = yield fetch("/cart/update.js", {
          method: "POST",
          headers,
          body: JSON.stringify({ updates })
        });
        const data = yield response.json();
        if (callback)
          callback(data);
      }));
    } catch (error) {
      console.error(error);
    }
  };
  var addBundle = (products, callback) => {
    try {
      let responses = [];
      products.forEach((product) => {
        addToCart(product.id, product.quantity, product.properties, (data) => {
          responses.push(data);
        });
      });
      if (callback)
        callback(responses);
    } catch (error) {
      console.error(error);
    }
  };
  var getProduct = (handle, callback) => __awaiter2(void 0, void 0, void 0, function* () {
    try {
      const response = yield fetch(`/products/${handle}/.js`);
      const data = yield response.json();
      if (callback)
        callback(data);
    } catch (error) {
      console.error(error);
    }
  });

  // app/modules/recommendationsControls.js
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var getRecommendations = (id, limit, intent, callback) => __awaiter3(void 0, void 0, void 0, function* () {
    const productId = id;
    const productslimit = limit != null ? limit : 10;
    const intentType = intent != null ? intent : "related";
    try {
      const response = yield fetch(`/recommendations/products.json?product_id=${productId}&limit=${productslimit}&intent=${intentType}`);
      const data = yield response.json();
      callback(data);
    } catch (error) {
      console.error(error);
    }
  });
  var getRecommendationsWithSection = (id, limit, section, intent, callback) => __awaiter3(void 0, void 0, void 0, function* () {
    const productId = id;
    const productslimit = limit != null ? limit : 10;
    const sectionId = section;
    const intentType = intent != null ? intent : "related";
    try {
      const response = yield fetch(`/recommendations/products.json?product_id=${productId}&limit=${productslimit}&section_id=${sectionId}&intent=${intentType}`);
      const data = yield response.json();
      callback(data);
    } catch (error) {
      console.error(error);
    }
  });

  // app/modules/sectionsControl.js
  var __awaiter4 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var getSection = (sectionNamme, callback) => __awaiter4(void 0, void 0, void 0, function* () {
    try {
      const response = yield fetch(`/?sections=${sectionNamme}`);
      const data = yield response.json();
      const parser = new DOMParser();
      const page = parser.parseFromString(data[sectionNamme], "text/html");
      const htmlSection = page.querySelector(`#shopify-section-${sectionNamme}`);
      callback(htmlSection);
    } catch (error) {
      console.error(error);
    }
  });

  // app/modules/searchControls.js
  var __awaiter5 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ProductSearchConfig = class {
    constructor(limit, options_unavailable_products, options_fields, section) {
      this.productSearchMethod = (method) => {
        if (method === "all")
          return this.options_fields = "tag,variants.barcode,variants.sku,product_type,title,variants.title,vendor";
        if (method === "code")
          return this.options_fields = "tag,variants.barcode,variants.sku";
        if (method === "title")
          return this.options_fields = "product_type,tag,title,variants.title";
        if (method === "vendor")
          return this.options_fields = "vendor";
        return this.options_fields = "product_type,tag,title,variants.title";
      };
      this.limit = limit || 10;
      this.options_unavailable_products = options_unavailable_products || "hide";
      this.options_fields = options_fields || "title";
      this.section = section || null;
    }
  };
  var searchProduct = (store, query, options, callback) => __awaiter5(void 0, void 0, void 0, function* () {
    const { limit, options_unavailable_products, options_fields, section } = options;
    const config = new ProductSearchConfig(limit, options_unavailable_products, options_fields, section);
    config.productSearchMethod(options_fields);
    let url = `${store}/search/suggest.json?q=${query}&resources[type]=product&resources[options][unavailable_products]=${config.options_unavailable_products}&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}`;
    if (config.section != null && typeof config.section === "string") {
      url = `${store}/search/suggest?q=${query}&resources[type]=product&resources[options][unavailable_products]=${config.options_unavailable_products}&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}&section_id=${config.section}`;
    }
    try {
      const response = yield fetch(url);
      if (config.section === null) {
        const data = yield response.json();
        callback(data);
      } else {
        const data = yield response.text();
        const parser = new DOMParser().parseFromString(data, "text/html");
        const html = parser.querySelector(`#shopify-section-${config.section}`);
        callback(html);
      }
    } catch (error) {
      console.error(error);
    }
  });
  var PageSearchConfig = class {
    constructor(limit, section) {
      this.limit = limit || 10;
      this.options_fields = "body,title";
      this.section = section || null;
    }
  };
  var searchPage = (store, query, options, callback) => __awaiter5(void 0, void 0, void 0, function* () {
    const { limit, section } = options;
    const config = new PageSearchConfig(limit, section);
    let url = `${store}/search/suggest.json?q=${query}&resources[type]=page&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}`;
    if (config.section != null && typeof config.section === "string") {
      url = `${store}/search/suggest.json?q=${query}&resources[type]=page&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}&section_id=${config.section}`;
    }
    try {
      const response = yield fetch(url);
      if (config.section === null) {
        const data = yield response.json();
        callback(data.resources.results);
      } else {
        const data = yield response.text();
        const parser = new DOMParser().parseFromString(data, "text/html");
        const html = parser.querySelector(`#shopify-section-${config.section}`);
        callback(html);
      }
    } catch (error) {
      console.error(error);
    }
  });
  var searchArticle = (store, query, options, callback) => __awaiter5(void 0, void 0, void 0, function* () {
    const { limit, section } = options;
    const config = new PageSearchConfig(limit, section);
    let url = `${store}/search/suggest.json?q=${query}&resources[type]=article&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}`;
    if (config.section != null && typeof config.section === "string") {
      url = `${store}/search/suggest.json?q=${query}&resources[type]=article&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}&section_id=${config.section}`;
    }
    try {
      const response = yield fetch(url);
      if (config.section === null) {
        const data = yield response.json();
        callback(data.resources.results);
      } else {
        const data = yield response.text();
        const parser = new DOMParser().parseFromString(data, "text/html");
        const html = parser.querySelector(`#shopify-section-${config.section}`);
        callback(html);
      }
    } catch (error) {
      console.error(error);
    }
  });
  var CollectionSearchConfig = class {
    constructor(limit, section) {
      this.limit = limit || 10;
      this.options_fields = "product_type,title,tag,vendor";
      this.section = section || null;
    }
  };
  var searchCollection = (store, query, options, callback) => __awaiter5(void 0, void 0, void 0, function* () {
    const { limit, section } = options;
    const config = new CollectionSearchConfig(limit, section);
    let url = `${store}/search/suggest.json?q=${query}&resources[type]=collection&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}`;
    if (config.section != null && typeof config.section === "string") {
      url = `${store}/search/suggest.json?q=${query}&resources[type]=collection&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}&section_id=${config.section}`;
    }
    try {
      const response = yield fetch(url);
      if (config.section === null) {
        const data = yield response.json();
        callback(data.resources.results);
      } else {
        const data = yield response.text();
        const parser = new DOMParser().parseFromString(data, "text/html");
        const html = parser.querySelector(`#shopify-section-${config.section}`);
        callback(html);
      }
    } catch (error) {
      console.error(error);
    }
  });

  // app/index.js
  var ShopifyHelpers = class {
    constructor(store) {
      this.store = store;
      this.url = `https://${this.store}.myshopify.com/`;
    }
    // Product methods
    addToCart(id, quantity, properties, callback) {
      addToCart(id, quantity, properties, callback);
    }
    substractFromCart(id, quantity, callback) {
      substractFromCart(id, quantity, callback);
    }
    removeFromCart(id, callback) {
      removeFromCart(id, callback);
    }
    addBundle(products, callback) {
      addBundle(products, callback);
    }
    getProduct(handle, callback) {
      getProduct(handle, callback);
    }
    //Cart Methods
    getCart(callback) {
      getCart(callback);
    }
    addCartAttributes(attributes, callback) {
      addCartAttributes(attributes, callback);
    }
    addCartNote(note, callback) {
      addCartNote(note, callback);
    }
    cleanCartAttributes(callback) {
      cleanCartAttributes(callback);
    }
    cleanCartNote(callback) {
      cleanCartNote(callback);
    }
    emptyCart(callback) {
      emptyCart(callback);
    }
    // Recommend methods 
    getRecommendations(id, limit, intent, callback) {
      getRecommendations(id, limit, intent, callback);
    }
    getRecommendationsWithSection(id, limit, section, intent, callback) {
      getRecommendationsWithSection(id, limit, section, intent, callback);
    }
    //Section Methods
    getSection(sectionName, callback) {
      getSection(sectionName, callback);
    }
    //Search Methods
    searchProduct(q, options, callback) {
      searchProduct(this.url, q, options, callback);
    }
    searchPage(q, options, callback) {
      searchPage(this.url, q, options, callback);
    }
    searchArticle(q, options, callback) {
      searchArticle(this.url, q, options, callback);
    }
    searchCollection(q, options, callback) {
      searchCollection(this.url, q, options, callback);
    }
  };