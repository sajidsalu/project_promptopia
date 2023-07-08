'use client';

import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = ()=>{
    const [posts,setPosts]=useState([]);

    const {data: session} = useSession();

    useEffect(()=>{
        const fetchPost = async()=>{
          const res=await fetch(`/api/users/${session?.user.id}`);
          const data = await res.json();
          setPosts(data);
        }
        if(session?.user.id)fetchPost();
      },[])
    const handleEdit=()=>{

    }
    const handleDelete = async()=>{

    }
    return (
        <Profile
            name="My" 
            des="Welcome to your profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        
        />
    )
}

export default MyProfile;