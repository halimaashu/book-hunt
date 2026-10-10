export const getAllBooks=async()=>{
    // http://localhost:5000/books
    // const res =await fetch("https://book-hunt-omega.vercel.app/data.json")
    const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}books`)
    const data=await res.json();
    // console.log(data,"from lib folder")
    return data;
}
export const getAllReview=async()=>{
    const res =await fetch("https://book-hunt-omega.vercel.app/review.json")
    const data=await res.json();
    // console.log(data,"from lib folder---------------------------------------------------------------")
    return data;
}
// getAllReview()