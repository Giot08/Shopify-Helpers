const getCart = async(callback: Function | null) => {
  try {
    const response = await fetch( "/cart.js");
    const data = await response.json();
    if(callback) callback(data);
  } catch (error) {
    console.error(error);
  }
};
// Private atributes key need an undersocre "_" at the start "_foo"
const addCartAttributes = async(attributes: object, callback: Function | null) => {
  try {
    const response = await fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ attributes: attributes })
    });
    const data = await response.json();
    if (callback) callback(data);
  } catch (error) {
    console.error(error);
  }
};
const addCartNote = async (note: string, callback: Function | null) => {
  try {
    const response = await fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ note: note })
    });
    const data = await response.json();
    if (callback) callback(data);
  } catch (error) {
    console.error(error);
  }
};
const cleanCartAttributes = (callback: Function | null) => {
  getCart((res: any)=> {
    const resetAttributes: any = res.attributes;
    for (let i in resetAttributes) {
      resetAttributes[i] = '';
    }
    addCartAttributes(resetAttributes, callback);    
  })
};
const cleanCartNote = async (callback: Function | null) => {
  try {
    const response = await fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ note: "" })
    });
    const data = await response.json();
    if (callback) callback(data);
  } catch (error) {
    console.error(error);
  }
};
const emptyCart = async(callback: Function | null) => {
  try {
    const response = await fetch('/cart/clear.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (callback) callback(data);
  } catch (error) {
    console.error(error);
  }
};

export {
  getCart,
  addCartAttributes,
  addCartNote,
  cleanCartAttributes,
  cleanCartNote,
  emptyCart
};
