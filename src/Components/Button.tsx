import React from "react";
import {
  AiOutlineArrowDown,
  AiFillDelete,
  AiOutlinePlus,
  AiOutlineSetting,
} from "react-icons/ai";


const icons = {
  'add' : {AiOutlinePlus} ,
  'delete' : AiFillDelete ,
  'setting' : AiOutlineSetting ,
  'download' : AiOutlineArrowDown

}

function Button({...props}) {
  console.log(props)
  return (
    <button
      className="flex text-center h-7 w-10 rounded-lg bg-white text-gray-500 justify-center items-center font-md shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
       {...props.icon}
    />
  );
}

export default Button;
