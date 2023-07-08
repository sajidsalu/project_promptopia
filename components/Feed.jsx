"use client";
import React,{useState,useEffect} from 'react';
import PromptCard from './PromptCard';

const Feed = () => {
  const [posts,setPost]=useState([]);
  const [search,setSearch] = useState('');
  const handleSearchChange=(e)=>{

  }

  useEffect(()=>{
    const fetchPost = async()=>{
      const res=await fetch('/api/prompt');
      const data = await res.json();
      setPost(data);
    }
    fetchPost();
  },[])
 
  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='search'
          value={search}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={posts} handleTagClick={()=>{}}/>
    </section>
  )
}

const PromptCardList = ({data,handleTagClick})=>{
 return  <div className='mt-16 prompt_layout'>
    {data.map((post,index)=>(
      <PromptCard 
          key={index} 
          post={post}
          handleTagClick={handleTagClick}  />
    ))}
  </div>
}

export default Feed