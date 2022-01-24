import { categories } from "../data";
import CategoryItem from "./CategoryItem";

function Categories() {
  return (
    <div className="categories">
      {categories.map((item) => {
        return <CategoryItem key={item.id} item={item} />;
      })}
    </div>
  );
}

export default Categories;
