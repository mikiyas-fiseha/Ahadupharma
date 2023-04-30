
import { Link } from 'react-router-dom'
import blog1 from '../components/images/blog-1.jpg'
const BlogCard = (props) => {
    const {id, title, description,createdAt,image}=props

    
    
    return (
       
            <div className="blog-card">
                <div className="blog-image">
                    <img src={image} className="img-fluid w-100" alt="blog" />
                </div>
                <div className="blog-content">
                    <p className="date">{createdAt}</p>
                    <h5 className="title">{title}</h5>
                    <p className="desc"
                     dangerouslySetInnerHTML={{__html:description?.substr(0,100)+"..."}}>

                    </p>
                    <Link to={`/blog/${id}`} className="button">
                        Read More
                    </Link>
                </div>
            </div>
       
    )
}
export default BlogCard