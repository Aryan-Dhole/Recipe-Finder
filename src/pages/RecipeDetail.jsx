import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        const fetchRecipe = async () => {
            const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_RECIPE_KEY}`)
            const data = await res.json()
            console.log(data);

            setRecipe(data)
        }
        fetchRecipe()
    }, [id])

    if (!recipe) {
        return <div className="p-6 text-gray-500 animate-pulse text-center">Loading recipe...</div>
    }


    return (
        <div className="p-6 text-black">
            <h1 className="text-3xl font-bold text-center">{recipe.title}</h1>
            <div className="flex gap-8 mt-12">
                <img src={recipe.image} alt={recipe.title} className="my-4 rounded-2xl" />

                <div className="mt-6">
                    <h2 className="text-2xl italic font-bold mb-4">Instructions:</h2>
                    {recipe.analyzedInstructions?.[0]?.steps?.length > 0 ? (
                        <ol className="list-decimal list-inside space-y-3 text-xl">
                            {recipe.analyzedInstructions[0].steps.map((s) => (
                                <li key={s.number}>{s.step}</li>
                            ))}
                        </ol>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                    )}
                </div>
            </div>

            <div className="flex justify-center my-12">
                <button className="mb-4 px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 hover:scale-105"
                    onClick={() => navigate(-1)}>
                    Back to Home
                </button>
            </div>
        </div>
    )
}
export default RecipeDetail