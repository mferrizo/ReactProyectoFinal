import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import CartContextProvider from "./components/CartContext";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting={"Welcome to APB Electronic!"} />}
          />
          <Route
            path="/category/:idCategory"
            element={<ItemListContainer greeting={"Welcome to Electro!"} />}
          />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart greeting={"Your Cart"} />} />
          <Route
            path="/checkout"
            element={<Checkout greeting={"Finish Checkout"} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
