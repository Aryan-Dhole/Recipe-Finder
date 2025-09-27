import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null)


    useEffect(() => {
        const fetchRecipe = async () => {
            const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_RECIPE_KEY}`)
            const data = await res.json()
            console.log(data);

            setRecipe(data)
        }
        fetchRecipe()
    }, [id])

    if (!recipe) return "loading..."

    return (
        <div className="p-6 text-black">
            <h1 className="text-2xl font-bold">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="my-4 rounded-2xl" />

            <div className="prose"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}>

            </div>

        </div>
    )
}
export default RecipeDetail