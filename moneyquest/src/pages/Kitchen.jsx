import { INGREDIENTS } from "../data/ingredients";
import { hasAllIngredients, ownedCount } from "../logic/rules";
import.meta.env.BASE_URL;

export default function Kitchen({ state, setPage }) {
  const count = ownedCount(state, INGREDIENTS);
  const done = hasAllIngredients(state, INGREDIENTS);

  // Sort by stage so sauce is under cheese etc.
  const layers = [...INGREDIENTS].sort((a, b) => a.stage - b.stage);

  return (
    <div className="page-kitchen">
      <h2 className="title">Kitchen 🍕</h2>

      <div className="kitchen-ui">
        <div className="pizza-frame">

          {layers.map((ing) => {
            const owned = state.inventory.includes(ing.id);

            return (
                <img
                    key={ing.id}
                    // This ensures the path is always /CreditCrust/mushroom.png
                    src={`${import.meta.env.BASE_URL}${ing.id}.png`}
                    alt={ing.name}
                    className="pizza-layer"
                    // ... rest of your code
                />
            );
          })}
        </div>

        <div className="kitchen-info">
          <p>Ingredients owned: {count}/{INGREDIENTS.length}</p>

          {!done ? (
            <p>Buy all ingredients to unlock “Make Pizza”.</p>
          ) : (
            <button className="btn" onClick={() => setPage("final")}>
              Make Pizza 🎉
            </button>
          )}

          <button className="back-btn" onClick={() => setPage("home")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
