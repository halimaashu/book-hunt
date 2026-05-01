export const getAllBooks=async()=>{
    const res =await fetch("https://book-hunt-omega.vercel.app/data.json")
    const data=await res.json();
    // console.log(data,"from lib folder")
    return data;
}
// getAllBooks()