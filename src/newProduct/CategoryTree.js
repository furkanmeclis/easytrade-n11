import React from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory ,setSelectedAttributes} from "./newProductSlice";
const CategoryTree = () => {
  const dispatch = useDispatch();
  const setAttributes = (action) => {
    dispatch(setSelectedAttributes(action))
  }
  const categorySelected = useSelector((state) => state.data.selectedCategory);
  const categoryAttributes = useSelector((state) => state.data.attributes);
  const attributes = useSelector(state => state.data.selectedAttributes)
  const onChange = (data, name) => {
    data = data === null ? undefined : data;
    setAttributes({ ...attributes, [name]: data });
  };
  return (
    <>
      {categoryAttributes.map((attribute) => (
        <Select
          key={attribute.id}
          placeholder={attribute.name}
          isMulti={attribute.multipleSelect}
          options={attribute.valueList.value.map((c) => ({
            value: c.id,
            label: c.name,
          }))}
          onChange={(e) => onChange(e, attribute.name)}
          isClearable
          isSearchable
        />
      ))}
      <pre>{JSON.stringify(attributes)}</pre>
    </>
  );
};
const MainCategoryTree = () => {
  const dispatch = useDispatch();
  const categorySelected = useSelector((state) => state.data.selectedCategory);
  const categories = useSelector((state) => state.data.categories);
  const onChange = (data) => {
    let value = data === null ? data : data.value;
    dispatch(setSelectedCategory(value));
  };
  return (
    <>
      <Select
        options={categories.categoryList.category.map((c) => ({
          value: c.id,
          label: c.name,
        }))}
        placeholder="Kategori Seçiniz"
        onChange={onChange}
        isClearable
      />
      <hr />
      {categorySelected !== null && <CategoryTree />}
    </>
  );
};
export default MainCategoryTree;
