import { useState, useEffect, useContext  } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "./CartContext";

function ProductoDetalle() {
    const { id } = useParams();
    const { agregarAlCarrito } = useContext(CartContext);
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [agregado, setAgregago] = useState(false);
    const [otros, setOtros] = useState([]);

    useEffect(() => {
        setCargando(true);
        setError(null);

        // 1. Traemos el producto específico para este detalle
        fetch("http://localhost:3000/api/productos/" + id)
            .then((res) => {
                if (!res.ok) throw new Error("Producto no encontrado");
                return res.json();
            })
            .then((datos) => {
                setProducto(datos);
            })
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));

        // 2. Traemos la lista completa de productos para la sección "También te puede interesar"
        fetch("http://localhost:3000/api/productos")
            .then((res) => res.json())
            .then((datos) => setOtros(Array.isArray(datos) ? datos : []))
            .catch(() => setOtros([]));
    }, [id]); // Es importante agregar [id] para que se actualice si cambias de producto

    useEffect(() => {
        if (!producto) return;
        const tituloAnterior = document.title;
        document.title = producto.nombre + " | TechStore";
        return () => {
            document.title = tituloAnterior;
        };
    }, [producto]);

    function agregar() {
        agregarAlCarrito({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio, // Corregido: antes tenías producto.imagen asignado a precio
        });
        setAgregago(true);
    }

    if (cargando) {
        return <p className="text-center py-20 text-gray-500">Cargando producto...</p>;
    }

    if (error || !producto) {
        return (
            <div className="flex flex-col items-center text-center gap-4 py-20">
                <p className="text-accent-dark">{error || "Producto no encontrado"}</p>
                <Link to="/productos" className="font-semibold underline hover:text-accent transition-colors">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    // Se procesa aquí abajo asegurándonos de que 'otros' sea un array y la carga terminó
    const relacionados = otros.filter((p) => p._id !== id).slice(0, 3);

    return (
        <div className="flex flex-col gap-8">
            <Link to="/productos" className="text-sm font-semibold text-gray-700 hover:text-ink transition-colors">
                ← Volver al catálogo
            </Link>
            <div className="grid gap-10 md:grid-cols-2">
                <img
                    src={producto.imagen?.replace("w=400&h=250", "w=1000&h=1250")}
                    alt={producto.nombre}
                    className="w-full aspect-4/5 object-cover rounded-3xl"
                />
                <div className="flex flex-col gap-5 md:py-6">
                    <span className="font-mono text-[11px] font-bold tracking-wider text-gray-500">
                        REF {String(producto.id || "").padStart(2, "0")}
                    </span>
                    <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-tight">
                        {producto.nombre}
                    </h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {producto.descripcion}
                    </p>
                    <p className="font-mono text-3xl font-bold">
                        {producto.precio}
                    </p>
                    <button
                        onClick={agregar}
                        disabled={agregado}
                        className="mt-4 bg-ink text-paper rounded-card py-4 text-sm font-semibold hover:bg-accent transition-colors"
                    >
                        {agregado ? "Agregado al carrito" : "Agregar al carrito"}
                    </button>
                </div>
            </div>

            <section className="flex flex-col gap-4 border-t border-gray-100 pt-10">
                <h2 className="font-display font-bold text-2xl tracking-tight">
                    También te puede interesar
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {relacionados.map((p) => (
                        <Link
                            key={p._id}
                            to={"/productos/" + p._id}
                            className="flex flex-col gap-1 border border-gray-300 rounded-card p-4 hover:border-ink transition-colors"
                        >
                            <span className="font-semibold">{p.nombre}</span>
                            <span className="font-mono text-sm text-gray-500">
                                {p.precio}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ProductoDetalle;
