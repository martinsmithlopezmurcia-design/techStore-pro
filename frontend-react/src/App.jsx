
import { useState } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ProductCard from './ProductCard.jsx'

const productos = [
  {
    nombre: "Mouse Inalambrico",
    descripcion: "Mouse ergonomico, conexion Bluetooth",
    precio: "$89.900",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvEnB4q9ozqAk6Dq3ViuTmouIq2InC9XfBnBAb_inQiP0dIwneRkZDVT-q&s=10",
    stock: 12
  },
  {
    nombre: "Teclado Mecanico",
    descripcion: "Switches azules, retroiluminado RGB",
    precio: "$149.900",
    imagen: "https://www.steren.com.co/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/21764ef03/teclado-bluetooth-recargable-con-iluminacion-multicolor-compacto.jpg",
    stock: 24
  },
  {
    nombre: "Monitor 24\"",
    descripcion: "Full Hd, 75Hz, panel IPS",
    precio: "$899.900",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTAubhg3n8XXvYuJSu90TIhQBi4UqIIyYLOInKRMhnQ&s=10",
    stock: 7
  },
  {
    nombre: "Redmi Note 14 Pro 5G:",
    descripcion: "Pantalla curva 1.5K, cámara de 200 MP, chip Dimensity 7300 y protección extrema IP68.",
    precio: "$1.799.900",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4i4Yr2zL8cb-TzGbzPuYqPMAdH9XAC6tIcTkBUkQGbg&s=10",
    stock: 14
  },
  {
    nombre: "Audifinos Inalambricos:",
    descripcion: "Cancelacion de ruido, 20h de bateria",
    precio: "$199.900",
    imagen: "https://media.falabella.com/sodimacCO/728335_02/w=1500,h=1500,fit=cover",
    stock: 24
  },
]
function App() {
  const [busqueda, setBusqueda] = useState("") 
  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-10 flex flex-col justify-between gap-10">
      <Navbar />
      <div className='flex items-center gap-3'>
        <input 
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-md px-4 py-2 border-2 border-slate-200 rounded-lg"
        />
        <p className='text-sm text-texto-dim whitespace-nowrap'>
          {productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())).length} producto(s) encontrado(s)
        </p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos
        .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
        .map((p) =>(
          <ProductCard
          key={p.nombre}
          nombre={p.nombre}
          descripcion={p.descripcion}
          precio={p.precio}
          imagen={p.imagen}
          stock={p.stock}
          />
        ))}
      </section>
      {productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase())).length === 0 && (
        <p className='text-center text-texto-dim py-10'>
          No se encontraron productos con ese nombre
        </p>
      )}
      <Footer />
    </main>
  )
}

export default App