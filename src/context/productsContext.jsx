import { createContext, useEffect, useState } from "react";


const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
	const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    onlyFood: false,
  });

    useEffect(() => {
		if(productsLoaded){
				const uniqueCategories = [...new Set(productsList.map(product => product.category))];
				setCategories(uniqueCategories);
			}
		}, [productsList, productsLoaded]);


  useEffect(() => {
    if (productsLoaded) {
      setFilteredProducts(
        productsList.filter((product) => {
          const matchesName = product.name.includes(filters.name);
          const matchesCategory = filters.category ? product.category === filters.category : true;
          const matchesOnlyFood = filters.onlyFood ? product.isFood : true;
          return matchesName && matchesCategory && matchesOnlyFood;
        })
      );
    }
  }, [productsList, filters, productsLoaded]);
  
 const filterProducts = (name, category, onlyFood) => {
    if (productsLoaded) {
      setFilters({
        name: name !== null ? name : filters.name,
        category: category !== null ? category : filters.category,
        onlyFood: onlyFood !== null ? onlyFood : filters.onlyFood,
      });
    }
  };

  return (
    <ProductsContext.Provider value={{ productsList, setProductsList, filteredProducts, filterProducts, categories, productsLoaded, setProductsLoaded }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
