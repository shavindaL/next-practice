"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios'

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);


  const { mutate } = useMutation(
    async (title: string)=> await axios.post('api/posts/addPost', { title }),
    {onError:(error)=>{
      console.log(error);
      
    }, onSuccess: (data)=>{
      setTitle('')
      setIsDisabled(false)
    }})
  
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate(title)
  }
  return (
    <form onSubmit={submitPost}>
      <div className="flex flex-col my-4 bg-white p-8 rounded-md">
        <textarea
          name="tile"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Whats on your mind"
          className="p-4 text-lg rounded-md my-2 bg-gray-300"
        ></textarea>
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-bold text-sm ${title.length > 300 ? "text-red-600" : "text-gray-600"
              }`}
          >{`${title.length}/300`}</p>
          <button
            disabled={isDisabled}
            className="text-sm bg-teal-500 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </div>
    </form>
  );
}
