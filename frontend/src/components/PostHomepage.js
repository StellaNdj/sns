const PostHomepage = ({children}) => {

  return (
    <div className="post-card">
      <div className='avatar-date'>
      </div>
      <p className="post-content">{children}</p>
    </div>
  )
}

export default PostHomepage;
