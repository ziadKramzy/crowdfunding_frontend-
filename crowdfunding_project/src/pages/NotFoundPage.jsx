import { Link } from "react-router-dom"

 const NotFoundPage =()=> {
  return (
    <>
    <div className=''>
        <h3 className='py-5'>Not found Content</h3>
        <p className='mb-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores explicabo nobis laborum ipsa, ullam animi magni similique quos adipisci dolorem!</p>
               <Link className='ms-3' to={'/'}>back to home</Link>

    </div>
 

    </>
  )
}

export default NotFoundPage