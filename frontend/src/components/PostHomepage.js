const PostHomepage = ({firstName, lastName, children}) => {

  return (
    <div className="post-card">
      <div className='avatar-logo'>
        {firstName.charAt(0)} {lastName.charAt(0)}
      </div>
      <p className="post-content">{children}</p>
    </div>
  )
}

export default PostHomepage;
