import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { profileUnCheck } from "../../shope/profile";
import { FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

function AddProductForm() {
  const categoryData = useLoaderData();
  const subCategory = categoryData.data.data.subCategory;
  const color = categoryData.data.data.color;
  const [catChange, setCatChange] = useState(subCategory.men); //
  const [kids, setKids] = useState(false); //
  const [thirdCat, setThirdCat] = useState([]); //
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    dPrice: "",
    category: "",
    kidsGender: "",
    subCategory: "",
    product_detail: [{ main: "", sub: "" }],
    product_varients: [
      {
        color: "",
        images: [{ image: "" }],
        sizes: {},
      },
    ],
  });
  const category = categoryData.data.data.category;
  const size = categoryData.data.data.size;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileUnCheck());
  }, []); //

  const handelCatChange = (e) => {
    if (e.target.value === "") {
      return null;
    } else if (e.target.value === "kids") {
      setKids(true);
      setThirdCat(["boys", "girls"]);
    } else {
      setCatChange(subCategory[e.target.value]);
      setKids(false);
    }
    setData((pre) => ({ ...pre, category: e.target.value }));
  };

  const handelBlysOrGirls = (e) => {
    if (e.target.value === "") {
      return null;
    }
    setCatChange(subCategory.kids[e.target.value]);
    setData((pre) => ({ ...pre, kidsGender: e.target.value }));
  };

  const addImages = (ind, i) => {
    if (i < 5) {
      setData((prevData) => ({
        ...prevData,
        product_varients: prevData.product_varients.map((variant, index) =>
          index === ind
            ? {
                ...variant,
                images: [...variant.images, { image: "" }],
              }
            : variant
        ),
      }));
    }
  };

  const removeImage = (ind, i) => {
    const updatedImage = [...data.product_varients[ind].images];
    updatedImage.pop();
    setData((pre) => ({
      ...pre,
      product_varients: pre.product_varients.map((ele, index) =>
        index === ind ? { ...ele, images: updatedImage } : ele
      ),
    }));
  };

  const uplodeImage = (e, ind, i) => {
    const verients = [...data.product_varients];
    verients[ind].images[i].image = e.target.files[0];
    setData((pre) => ({ ...pre, product_varients: verients }));
  };

  const addProductDetail = () => {
    setData((pre) => ({
      ...pre,
      product_detail: [...pre.product_detail, { main: "", sub: "" }],
    }));
  };

  const deleteProductDetail = (ind) => {
    const updatedProductDetail = [...data.product_detail];
    updatedProductDetail.splice(ind, 1);
    setData((pre) => ({ ...pre, product_detail: updatedProductDetail }));
  };

  const addProduct_verient = () => {
    setData((pre) => ({
      ...pre,
      product_varients: [
        ...pre.product_varients,
        {
          color: "",
          images: [{ image: "" }],
          sizes: { S: 0 },
        },
      ],
    }));
  };

  const removeProduct_verient = () => {
    const updatedVerient = [...data.product_varients];
    updatedVerient.pop();
    setData((pre) => ({ ...pre, product_varients: updatedVerient }));
  };

  const handelColorChange = (e, ind) => {
    const updated_varients = [...data.product_varients];
    updated_varients[ind].color = e.target.value;
    setData((pre) => ({ ...pre, product_varients: updated_varients }));
  };
  const handelChangeQuenty = (e, ind) => {
    const update_sizes = { ...data.product_varients[ind].sizes };
    update_sizes[e.target.name] = e.target.value;
    setData((pre) => ({
      ...pre,
      product_varients: pre.product_varients.map((ele, i) =>
        i === ind ? { ...ele, sizes: update_sizes } : ele
      ),
    }));
  };
  const handelMainAndSubDetailChange = (e, ind, type) => {
    const updatedProductDetail = [...data.product_detail];
    updatedProductDetail[ind][type] = e.target.value;
    setData((pre) => ({ ...pre, product_detail: updatedProductDetail }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const formData = new FormData();
      data.product_varients.forEach((ele, ind) => {
        formData.append(`product_varients[${ind}][color]`, ele.color);
        for (let i in ele.sizes) {
          formData.append(
            `product_varients[${ind}][sizes][${i}]`,
            ele.sizes[i]
          );
        }
        ele.images.forEach((e, i) => {
          let name = `${ind}image${i}`;
          formData.append(name, e?.image);
        });
      });

      data.product_detail.forEach((ele, ind) => {
        formData.append(`product_detail[${ind}][main]`, ele.main);
        formData.append(`product_detail[${ind}][sub]`, ele.sub);
      });

      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("dPrice", data.dPrice);
      formData.append("category", data.category);
      formData.append("kidsGender", data.kidsGender);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);

      const response = await axios.post(
        "/api/product/add-product",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData({
        title: "",
        description: "",
        price: "",
        dPrice: "",
        brand: "",
        category: "",
        kidsGender: "",
        subCategory: "",
        product_detail: [{ main: "", sub: "" }],
        product_varients: [
          {
            color: "",
            images: [{ image: "" }],
            sizes: {},
          },
        ],
      });
      console.log("Product created successfully:", response.data);
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  return (
    <>
      <div className="bg-pink-50 h-[88vh] add-product-form overflow-x-hidden dark:bg-slate-800 px-8 py-6 w-[80%] ">
        <form
          onSubmit={handelSubmit}
          action=""
          className="bg-white flex flex-col gap-8 rounded w-[80%] dark:bg-slate-900 p-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 w-[45%]">
              <label htmlFor="" className="dark:text-white">
                Product Title *
              </label>
              <input
                type="text"
                placeholder="Enter a title"
                className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
                value={data.title}
                required
                onChange={(e) =>
                  setData((pre) => ({ ...pre, title: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-[45%]">
              <label htmlFor="" className="dark:text-white">
                Brand
              </label>
              <input
                type="text"
                placeholder="Enter a Brand"
                className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
                value={data.brand}
                onChange={(e) =>
                  setData((pre) => ({ ...pre, brand: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex w-[45%] flex-col gap-2">
              <label htmlFor="" className="dark:text-white">
                Price *
              </label>
              <input
                type="text"
                placeholder="Enter a Price"
                className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
                required
                value={data.price}
                onChange={(e) =>
                  setData((pre) => ({ ...pre, price: e.target.value }))
                }
              />
            </div>
            <div className="flex w-[45%] flex-col gap-2">
              <label htmlFor="" className="dark:text-white">
                Discounted Price
              </label>
              <input
                type="text"
                placeholder="Enter a Discounted price"
                className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
                value={data.dPrice}
                onChange={(e) =>
                  setData((pre) => ({ ...pre, dPrice: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex w-[30%] flex-col gap-2">
              <label htmlFor="" className="dark:text-white">
                Category
              </label>
              <select
                className="p-2  rounded-md border-[1px] border-black bg-gray-100 dark:bg-gray-700 dark:text-white"
                name=""
                id=""
                onChange={handelCatChange}
                required
              >
                <option value="">Select</option>
                {category.map((ele) => (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
            {kids && (
              <div className="flex w-[30%] flex-col gap-2">
                <label htmlFor="" className="dark:text-white">
                  Select boy or girl
                </label>
                <select
                  className="p-2  rounded-md border-[1px] border-black bg-gray-100 dark:bg-gray-700 dark:text-white"
                  name=""
                  id=""
                  onChange={handelBlysOrGirls}
                  required
                >
                  <option value="">Select</option>
                  {thirdCat.map((ele) => (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex w-[30%] flex-col gap-2">
              <label htmlFor="" className="dark:text-white">
                Sub Category
              </label>
              <select
                className="p-2  rounded-md border-[1px] border-black bg-gray-100 dark:bg-gray-700 dark:text-white"
                name=""
                id=""
                onChange={(e) =>
                  setData((pre) => ({ ...pre, subCategory: e.target.value }))
                }
                required
              >
                <option value="">Select</option>
                {catChange.map((ele) => (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="dark:text-white">
              Description
            </label>
            <textarea
              placeholder="Enter a description"
              className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
              value={data.description}
              required
              onChange={(e) =>
                setData((pre) => ({ ...pre, description: e.target.value }))
              }
            />
          </div>

          {data.product_varients.map((ele, ind) => (
            <div
              key={ind}
              className="flex flex-col gap-6 border border-gray-500 p-5 rounded-md"
            >
              <div
                key={ind}
                className="flex flex-wrap items-center justify-between"
              >
                <div className="flex w-[45%] flex-col gap-2">
                  <label htmlFor="" className="dark:text-white">
                    Color *
                  </label>

                  {/* <input
                    type="text"
                    placeholder="Enter a Color"
                    className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
                    value={data.product_varients[ind].color}
                    onChange={(e) => handelColorChange(e, ind)}
                  /> */}
                  <select
                    className="p-2  rounded-md border-[1px] border-black bg-gray-100 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => handelColorChange(e, ind)}
                    name=""
                    id=""
                    required
                  >
                    <option value="">Select</option>
                    {color.map((ele) => (
                      <option key={ele} value={ele}>
                        {ele}
                      </option>
                    ))}
                  </select>
                </div>
                {data.product_varients.length < 5 &&
                  (data.product_varients.length !== 1 ? (
                    data.product_varients.length === ind + 1 && (
                      <div className="flex w-[10%] gap-5">
                        <FaPlus
                          onClick={addProduct_verient}
                          className="text-xl text-green-500 cursor-pointer"
                        />
                        <AiFillDelete
                          className="text-xl text-red-700 cursor-pointer"
                          onClick={removeProduct_verient}
                        />
                      </div>
                    )
                  ) : (
                    <FaPlus
                      onClick={addProduct_verient}
                      className="text-xl text-green-500 cursor-pointer"
                    />
                  ))}
              </div>
              <div className="flex flex-wrap justify-between items-center">
                {data.product_varients[ind]?.images.map((e, i) => (
                  <div
                    key={i}
                    className="flex gap-4 mb-10 items-center w-[45%]"
                  >
                    <div className="flex w-[70%] flex-col gap-2">
                      <label htmlFor="" className="dark:text-white">
                        {i + 1} Product Image *
                      </label>
                      <input
                        type="file"
                        name={`image${i + 1}`}
                        id={`image${i + 1}`}
                        placeholder="Enter a Price"
                        className=" dark:text-white"
                        onChange={(e) => uplodeImage(e, ind, i)}
                      />
                    </div>
                    {i !== 5 &&
                      data.product_varients[ind].images.length === i + 1 && (
                        <>
                          <FaPlus
                            className="text-xl text-green-500 cursor-pointer"
                            onClick={() => addImages(ind, i)}
                          />
                          <AiFillDelete
                            className="text-xl text-red-700 cursor-pointer"
                            onClick={() => removeImage(ind, i)}
                          />
                        </>
                      )}
                  </div>
                ))}
              </div>
              <label className="dark:text-white">Size with Quentity</label>
              <div className="flex justify-between flex-wrap items-center gap-5">
                {size.map((ele, i) => (
                  <div
                    key={i}
                    className="w-[15%] border flex gap-5 border-slate-500 dark:border-white rounded-md p-3 overflow-hidden"
                  >
                    <div className="list-none  dark:text-white">{ele}</div>
                    <input
                      type="number"
                      className="bg-transparent border-none p-0 dark:text-white h-full outline-none rounded-md"
                      name={ele}
                      onChange={(e) => handelChangeQuenty(e, ind)}
                      defaultValue={0}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-6 border border-gray-500 p-5 rounded-md">
            <div className="dark:text-white text-center text-xl">
              product details
            </div>
            {data.product_detail.map((ele, ind) => (
              <div key={ind} className="flex justify-between">
                <div className="w-[30%] flex flex-col gap-2">
                  <label className="dark:text-white" htmlFor="">
                    Main Point
                  </label>
                  <input
                    className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
                    type="text"
                    value={ele.main}
                    required
                    onChange={(e) =>
                      handelMainAndSubDetailChange(e, ind, "main")
                    }
                    placeholder="Enter a main point"
                  />
                </div>
                <div className="w-[30%] flex flex-col gap-2">
                  <label className="dark:text-white" htmlFor="">
                    Sub Point
                  </label>
                  <input
                    className="p-2 rounded-md border-[1px] border-black bg-gray-100 dark:border-white dark:bg-gray-700 dark:text-white"
                    type="text"
                    value={ele.sub}
                    required
                    onChange={(e) =>
                      handelMainAndSubDetailChange(e, ind, "sub")
                    }
                    placeholder="Enter a Sub point"
                  />
                </div>
                <div>
                  {ind !== 0 ? (
                    <div className="flex gap-2 mt-8">
                      <FaPlus
                        className="text-xl text-green-500 cursor-pointer"
                        onClick={addProductDetail}
                      />{" "}
                      <AiFillDelete
                        className="text-xl text-red-500 cursor-pointer"
                        onClick={() => deleteProductDetail(ind)}
                      />{" "}
                    </div>
                  ) : (
                    <FaPlus
                      className="text-xl text-green-500 cursor-pointer mt-8"
                      onClick={addProductDetail}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-10">
            <button
              type="submit"
              className="bg-blue-600 text-white shadow-sm shadow-slate-700 dark:shadow-slate-400 w-[30%] rounded-lg p-2"
            >
              Add
            </button>

            <button
              type="reset"
              className="bg-red-600 text-white shadow-sm shadow-slate-700 dark:shadow-slate-400 w-[30%] rounded-lg p-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProductForm;
