import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import { BsFillCartCheckFill } from "react-icons/bs";
import { TbDoorExit } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

interface Data {
  title: string;
  category: string;
  description: string;
  image: string;
  price: string;
}

export default function Api() {
  const [guardarApi, setGuardarApi] = useState<Data[]>([]);
  const [verInfo, setVerInfo] = useState<boolean>(false);
  const [verUna, setVerUna] = useState<string>();
  const [modalShopping, setModalShopping] = useState<boolean>(false);
  const [carrito, setCarrito] = useState<Data[]>([]);
  const [direccionFactura, setDireccionFactura] = useState<string>("");

  const Api = "https://fakestoreapi.com/products";

  const verApi = async () => {
    const data = await axios.get(Api);
    // console.log(data);
    setGuardarApi(data.data);
  };

  // console.log(guardarApi);

  useEffect(() => {
    verApi();
  }, [carrito]);

  const boton = () => {
    if (verInfo) {
      setVerInfo(false);
    } else {
      setVerInfo(true);
    }
  };

  const botonShop = () => {
    if (modalShopping) {
      setModalShopping(false);
    } else {
      setModalShopping(true);
    }
  };

  const agregarAlCarrito = (producto: Data) => {
    setCarrito([...carrito, producto]);
    alert("Mercancia agregada al carrito");
  };

  const eliminarMercancia = (producto: Data) => {
    const nuevoCarrito = carrito.filter(
      (item) => item.title !== producto.title
      );
      setCarrito(nuevoCarrito);
      alert("producto eliminado correctamente");
    };
    
    useEffect(() => {
      let guardarDatos = localStorage.getItem("carrito");
      if (guardarDatos) {
        setCarrito(JSON.parse(guardarDatos));
      }
    }, []);
    
    useEffect(() => {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);
    
    const { name } = useParams()

  const botonCompras = () => {
    const direccion = prompt("Digite lugar donde enviar factura");
    if (direccion) {
      setDireccionFactura(direccion);
      setCarrito([]);
      alert("Compra realizada correctamente " + name +". Factura enviada a: " + direccion);
    } else {
      alert("Debe ingresar una dirección válida");
    }
  };

  console.log(direccionFactura);

  const navigate = useNavigate();

  const botonSalida = () => {
    navigate("/");
  };

  /* const result = dataLog.find((name:any) => name.firstName === name )  
  console.log(dataLog.firstName); */
  
  

  return (
    <div>
      <div className="contenedorWelcome">
        <h1 className="welcomeBack">welcome {name}</h1>

        <TbDoorExit className="tbdorr" onClick={botonSalida} />
      </div>
      <header>
        <h1>Store's Mike</h1>
        <button className="botonVerCar" onClick={botonShop}>
          <BsFillCartCheckFill className="shop" />
        </button>
      </header>

      <div className="modalshope">
        {modalShopping ? (
          <div>
            {carrito.length > 0 ? (
              <ul>
                {carrito.map((producto, index) => (
                  <li key={index}>
                    {producto.title}
                    <img src={producto.image} alt="" className="imgCarrito" />
                    <br />${producto.price}
                    <br></br>
                    <button
                      style={{ cursor: "pointer", borderRadius: "80px" }}
                      onClick={() => {
                        eliminarMercancia(producto);
                      }}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
                <h2>Total:</h2>
                <h3>
                  $
                  {carrito.reduce((accumulator, currentItem) => {
                    return accumulator + parseFloat(currentItem.price);
                  }, 0)}
                </h3>
                <button
                  onClick={botonCompras}
                  style={{ cursor: "pointer", borderRadius: "80px" }}
                >
                  Comprar
                </button>
              </ul>
            ) : (
              <p>No hay productos</p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="container">
        {guardarApi.map((item, index) => {
          return (
            <div key={index} style={{ borderStyle: "solid" }}>
              <h2>title:</h2>
              <h3>{item.title}</h3>
              <img src={item.image} alt="" />
              <button
                className="botonVer"
                onClick={() => {
                  boton();
                  setVerUna(item.price);
                }}
              >
                Descripcion
              </button>
              <button
                className="botonAgg"
                onClick={() => {
                  agregarAlCarrito(item);
                }}
              >
                Agregar
              </button>

              {verUna === item.price && verInfo ? (
                <div>
                  <h2>category:</h2>
                  <h3>{item.category}</h3>
                  <h2>price:</h2>
                  <h3>{item.price}</h3>
                  <h2>Description:</h2>
                  <h3>{item.description}</h3>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
