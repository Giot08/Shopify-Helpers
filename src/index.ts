import * as productControls from "./modules/productControls.js";
import * as cartControl from "./modules/cartControl.js";
import * as recommendControls from "./modules/recommendationsControls.js";
import * as sectionControl from "./modules/sectionsControl.js";
import * as searchControls from "./modules/searchControls.js";

class ShopifyHelpers {
  store: string;
  url: string;

  constructor(store: string) {
    this.store = store;
    this.url = `https://${this.store}.myshopify.com/`;
  }

  // Product methods
  addToCart(id: number, quantity: number, properties: object | undefined, callback: Function) {
    productControls.addToCart(id, quantity, properties, callback);
  }
  substractFromCart(id: number, quantity: number, callback: Function) {
    productControls.substractFromCart(id, quantity, callback);
  }
  removeFromCart(id: number, callback: Function) {
    productControls.removeFromCart(id, callback);
  }
  addBundle(products: Array<productControls.productBundle>, callback: Function) {
    productControls.addBundle(products, callback);
  }
  getProduct(handle: string, callback: Function) {
    productControls.getProduct(handle, callback);
  }

  //Cart Methods
  getCart(callback: Function) {
    cartControl.getCart(callback);
  }
  addCartAttributes(attributes: object, callback: Function) {
    cartControl.addCartAttributes(attributes, callback);
  }
  addCartNote(note: string, callback: Function) {
    cartControl.addCartNote(note, callback);
  }
  cleanCartAttributes(callback: Function) {
    cartControl.cleanCartAttributes(callback);
  }
  cleanCartNote(callback: Function) {
    cartControl.cleanCartNote(callback);
  }
  emptyCart(callback: Function) {
    cartControl.emptyCart(callback);
  }
  // Recommend methods 
  getRecommendations(id: number, limit: number, intent: string | null, callback: Function) {
    recommendControls.getRecommendations(id, limit, intent, callback)
  }
  getRecommendationsWithSection(id: number, limit: number, section: string, intent: string | null, callback: Function){
    recommendControls.getRecommendationsWithSection(id, limit, section, intent, callback)
  }
  //Section Methods
  getSection(sectionName:string, callback: Function ) {
    sectionControl.getSection(sectionName, callback);
  }
  //Search Methods
  searchProduct(q: string, options: searchControls.ProductSearchConfig, callback: Function) {
    searchControls.searchProduct(this.url, q, options, callback);
  }
  searchPage(q: string, options: searchControls.PageSearchConfig, callback: Function) {
    searchControls.searchPage(this.url, q, options, callback);
  }
  searchArticle(q: string, options: searchControls.ArticleSearchConfig, callback: Function) {
    searchControls.searchArticle(this.url, q, options, callback);
  }
  searchCollection(q: string, options: searchControls.CollectionSearchConfig, callback: Function) {
    searchControls.searchCollection(this.url, q, options, callback);
  }
}


export default ShopifyHelpers;