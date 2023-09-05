const getSection =  async( sectionNamme: string, callback: Function) => {
    try {
        const response = await fetch(`/?sections=${sectionNamme}`);
        const data = await response.json();
        const parser = new DOMParser();
        const page = parser.parseFromString(data[sectionNamme], 'text/html');
        const htmlSection = page.querySelector(`#shopify-section-${sectionNamme}`);
        callback(htmlSection);        
    } catch (error) {
        console.error(error)
    }
}

export { getSection };