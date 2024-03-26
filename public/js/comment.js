const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value.trim();
    const blog_id = document.querySelector('#comment-blog-id').value.trim();
  
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

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);

