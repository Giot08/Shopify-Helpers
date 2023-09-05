// global.d.ts
declare module "Shopify-Helpers" {
    class ShopifyHelpers {
        metodoUno(): void;
        metodoDos(): void;
        addToCart(id: number, quantity: number, properties: object | undefined, callback: Function): any;
        substractFromCart(id: number, quantity: number, callback: Function): any;
        removeFromCart(id: number, callback: Function): any;
        addBundle(products: Array<productControls.productBundle>, callback: Function): any;
        getProduct(handle: string, callback: Function): any;
        getCart(callback: Function): any;
        addCartAttributes(attributes: object, callback: Function): any;
        addCartNote(note: string, callback: Function): any;
        cleanCartAttributes(callback: Function): any;
        cleanCartNote(callback: Function): any;
        emptyCart(callback: Function): any;
        getRecommendations(id: number, limit: number, intent: string | null, callback: Function): any;
        getRecommendationsWithSection(id: number, limit: number, section: string, intent: string | null, callback: Function): any;
        getSection(sectionName:string, callback: Function): any;
        searchProduct(q: string, options: searchControls.ProductSearchConfig, callback: Function): any;
        searchPage(q: string, options: searchControls.PageSearchConfig, callback: Function): any;
        searchArticle(q: string, options: searchControls.ArticleSearchConfig, callback: Function): any;
        searchCollection(q: string, options: searchControls.CollectionSearchConfig, callback: Function): any;
    }

    export default ShopifyHelpers;
}


interface Window {
    miFuncionPersonalizada: () => void;
    miVariableGlobal: string;
}