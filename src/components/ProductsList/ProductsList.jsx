import { useContext, useState } from "react";
import "../../commonStyles.css"
import { ProductsContext } from "../../context/productsContext";
import axios from "axios";
import { ShoppingListContext } from "../../context/shoppingListContext";
import { LinearProgress } from "@mui/material";


const ProductsList = () => {
	const { filteredProducts, setProductsList, setProductsLoaded } = useContext(ProductsContext);
	const { setShoppingList} = useContext(ShoppingListContext);
	const [loading, setLoading] = useState(false);
	
	const loadPoductsListFromAPI = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:4000/api/productsList');
			setProductsList(response.data);
			setProductsLoaded(true);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
	}
	};

	const addToShoppingList = async (product) => {
		try {
			await axios.post('http://localhost:4000/api/shoppingList', product);
			const shoppingListFromApi = await axios.get('http://localhost:4000/api/shoppingList');
			setShoppingList(shoppingListFromApi.data);
			} catch (error) {
				console.log(error);
				}
	}
	

  return (
    <div className="App">
      <header className="AppHeader">
        <button onClick={loadPoductsListFromAPI}> Load </button>
		<br />
		{loading && <div style={{ width: '100%', position: 'relative' }}>
          <LinearProgress />
        </div>}
        <p>Products list</p>
			<ul>
          {filteredProducts.map((product) => (
              <li onClick={() => addToShoppingList(product)} key={product.id}>{product.name}</li>
			))}
        </ul>
      </header>
    </div>
  );
};

export default ProductsList;
