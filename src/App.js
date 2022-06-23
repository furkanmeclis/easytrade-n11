import React from "react";
import NewProduct from "./newProduct";
import { Provider } from "react-redux";
import newProductStore from "./newProduct/store";
export default function App() {
  return (
    <Provider store={newProductStore}>
      <NewProduct />
    </Provider>
  );
}
