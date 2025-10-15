import { Fragment } from 'react'
import { useCartStore } from '../store/cartStore'
import { useState } from 'react'

function Home() {
  const { items, addItem } = useCartStore();
  const [showCart, setShowCart] = useState(true);

  const handleTest = () => {
    addItem({ 
      id: '1', 
      name: 'Articulo de prueba', 
      quantity: 1,
      price: 150000,
      currency: 'COP',
      providerName: 'Proveedor de prueba',
      image: '/service-image.jpg'
    });
    setShowCart(true);
  };

  return (
    <Fragment>
      <h1>Home Page</h1>
      <h2>
        {showCart && items.length > 0
          ? items.map(item => `${item.name} x${item.quantity}`).join(', ')
          : ''}
      </h2>
      <button onClick={handleTest}>test</button>
    </Fragment>
  );
}

export default Home
