import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import connectToDB from '@utils/database';
import User from '@models/user';

console.log({
    clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
});
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackUr:'http://localhost:3001',
            profile(profile){
                return{
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
        })
    ],
    callbacks:{
        
        async signIn({account,profile}){
            try{
            
                await connectToDB();
                const userExits = await User.findOne({email:profile.email});
                if(!userExits){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })
                }
                return true;
            }catch(error){
                console.log('error');
                return false;
            }
        }
    }
    
})


export {handler as GET, handler as POST};