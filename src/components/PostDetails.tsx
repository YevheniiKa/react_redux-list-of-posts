import { Loader } from './Loader';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { delComment } from '../features/comments';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useState } from 'react';

export const PostDetails = ({}) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const { comments, loading, error } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  const selectedPostId = useAppSelector(state => state.post);
  const posts = useAppSelector(state => state.posts.posts);
  const post = posts.find(p => p.id === selectedPostId) as Post;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => dispatch(delComment(comment.id))}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loading && !error && !isOpenForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              setIsOpenForm(c => !c);
            }}
          >
            Write a comment
          </button>
        )}

        {isOpenForm && <NewCommentForm />}
      </div>
    </div>
  );
};
