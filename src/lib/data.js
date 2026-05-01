export const getAllBooks=async()=>{
    const res =await fetch("https://book-hunt-omega.vercel.app/data.json")
    const data=res.json();
    return data;
}