import Products from "../componets/Products"

function Home() {
  return (
    <>
        <div className="bg-blue-600 py-2">
            <h1 className="text-3xl font-semibold text-center text-white">Phantom Click</h1>
        </div>
        <Products />
    </>
  )
}

export default Home