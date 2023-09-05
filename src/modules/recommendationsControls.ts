const getRecommendations = async (id: number, limit: number, intent: string | null, callback: Function) => {
  const productId: number = id;
  const productslimit: number = limit != null ? limit : 10;
  const intentType: string = intent != null ? intent : "related";
  try {
    const response = await fetch(`/recommendations/products.json?product_id=${productId}&limit=${productslimit}&intent=${intentType}`);
    const data = await response.json();
    callback(data);    
  } catch (error) {
    console.error(error);
  }
};

const getRecommendationsWithSection = async (id: number, limit: number, section: string, intent: string | null, callback: Function) => {
  const productId: number = id;
  const productslimit: number = limit != null ? limit : 10;
  const sectionId: string = section;
  const intentType: string = intent != null ? intent : "related";
  try {
    const response = await fetch(`/recommendations/products.json?product_id=${productId}&limit=${productslimit}&section_id=${sectionId}&intent=${intentType}`);
    const data = await response.json();
    callback(data);    
  } catch (error) {
    console.error(error);
  }
};

export {
    getRecommendations,
    getRecommendationsWithSection
}
