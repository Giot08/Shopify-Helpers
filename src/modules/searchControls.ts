type LimitRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Options_unavailable_products = "show" | "hide" | "last";
type ProductSearchMethod = "both" | "code"  | "title" | "vendor";

class ProductSearchConfig {
    limit: LimitRange | number;
    options_unavailable_products: Options_unavailable_products | string;
    options_fields: ProductSearchMethod | string;
    section: string | null;

    constructor(
      limit: LimitRange | number, 
      options_unavailable_products: Options_unavailable_products | string, 
      options_fields: ProductSearchMethod | string,
      section: string | null
      ) {
      this.limit = limit || 10;
      this.options_unavailable_products = options_unavailable_products || "hide";
      this.options_fields = options_fields || "title";
      this.section = section || null;
    }
    productSearchMethod = (method: string)=> {
      if(method === "all") return this.options_fields = "tag,variants.barcode,variants.sku,product_type,title,variants.title,vendor";
      if(method === "code") return this.options_fields = "tag,variants.barcode,variants.sku";
      if(method === "title") return this.options_fields = "product_type,tag,title,variants.title";
      if(method === "vendor") return this.options_fields = "vendor";
      return this.options_fields = "product_type,tag,title,variants.title";
    }
}

const searchProduct =  async( store: string, query: string, options: ProductSearchConfig, callback: Function) => {
  const {limit, options_unavailable_products, options_fields, section} = options;
  const config = new ProductSearchConfig(limit, options_unavailable_products, options_fields, section);
  config.productSearchMethod(options_fields);
  let url: string = `${store}/search/suggest.json?q=${query}&resources[type]=product&resources[options][unavailable_products]=${config.options_unavailable_products}&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}`;
  if(config.section != null && typeof(config.section) === "string") {
    url = `${store}/search/suggest?q=${query}&resources[type]=product&resources[options][unavailable_products]=${config.options_unavailable_products}&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}&section_id=${config.section}`;
  }  
  try {
    const response = await fetch(url)
    if(config.section === null) {
      const data = await response.json();
      callback(data);
    }else {
      const data = await response.text();
      const parser = new DOMParser().parseFromString(data, 'text/html');
      const html = parser.querySelector(`#shopify-section-${config.section}`);
      callback(html);
    }
  } catch (error) {
    console.error(error);
  }
}

class PageSearchConfig {
  limit: LimitRange | number;
  options_fields: string;
  section: string | null;

  constructor(limit: LimitRange | number, section: string | null) {
    this.limit = limit || 10;
    this.options_fields = "body,title";
    this.section = section || null;
  }
}

const searchPage =  async( store: string, query: string, options: PageSearchConfig, callback: Function) => {
  const {limit, section} = options;
  const config = new PageSearchConfig(limit, section);
  let url: string = `${store}/search/suggest.json?q=${query}&resources[type]=page&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}`;

  if(config.section != null && typeof(config.section) === "string") {
    url = `${store}/search/suggest.json?q=${query}&resources[type]=page&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}&section_id=${config.section}`;
  } 
  try {
    const response = await fetch(url);
    if(config.section === null) {
      const data = await response.json();
      callback(data.resources.results);
    }else {
      const data = await response.text();
      const parser = new DOMParser().parseFromString(data, 'text/html');
      const html = parser.querySelector(`#shopify-section-${config.section}`);
      callback(html);
    }
  } catch (error) {
    console.error(error);
  }
}

class ArticleSearchConfig {
  limit: LimitRange | number;
  options_fields: string;
  section: string | null;

  constructor(limit: LimitRange | number, section: string | null) {
    this.limit = limit || 10;
    this.options_fields = "author,body,title,tag";
    this.section = section || null;
  }
}

const searchArticle =  async( store: string, query: string, options: PageSearchConfig, callback: Function) => {
  const {limit, section} = options;
  const config = new PageSearchConfig(limit, section);
  let url: string = `${store}/search/suggest.json?q=${query}&resources[type]=article&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}`;
  if(config.section != null && typeof(config.section) === "string") {
    url = `${store}/search/suggest.json?q=${query}&resources[type]=article&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}&section_id=${config.section}`;
  } 
  try {
    const response = await fetch(url);
    if(config.section === null) {
      const data = await response.json();
      callback(data.resources.results);
    }else {
      const data = await response.text();
      const parser = new DOMParser().parseFromString(data, 'text/html');
      const html = parser.querySelector(`#shopify-section-${config.section}`);
      callback(html);
    }
  } catch (error) {
    console.error(error)
  }
}

class CollectionSearchConfig {
  limit: LimitRange | number;
  options_fields: string;
  section: string | null;

  constructor(limit: LimitRange | number, section: string | null) {
    this.limit = limit || 10;
    this.options_fields = "product_type,title,tag,vendor";
    this.section = section || null;
  }
}

const searchCollection =  async( store: string, query: string, options: PageSearchConfig, callback: Function) => {
  const {limit, section} = options;
  const config = new CollectionSearchConfig(limit, section);
  let url: string = `${store}/search/suggest.json?q=${query}&resources[type]=collection&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}`;
  if(config.section != null && typeof(config.section) === "string") {
    url = `${store}/search/suggest.json?q=${query}&resources[type]=collection&resources[options][fields]=${config.options_fields}&resources[limit]=${config.limit}&section_id=${config.section}`;
  } 
  try {
    const response = await fetch(url)
    if(config.section === null) {
      const data = await response.json();
      callback(data.resources.results);
    }else {
      const data = await response.text();
      const parser = new DOMParser().parseFromString(data, 'text/html');
      const html = parser.querySelector(`#shopify-section-${config.section}`);
      callback(html);
    }
  } catch (error) {
    console.error(error)
  }
}

class QuerySearchConfig {
  limit: LimitRange | number;
  section: string | null;

  constructor(limit: LimitRange | number, section: string | null) {
    this.limit = limit || 10;
    this.section = section || null;
  }
}

const searchQuery =  async( store: string, query: string, options: QuerySearchConfig, callback: Function) => {
  const {limit, section} = options;
  const config = new CollectionSearchConfig(limit, section);
  let url: string = `${store}/search/suggest.json?q=${query}&resources[type]=query&resources[options][fields]=author,body,product_type,tag,title,variants.barcode,variants.sku,variants.title,vendor&resources[limit]=${config.limit}`;
  if(config.section != null && typeof(config.section) === "string") {
    url = `${store}/search/suggest.json?q=${query}&resources[type]=collection&resources[options][fields]=author,body,product_type,tag,title,variants.barcode,variants.sku,variants.title,vendor&resources[limit]=${config.limit}&section_id=${config.section}`;
  } 
  try {
    const response = await fetch(url)
    if(config.section === null) {
      const data = await response.json();
      callback(data.resources.results);
    }else {
      const data = await response.text();
      const parser = new DOMParser().parseFromString(data, 'text/html');
      const html = parser.querySelector(`#shopify-section-${config.section}`);
      callback(html);
    }
  } catch (error) {
    console.error(error)
  }
}


export { ProductSearchConfig, searchProduct, PageSearchConfig, searchPage, ArticleSearchConfig, searchArticle, CollectionSearchConfig, searchCollection};