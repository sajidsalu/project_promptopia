import connetToDB from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request)=>{
    try{
        await connetToDB();
        const prompts = await Prompt.find({}).populate('creator');
        console.log('PROMPTS',prompts);
        return new Response(JSON.stringify(prompts),{status:200});
    }catch(e){
        console.log('errr',e);
        return new Response('Failed to fetch all',{status:500});
    }
}