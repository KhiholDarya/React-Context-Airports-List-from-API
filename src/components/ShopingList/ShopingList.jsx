import { useContext, useEffect } from "react";
import "../../commonStyles.css"
import { ShoppingListContext } from "../../context/shoppingListContext";
import axios from "axios";



const ShopingList = () => {
	const { shoppingList, setShoppingList } = useContext(ShoppingListContext);

	useEffect(() => {
		const fetchShoppingList = async () => {
		try {
			const response = await axios.get(
				'http://localhost:4000/api/shoppingList'
			);
			setShoppingList(response.data);
		} catch (error) {
			console.log( error.message);
		}
		};
		fetchShoppingList();
	}, [setShoppingList]);


 const removeFromShoppingList = async (id) => {
	try {
		await axios.delete(`http://localhost:4000/api/shoppingList/${id}`);
		setShoppingList(shoppingList.filter((product) => product.id !== id));

	} catch (error) {
		console.log( error);
	}
 };


  return (
    <div className="App">
      <header className="AppHeader">
        <p>Shoping List</p>
		<ul>
          {shoppingList.map((product) => (
              <li 
					onClick={() => removeFromShoppingList(product.id)} 
					key={product.id}>
					{product.name}
					</li>
			))}
        </ul>
      </header>
    </div>
  );
};
export default ShopingList;
