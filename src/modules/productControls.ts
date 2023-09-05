import { getCart } from "./cartControl.js";
import { Cart, CartItem } from "./models/cartModels.js"

const headers = {
  'Content-Type': 'application/json'
}

const addToCart = async (
  id: number,
  quantity: number,
  properties: object | undefined,
  callback: Function | null
) => {
  const props: object | null = properties != undefined ? properties : null;
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers,
      body: JSON.stringify({ id: id, quantity: quantity, properties: props })
    });
    const data = await response.json();
    if (callback) callback(data);    
  } catch (error) {
    console.error(error);
  }
};

const substractFromCart = (
  id: number,
  quantity: number | undefined,
  callback: Function | undefined
) => {
  try {
    getCart( async (cart: Cart)=> {
      const { items } = cart;
      if (items.length === 0) return console.warn("Cart is empty");
      const product = items.find((item: CartItem)=> item.id === id);
      if (!product) return console.warn("The product is not in cart.");
      let newQuantity: number
      if(quantity === undefined){
        newQuantity = product.quantity - 1
      }else{
        newQuantity = product.quantity - quantity;
      }
      if(newQuantity < 0) newQuantity = 0;
      const productId = product.id;
      const updates:any = {};
      updates[productId] = newQuantity;
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers,
        body: JSON.stringify({updates: updates})
      });
      const data = await response.json();
      if (callback) callback(data);
    });    
  } catch (error) {
    console.error(error)
  }
};

const removeFromCart = (
  id: number,
  callback: Function | undefined
) => {
  try {
    getCart( async (cart: Cart)=> {
      const { items } = cart;
      if (items.length === 0) return console.warn("Cart is empty");
      const product = items.find((item: CartItem)=> item.id === id);
      if (!product) return console.warn("The product is not in cart.");
      const productId = product.id;
      const updates:any = {};
      updates[productId] = 0;
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers,
        body: JSON.stringify({updates: updates})
      });
      const data = await response.json();
      if (callback) callback(data);
    });    
  } catch (error) {
    console.error(error)
  }
};

class productBundle {
  id: number;
  quantity: number;
  properties: object | undefined;

  constructor(id: number, quantity: number, properties: object | undefined) {
    this.id = id;
    this.quantity = quantity;
    this.properties = properties;
  }
}

//Agrega un bundle de productos
const addBundle = (
  products: Array<productBundle>,
  callback: Function | null
) => {
  try {
    let responses: Array<object> = []
    products.forEach((product) => {
      addToCart(
        product.id,
        product.quantity,
        product.properties,
        (data: object)=> {responses.push(data)}
        );
      });
    if(callback) callback(responses)
  } catch (error) {
    console.error(error);
  }
};

const getProduct = async (handle: string, callback: Function) => {
  try {
    const response = await fetch(`/products/${handle}/.js`);
    const data = await response.json();
    if (callback) callback(data);    
  } catch (error) {
    console.error(error);
  }
};

export {
  addToCart,
  substractFromCart,
  removeFromCart,
  productBundle,
  addBundle,
  getProduct
};
