import React, { useState } from "react";
import { Link } from "react-router-dom";
import imageBackground from "../assets/sky.avif";
import BiSearch from "react-icons/bi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { globalData, updateData } from "../store/slices/RootReducer";
import { useSelector } from "react-redux";
import { tags } from "../store/slices/TagSlice";
import { showTagedImages } from "../store/slices/TagSlice";

function TopSection(props: any) {
  // console.log(props.data);
  // console.log(props.setData)
  const api_key: string =
    "live_5iXXTERHMhY9AzaiJ5IL1FazIrixxEqqlcNM8LPNnL0R5bPi6wliZ7HotvR3MGc8";
  const dispatch = useDispatch();
  const items: any = useSelector((state: any) => state.GLOBAL_DATA.data);

//   interface Obj = {
// approved :  number ;
// height :  number ;
// id : string ;
// original_filename : string ;
// pending : number ;
// url  : string ;
// width : Number
// }
  const [addNewImage, setNewImage] = useState()

  const fileSelector = async (event: any) => {
    const file = event.target.files[0];
    console.log(file)
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData)

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "multipart/form-data",
        "x-api-key": api_key,
      },
    };

    try {
      const res: any = await axios.post(
        "https://api.thecatapi.com/v1/images/upload",
        formData,
        config
      );
        console.log(res.data)
      dispatch(updateData(res.data));
      setNewImage(res.data);
      console.log(addNewImage);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const [searching, setSearching] = useState<string>("");

  const SearchImages = (e: any) => {
    if (searching) {
      dispatch(showTagedImages(true));
    } else {
      dispatch(showTagedImages(false));
    }
    e.preventDefault();
    console.log(items);
    const res: any = items.filter((data: any) =>
      data.tag.toLowerCase() === searching ? data : ""
    );
    console.log(res);
    dispatch(tags(res));
  };

  // const searchTerm = (event: any) => {
  //   const rs:string = event.target.value.toLowerCase();
  //   console.log(rs);

  //  const result = items.map((item: any) => (item.tag.includes(rs) ? item : '' ));
  //  console.log(result)
  // };

  const AddNewImage = (e: any, img: any) => {
    e.preventDefault();
    if (img === null) {
      alert("Please Select an Image First");
    }
    props.setData([...props.data, img]);
  };

  return (
    <div
      className={`w-screen flex flex-col h-[60vh] w-screen overflow-hidden gap-6 items-center pt-5 justify-start bg-cover bg-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}
      style={{
        backgroundImage: `url(${imageBackground})`,
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
    >
      <div className="flex gap-5  items-center justify-end w-[80%]">
        <form
          className=" flex items-center gap-3.5"
          onSubmit={(e) => AddNewImage(e, addNewImage)}
        >
          {/* <label className="text-md font-semibold ">Add new Image</label> */}
          {/* <label htmlFor="file" className=" bg-white text-black opacity-75 hover:bg-gray-100 p-2 rounded-md">Select a File</label> */}
          <input
            type="file"
            className="w-24"
            id="fileInput"
            onChange={fileSelector}
            // style={{ display: "none" }}
          />
          <button
            type="submit"
            className=" bg-white text-black opacity-75 hover:bg-gray-100 p-2 rounded-md"
          >
            upload image
          </button>
        </form>

        <div className="">
          <Link
            to="/Collections"
            className=" bg-white text-black opacity-75 hover:bg-gray-100 p-2 rounded-md"
          >
            Collections
          </Link>
        </div>
      </div>

      <div className="underline underline-offset-[10px] mb-10 flex w-[80%]">
        <h1 className="text-3xl font-bold tracking-wide text-cyan-500  ">
          Photo{" "}
          <span className="font-normal tracking-[.4rem] text-gray-800">
            Gallary
          </span>
        </h1>
      </div>

      <div className="w-[80%]">
        <form
          action=""
          className="flex flex-col w-full items-start"
          onSubmit={(e) => SearchImages(e)}
        >
          <input
            type="search"
            name="imgSearch"
            id="imgSearch"
            placeholder="Search by tags"
            className="rounded h-6 focus:outline-none pl-2 w-full h-[2.5rem]"
            // onKeyUp={searchTerm}
            onChange={(e) => setSearching(e.target.value)}
          />
          {/* {searchItem.map((item, index) => (
          <ul
            className={`py-2 text-sm text-gray-700 dark:text-gray-200 bg-white rounded p-2 ${
              searchItem ? "" : "invisible"
            } `}
            aria-labelledby="dropdownDefaultButton"
          >
          
            <li
              key={index}
              className="block w-20 text-black px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white  "
            >
              {item}
            </li>
      
          </ul>
              ))}  */}
        </form>
      </div>
    </div>
  );
}
export default TopSection;
