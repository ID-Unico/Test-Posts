
import './styles.css'

export const PostCard = ({title, body, id, cover}) => (
        <div className='post'>
            <img src={cover} alt={title} />
            <div className='postcontent'>
                <h1>{title}</h1>
                <h2>{id}</h2>
                <p>{body}</p>
            </div>
        </div>
    );
