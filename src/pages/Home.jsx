import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Home() {
    const [recipes, setRecipes] = useState([])
    const [search, setSearch] = useState("")

    const searchRecipes = async (query) => {
        const res = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${import.meta.env.VITE_RECIPE_KEY}`
        )
        const data = await res.json()
        setRecipes(data.results)
    }

    useEffect(() => {
        searchRecipes("paneer");
    }, []);


    return (
        <div className="p-6">
            <div className="flex justify-center my-8">
                <input type="text"
                    className="w-1/2 px-12 py-3 bg-gray-200 rounded-l-2xl focus:outline-gray-300"
                    placeholder="Search Recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <button
                    className="px-12 py-2 bg-violet-600 rounded-r-2xl text-white hover:scale-102 transition-transform duration-200 hover:bg-violet-700"
                    onClick={() => searchRecipes(search)}
                >
                    Fetch
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6 p-12 ">
                {recipes.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`}>
                        <div key={recipe.id} className="p-4 shadow-lg rounded-xl hover:scale-103 transition">
                            <img src={recipe.image} alt={recipe.title} className="rounded-md" />
                            <h2 className="font-semibold mt-2 text-center">{recipe.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}
export default Home
