
const Content = ({ category_id, thread_id, comment_id }) =>
    <div>
        <h1>Content</h1>
        { category_id && <p>Showing category: {category_id}</p> }
        { thread_id && <p>Showing thread: {thread_id}</p> }
        { comment_id && <p>Showing comment: {comment_id}</p> }
    </div>

export default Content;
