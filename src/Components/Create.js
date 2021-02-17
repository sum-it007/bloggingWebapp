import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author,setAuthor] = useState('')
    const [isLoading,setIsLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title,body,author}

        setIsLoading(true);
        fetch('http://localhost:5000/blogs',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(blog)
        }).then(()=>{
            console.log('New blog added')
            setIsLoading(false)
            history.push('/')
        })
    }
    return ( 
        <div className="create">
            <h2>Add new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title 
                    <input type="text" required value={title}
                    onChange={(e)=>setTitle(e.target.value)}/>
                </label>

                <label>Blog Body 
                    <textarea required value={body}
                    onChange={(e)=>setBody(e.target.value)}/>
                </label>

                <label>Blog author 
                    <input type="text" required value={author}
                    onChange={(e)=>setAuthor(e.target.value)}/>
                </label>
                {!isLoading&&<button>Add blog</button>}
                {isLoading&&<button disabled>Adding blog ... </button>}
            </form>
        </div>
     );
}
 
export default Create;