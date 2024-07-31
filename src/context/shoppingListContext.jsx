import { createContext, useState } from "react";
const ShoppingListContext = createContext();

const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);

  return (
    <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };
