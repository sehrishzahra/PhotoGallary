import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import image from "../assets/photo-background.avif";
import { addItem } from "../store/slices/CollectionSlice";
import { BiWindowOpen } from "react-icons/bi";
import { removingImageToCollection } from "../store/slices/CollectionImage";

const getDataFromLS = () => {
  const data = localStorage.getItem("Collection_Created");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function Collection() {
  const [showInput, setShowInput] = useState(false);

  // getting dispatched image from home page which i gonna add to collection
  const imagecol: any = useSelector((state: any) => state.CollectionImgData);
  console.log(imagecol);

  const [collectionName, setcollectionName] = useState<string[]>([""]);
  const dispatch = useDispatch();

  interface ColData {
    id: number;
    images: any[];
    colName: string;
    count: number;
  }
  const [collectionData, setCollectionData] = useState<ColData[]>(
    getDataFromLS()
  );

  // const [collectionData , setCollectionData] = useState<{id : number , img : string , colName : string , count : number}>({
  //   id: 0,
  //   img : '' ,
  //   colName : '' ,
  //   count :0
  // })

  // const savedData = localStorage.getItem('abcdefg');
  // const [data, setData] = useState(savedData ? JSON.parse(savedData) : '[]');

  // useEffect(() => {
  //   try {
  //     const data = window.localStorage.getItem('Collection_Created');
  //     if (data !== null) {
  //       setCollectionData(JSON.parse(data));
  //     }
  //   } catch (error) {
  //     console.error('Error parsing data from local storage:', error);
  //   }
  // }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "Collection_Created",
      JSON.stringify(collectionData)
    );
  }, [collectionData]);

  // const arrayOfColl = [
  //   {
  //     id: 0,
  //     image: image,
  //     colName: "My Collection",
  //     count: 1,
  //   },
  //   {
  //     id: 0,
  //     img: image,
  //     colName: "My Collection",
  //     count: 1,
  //   },
  // ];

  // console.log(collectionName);
  // let count: any = useSelector((state) => state);
  // console.log(count);
  // console.log(props.id);

  //   const dispatch = useDispatch();
  //   window.onload = function() {
  //     localStorage.setItem("name", $('#inputName').val());
  //     localStorage.setItem("email", $('#inputEmail').val());
  // }

  // to store images in a collection

  const [collectionImages, setCollectionImages] = useState<string[]>([]);

  const [currentImgId, setCurrentImgId] = useState(0);

  const addItemToCollectionList = (e: any) => {
    e.preventDefault();

    setShowInput(false);
    const imgdata: string = imagecol[0].url;
    // const url:string = imgdata.url
    // console.log(url)
    collectionImages.push(imgdata);
    setCollectionImages(collectionImages);
    // setCollectionImages([...collectionImages , imgdata ])
    //   setMyData(myData.map(
    //     el => el.id === postId ? { ...el, title: title } : el
    // ))
    // const newData = imgdata.map((item: any) => ({
    //   height: item.height,
    //   id: item.id,
    //   url: item.url,
    //   width: item.width
    // }));
    //  const len =  collectionData.find(item => {
    //   let res ;
    //     if(item.id === currentImgId){
    //     res = (item.image.length)
    //     } else {
    //      res = item
    //     }
    //     return res
    //   })

    // console.log(len)
    let id = collectionData.length;
    const obj: any = {
      id: id,
      images: [imgdata],
      colName: collectionName,
      count: 0,
    };
    id += 1;
    collectionData.push(obj);
    setCollectionData([...collectionData]);
  };

  const [imgId, setImgId] = useState(0);
  const [showDropDownCollection, setShowDropDownCollection] = useState(false);

  const ShowDropDown = (id: number) => {
    setShowDropDownCollection(!showDropDownCollection);
    collectionData.find((item: any) => {
      return item.id === id ? setImgId(id) : "";
    });
  };

  const DeleteCollection = (id: number) => {
    const res = collectionData.filter((item: any) => item.id !== id);
    setCollectionData(res);
  };

  const AddMoreImagesToCollection = (key: number) => {
    setCurrentImgId(key);
    const imgdata = imagecol[0].url;
    var res: any;

    collectionData.map((data) => {
      if (data.id === key) {
        if (data.images.map((img) => img !== imgdata)) {
          console.log("executing...", imgdata);
          res = collectionData.map((item: any) =>
            item.id === key
              ? {
                  ...item,
                  images: [imgdata, ...item.images],
                  count: item.images.length,
                }
              : console.log("error")
          )
        } else {
          console.log("Image already exists");
        }
      }
    });
    setCollectionData(res);
    dispatch(removingImageToCollection(imgdata));
  };

  return (
    <div className="p-10">
      <div className="pb-10 underline underline-offset-[8px]">
        <h1 className="text-3xl font-semibold tracking-wide text-black  ">
          My
          <span className="font-normal tracking-[.4rem] text-gray-800">
            Collections
          </span>
        </h1>
      </div>
      <div className="">
        <div className="flex gap-2">
          <h2>Create New Collection</h2>
         
          <button
            className="flex text-center h-7 w-10 rounded-sm bg-white text-gray-500 justify-center items-center font-md shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed opacity-75 hover:opacity-100 hover:text-text-slate-800"
            onClick={() => setShowInput(true)}
          >
            <AiOutlinePlus />
          </button>

        
        </div>
      </div>
      <h3 className="mt-5 text-md font-semibold">Collection Lists </h3>
      {collectionData.map((item) => (
        <div className="mt-5" key={item.id}>
          <div className="flex justify-between w-full items-center">
            <div className="flex  gap-8 items-center">
              <button
                onClick={() => {
                  ShowDropDown(item.id);
                }}
              >
                <div className="p-3 flex gap-10 items-center text-md justify-center border rounded-md text-slate-600 hover:bg-slate-100">
                  {item.colName}
                </div>
              </button>
              <div className="">
                <button
                  className="p-2 flex gap-10 items-center text-md justify-center border rounded-md text-slate-600 hover:bg-slate-100"
                  onClick={() => AddMoreImagesToCollection(item.id)}
                >
                  Add More Images
                </button>
              </div>

              <span className="text-slate-400 text-sm">
                {item.count > 1 ? (
                  <div className="flex gap-5">Images {item.count + 1}</div>
                ) : (
                  <div className="flex gap-5">Image{item.count + 1}</div>
                )}
              </span>
            </div>

            <button
              className="p-3 flex gap-10 items-center text-md justify-center border rounded-md text-slate-600 hover:bg-slate-100"
              onClick={() => DeleteCollection(item.id)}
            >
              Delete
            </button>
          </div>
          {imgId === item.id ? (
            <div
              className={`relative overflow-x-auto flex-col w-full flex gap-5 border mt-5 border ${
                showDropDownCollection ? "" : "hidden"
              }`}
            >
              <div className="fixed px-5 py-2">
                <p className="font-medium">{item.colName}</p>
                <p className="font-light text-sm flex gap-5">Images {item.count + 1}</p>
              </div>

              <div className="flex gap-3 w-max h-80">
                {item.images.map((img: string, index: number) => (
                  <div
                    className="flex p-2 w-auto items-center gap-5 mt-14"
                    key={index}
                  >
                    {item.id === imgId ? (
                      <img src={img} alt="" className="w-auto h-[100%]" />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}

      <div className="w-full h-full flex items-center justify-center  ">
        <div
          className={`bg-gray-200 text-center h-20 my-24 mx-18 flex items-center rounded-md ${
            collectionData.length < 1 ? "" : "hidden"
          }`}
        >
          <div className="w-60"> No Collection Created </div>
        </div>
      </div>

      <CollectionModal
        showInput={showInput}
        setShowInput={setShowInput}
        setcollectionName={setcollectionName}
        collectionName={collectionName}
        collectionData={collectionData}
        addItemToCollectionList={addItemToCollectionList}
        setCollectionData={setCollectionData}
      />
    </div>
  );
}

export default Collection;

function CollectionModal(props: any) {
  return (
    <div
      className={`grid place-items-center fixed items-center h-[100%] top-[0] left-[0] w-[100%] ${
        props.showInput ? "" : "hidden"
      }`}
      style={{
        zIndex: "9999",
        overflow: "auto",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="relative bg-white flex flex-col items-center justify-center gap-10 h-80 w-96 rounded-lg  p-10">
        <RxCross2
          className="absolute right-[10px] top-[10px] text-[1.5rem]"
          onClick={() => props.setShowInput(false)}
        />
        <div className="flex flex-col items-center text-center">
          <label
            htmlFor="collectionName"
            className="text-lg text-center font-semibold"
          >
            Collection Name:
          </label>
          <input
            className="border rounded h-10 p-3 mt-8"
            type="text"
            name=""
            id="collectionName"
            onChange={(e) => props.setcollectionName(e.target.value)}
          />
        </div>
        <button
          className="w-24 p-2 rounded-md bg-gray-500 text-white opacity-75 hover:opacity-100 p-2 shadow-lg"
          onClick={(e) => {
            props.addItemToCollectionList(e);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
