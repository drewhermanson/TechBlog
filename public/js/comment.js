const commentFormHandler = async (event) => {
    event.preventDefault();
    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = event.target.getAttribute('data-post-id');
    if (comment_text) {
        const response = await fetch(`/api/comments/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment');
        }
    } 
}  


document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);