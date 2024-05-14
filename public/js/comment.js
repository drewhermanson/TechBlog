const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = event.target.querySelector('#comment-text').value.trim();
    const blog_id = event.target.closest('.blog.card').getAttribute('data-post-id');
    console.log(blog_id);
    console.log(content);

  
    if (content) {
      const response = await fetch('/api/users/comments', {
        method: 'POST',
        body: JSON.stringify({ content, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  }

const createBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    const response = await fetch(`/api/users/blogs`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }

const blogForm = document.querySelector('.create-form');
if (blogForm) {
    blogForm.addEventListener('submit', createBlogHandler);
}

document.querySelectorAll('.blog.card').forEach((blogCard) => {
  blogCard.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
});

