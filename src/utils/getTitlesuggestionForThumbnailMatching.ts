import { getSearchKeywordThumbnailPrompt } from "@/constants";
import axios from "axios";

export default async function getTitlesuggestionForThumbnailMatching(title:string){
    try {
        const prompt = getSearchKeywordThumbnailPrompt(title);

         const {data} = await axios.post("https://api.cohere.ai/v1/generate", {
         
                model: "command", // or use "command-light"
                prompt,
                max_tokens: 500,
                temperature: 0.7,
            },{
                 headers: {
                    Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
                    "Content-Type": "application/json",
                }
            });

            const textResponse=data?.generations?.[0]?.text;

            if(!textResponse)return null;
            const jsonResponse=JSON.parse(textResponse.trim());
            
            return jsonResponse.searchKeyword;
    } catch (error) {
        console.log('Error whiel generating searchKeyword from cohere');
        return null;
    }
}   