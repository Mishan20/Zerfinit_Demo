// import { RedisRepositoryImpl} from "../../frameworks/database/redis/redisCacheRepository"

// export const cacheRepositoryInterface=(repository:ReturnType<R>)=>{

//     const setCache = async(cachingOptions:{
//         key: string;
//         expireTimeSec: number;
//         data: string;
//       })=>await repository.setCache(cachingOptions)

//     const clearCache = async(key:string)=> await repository.clearCache(key)

//     return {
//         setCache,
//         clearCache
//     }

// }

// export type CacheRepositoryInterface = typeof cacheRepositoryInterface