import axiosConfig from "../configs/axios.config.js";


function phoneRecommender(preferences){
    try{
        const respone=axiosConfig.post("/recommend", { preferences });
        return respone;
    }catch(err){
        console.log(err?.message||"An error occurred while recommending phones")
    }
}

export {phoneRecommender};