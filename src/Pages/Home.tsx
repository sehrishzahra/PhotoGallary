import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopSection from "../Components/TopSection";
import {
  AiOutlineArrowDown,
  AiFillDelete,
  AiOutlinePlus,
  AiOutlineSetting,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { globalData } from "../store/slices/RootReducer";
import { addingImageToCollection } from "../store/slices/CollectionImage";
// import { tags } from "../store/slices/TagSlice";
// import Collection from "./Collection";
// import { showTagedImages } from "../store/slices/TagSlice";
function Home() {
  const api: string = "https://api.thecatapi.com/v1/images/";

  interface ObjectData {
    height: number;
    id: string;
    url: string;
    width: number;
  }
  const [data, setData] = useState<ObjectData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [btnId, setBtnId] = useState<{ id: string }>({
    id: "",
  });

  const [showDescCol, setShowDescCol] = useState(false);
  const [showDescSetting, setShowDescSetting] = useState(false);
  const [showDescDel, setShowDescDel] = useState(false);
  const [showDescDownload, setShowDescDownload] = useState(false);

  const [dropDownSetting, setDropDownSetting] = useState(false);
  const [showDropDownTags, setShowDropDownTags] = useState(false);
  const [hideCross, setHideCross] = useState(false);

  const arrayOfTags = ["Happy", "Angry", "Sad", "Cute", "Funny"];

  const items: any = useSelector((state: any) => state.GLOBAL_DATA.data);
  // console.log(items);
  const tagsImages: any = useSelector((state: any) => state.Tags_Data.tags);
  console.log(tagsImages);
  const checkIfTrueOrFalse: boolean = useSelector(
    (state: any) => state.Taged_Images_Data.s
  );
  console.log(checkIfTrueOrFalse); //true
  // const arrayofCatsData = [
  //   {
  //     id: "1f6",
  //     url: "https://cdn2.thecatapi.com/images/1f6.jpg",
  //     width: 2048,
  //     height: 1535,
  //   },
  //   {
  //     id: "341",
  //     url: "https://cdn2.thecatapi.com/images/341.gif",
  //     width: 500,
  //     height: 375,
  //   },
  //   {
  //     id: "663",
  //     url: "https://cdn2.thecatapi.com/images/663.jpg",
  //     width: 612,
  //     height: 612,
  //   },
  //   {
  //     id: "a8i",
  //     url: "https://cdn2.thecatapi.com/images/a8i.jpg",
  //     width: 400,
  //     height: 560,
  //   },
  //   {
  //     id: "b2r",
  //     url: "https://cdn2.thecatapi.com/images/b2r.png",
  //     width: 426,
  //     height: 640,
  //   },
  //   {
  //     id: "cdu",
  //     url: "https://cdn2.thecatapi.com/images/cdu.jpg",
  //     width: 500,
  //     height: 325,
  //   },
  //   {
  //     id: "MTg4MzUyOA",
  //     url: "https://cdn2.thecatapi.com/images/MTg4MzUyOA.jpg",
  //     width: 551,
  //     height: 480,
  //   },
  //   {
  //     id: "H_UWbOfra",
  //     url: "https://cdn2.thecatapi.com/images/H_UWbOfra.jpg",
  //     width: 1200,
  //     height: 1200,
  //   },
  //   {
  //     id: "OUfeISEoi",
  //     url: "https://cdn2.thecatapi.com/images/OUfeISEoi.jpg",
  //     width: 1200,
  //     height: 798,
  //   },
  //   {
  //     id: "3Pem6K30P",
  //     url: "https://cdn2.thecatapi.com/images/3Pem6K30P.jpg",
  //     width: 1250,
  //     height: 1387,
  //   },
  // ];

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      // console.log(response);
      const mydata = response.data;

      const newData = mydata.map((item: any) => ({
        height: item.height,
        id: item.id,
        url: item.url,
        width: item.width,
        tag: "Add Tag",
      }));

      setData(newData);
      dispatch(globalData(newData));
    } catch (error) {
      console.error("Error fetching global data:", error);
    }
  };

  const ShowButtons = (id: string) => {
    let res: any = data.find((item: any) => {
      return item.id === id;
    });
    setBtnId((id = res?.id));
    setIsVisible(true);
  };

  const HideButtons = () => {
    setIsVisible(false);
  };

  // const AddToCollection = (id: string) => {
  //   console.log(id);
  // };

  const deleteAnImage = (id: any) => {
    // const reqData = { id: id };
    // console.log(reqData);
    // console.log(id);
    // axios
    //   .delete(`https://api.thecatapi.com/v1/images/${id}`, {
    //     // data: {
    //     //   data: reqData.id,
    //     // },
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "x-api-key":
    //         "live_5iXXTERHMhY9AzaiJ5IL1FazIrixxEqqlcNM8LPNnL0R5bPi6wliZ7HotvR3MGc8",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     const res: any = data.filter((item: any) => item.id !== id);
    //     setData(res);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting image:", error);
    //   });

    let res: any = data.find((item: any) => {
      return item.id === id;
    });
    let result: any = data.filter((item: any) => {
      return item.id !== res.id;
    });
    setData(result);
  };

  const hideDescAsLongDropDownIsTrue = () => {
    if (dropDownSetting) {
      setShowDescSetting(false);
    }
  };

  // to Download the image
  const apiKey =
    "live_5iXXTERHMhY9AzaiJ5IL1FazIrixxEqqlcNM8LPNnL0R5bPi6wliZ7HotvR3MGc8";

  const DownloadImage = async (item: any) => {
    const url = item.url;
    const fileName = url.split("/").pop();

    const imageBlob: any = await fetch(
      url
      // {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     "x-api-key": "live_5iXXTERHMhY9AzaiJ5IL1FazIrixxEqqlcNM8LPNnL0R5bPi6wliZ7HotvR3MGc8",
      //   }
      // }
    )
      .then((response) => response.blob())
      .catch((error) => {
        console.error("Error downloading image:", error);
      });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // console.log(imgTag)
  // dispatch(tags(imgTag));

  // useEffect(() => {
  //   localStorage.setImageTag(JSON.stringify(imgTag));
  // }, [imgTag]);
  const [thatOneImagetoPutTagOn, setThatOneImagetoPutTagOn] = useState("");

  const imageTag = (id: string) => {
    // console.log(id);
    let find: any = data.find((item: any) => {
      return item.id === id;
    });
    setThatOneImagetoPutTagOn(find.id);
  };
  // const [imgTag, setImageTag] = useState([
  //   {
  //     id: "",
  //     tag: "",
  //   },
  // ]);

  const imageTagging = (event: any, item: string) => {
    event.preventDefault();

    // const newObj: any = {
    //   id: thatOneImagetoPutTagOn,
    //   tag: item,
    // };
    // localStorage.setItem("ImagesTag", JSON.stringify(newObj));
    // imgTag.push(newObj);

    const res: any = [
      ...data.map((d) =>
        d.id === thatOneImagetoPutTagOn ? { ...d, tag: item } : d
      ),
    ];
    setData(res);
    dispatch(globalData(res));

    //setImgTag([...imgTag, ...imgTag.map(d => ({ ...d, addTag: item }))])

    // const result:any = imgTag.find((el: any) =>
    //   el.id === thatOneImagetoPutTagOn ? { ...el, tag: item } : el
    // );
    // imgTag.push(result);
    // setImageTag(result);
    // console.log(imgTag);

    // const r:string = imgTag.map(t => { return t.id ===thatOneImagetoPutTagOn ? setAddTag(t.tag)  : setAddTag('Add Tag')} )

    setHideCross(true)
    setShowDropDownTags(false);
    // const value: any = data.map((val) =>
    //   val.id === thatOneImagetoPutTagOn
    //     ? 
    //     : setHideCross(false)
    // );
  };

  const removeTag = (id: string) => {
    const res: any = data.map((item) =>
      item.id === id ? { ...item, tag: "Add Tag" } : item
    );
    setData(res);
    dispatch(globalData(res));
  };

  const [newSize, setNewSize] = useState("large");
  const [changeSizeImgId, setChangeSizeImgId] = useState(null);
  const ResizeImage = (item: any, val: string) => {
    setChangeSizeImgId(item.id);
    console.log(changeSizeImgId);
    setNewSize(val);

    console.log(newSize);
  };

  // const ResizeImageMed = (item:any) => {
  //   const res = data.find(d => d.id === item.id)
  // }

  // const ResizeImageLarge = (item:any) => {
  //   const res = data.find(d => d.id === item.id)
  // }

  return (
    <>
      <TopSection data={data} setData={setData} />
      <div className="p-5 overflow-hidden">
        <div className="container w-[95vw] max-sm:inline ">
          {data.map((item: any) => (
            <div
              key={item.id}
              className={`relative box hover:opacity-85`}
              onMouseOver={() => ShowButtons(item.id)}
              onMouseOut={() => HideButtons()}
            >
              {checkIfTrueOrFalse &&
                tagsImages.map((r: any, index: number) =>
                  r.id === item.id ? (
                    <img
                      key={index}
                      src={r.url}
                      alt=""
                      className={`h-auto w-full image ${
                        changeSizeImgId === item.id ? newSize : ""
                      }`}
                    />
                  ) : (
                    ""
                  )
                )}
              <img
                src={item.url}
                alt=""
                className={`h-auto w-full image ${
                  checkIfTrueOrFalse ? "hidden" : ""
                } ${changeSizeImgId === item.id ? newSize : ""}`}
              />
              {item.id === btnId && isVisible ? (
                <div className="initial">
                  <div className="flex gap-5 absolute top-[20px] right-[20px]">
                    <button
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      className="inline-flex text-center justify-center h-7 w-10 rounded-sm bg-white text-gray-500 items-center font-md shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed opacity-75 hover:opacity-100 hover:text-text-slate-800 "
                      type="button"
                      onMouseOver={() => setShowDescSetting(true)}
                      onMouseOut={() => setShowDescSetting(false)}
                      onClick={() => {
                        setDropDownSetting(!dropDownSetting);
                        hideDescAsLongDropDownIsTrue();
                      }}
                    >
                      {showDescSetting ? (
                        <div className=" text-black text-xs bg-white absolute top-[30px] w-14 mr-6">
                          Setting
                        </div>
                      ) : (
                        ""
                      )}
                      <AiOutlineSetting />
                    </button>

                    {/* <!-- Dropdown menu --> */}
                    {dropDownSetting ? (
                      <div
                        id="dropdown"
                        className=" absolute top-8 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-24 dark:bg-gray-700"
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li>
                            <button
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => ResizeImage(item, "small")}
                            >
                              Small
                            </button>
                          </li>
                          <li>
                            <button
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => ResizeImage(item, "medium")}
                            >
                              Medium
                            </button>
                          </li>
                          <li>
                            <button
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => ResizeImage(item, "large")}
                            >
                              Large
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}

                    <Link
                      to="/Collections"
                      className="flex text-center h-7 w-10 rounded-sm bg-white text-gray-500 justify-center items-center font-md shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed opacity-75 hover:opacity-100 hover:text-text-slate-800"
                      onMouseOver={() => setShowDescCol(true)}
                      onMouseOut={() => setShowDescCol(false)}
                      onClick={() => dispatch(addingImageToCollection(item))}
                    >
                      {showDescCol ? (
                        <div className=" text-black text-xs bg-white absolute top-[30px] w-24 mr-6">
                          Add to Collection
                        </div>
                      ) : (
                        ""
                      )}
                      <AiOutlinePlus />
                    </Link>
                  </div>

                  <div className="flex justify-between items-center w-[87%]  gap-5 absolute bottom-[20px] right-[20px]">
                    <div className="">
                      <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="text-xs font-semibold left-0 text-white bg-gray-400 p-2 rounded-sm rounded-lg text-sm py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={() => {
                          setShowDropDownTags(!showDropDownTags);
                          imageTag(item.id);
                        }}
                      >
                        <div className="flex items-center gap-2 ">
                          {item.tag}

                          {/* {thatOneImagetoPutTagOn === item.id ?  */}
                          <RxCross2
                            className={` text-md font-semibold ${
                              hideCross && item.id === thatOneImagetoPutTagOn ? "" : "hidden"
                            }`}
                            onClick={() => {
                              setHideCross(false);
                              removeTag(item.id);
                            }}
                          />
                          {/* :  }  */}
                        </div>
                      </button>

                      {/* <!--Tags Dropdown menu --> */}

                      {showDropDownTags &&
                      thatOneImagetoPutTagOn === item.id ? (
                        <div
                          id="dropdown"
                          className="z-10 absolute opacity-100 bottom-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200 "
                            aria-labelledby="dropdownDefaultButton"
                          >
                            {arrayOfTags.map((item: string, index: number) => (
                              <li
                                className="flex justify-between items-center hover:bg-gray-100 z-100"
                                key={index}
                                onClick={(e) => imageTagging(e, item)}
                              >
                                <a href="#" className="block px-4 py-2  ">
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        " "
                      )}
                    </div>

                    <div className="flex gap-5">
                      <button
                        className="flex text-center h-7 w-10 rounded-sm bg-white text-gray-500 justify-center items-center font-md shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed opacity-75 hover:opacity-100 hover:text-text-slate-800"
                        onMouseOver={() => setShowDescDownload(true)}
                        onMouseOut={() => setShowDescDownload(false)}
                        onClick={() => DownloadImage(item)}
                      >
                        {showDescDownload ? (
                          <div className=" text-black text-xs bg-white absolute top-[32px] w-14 mr-6">
                            Download
                          </div>
                        ) : (
                          ""
                        )}
                        <AiOutlineArrowDown />
                      </button>
                      <button
                        className={`flex text-center h-7 w-10 rounded-sm bg-white text-gray-500 justify-center items-center font-md shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed opacity-75 hover:opacity-100 hover:text-text-slate-800 `}
                        onMouseOver={() => setShowDescDel(true)}
                        onMouseOut={() => setShowDescDel(false)}
                        onClick={() => deleteAnImage(item.id)}
                      >
                        {showDescDel ? (
                          <div className=" text-black text-xs bg-white absolute top-[32px] w-14 mr-6">
                            Delete
                          </div>
                        ) : (
                          ""
                        )}
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                " "
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
