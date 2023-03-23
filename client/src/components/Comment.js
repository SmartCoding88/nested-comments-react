import { IconBtn } from "./IconBtn";
import { FaHeart, FaReply, FaTrash, FaEdit } from "react-icons/fa"
import { CommentList } from "./CommentList";
import { useState } from "react";
import { usePost } from "../contexts/PostContext";
import { CommentForm } from "./CommentForm";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment } from "../services/comments";


const dateFormatter = new Intl.DateTimeFormat(undefined,{
    dateStyle: "medium",
    timeStyle: "short"
});
export function Comment({id, message, user, createdAt}){
    const {post, getReplies, createLocalComment } = usePost()
    const childComments = getReplies(id)
    const [areChildrenHidden, setAreChildrenHidden] = useState(false)
    const [isReplying, setIsReplying] = useState(false)

    const createCommentFn = useAsyncFn(createComment)

    function onCommentReply(message){
      return createCommentFn.execute({postId: post.id, message, parentId: id}).then(comment=>{
        setIsReplying(false)
        createLocalComment(comment)
      })
    }

    return <>
        <div className="comment">
            <div className="header">
                <span className="name">{user.name}</span>
                <span className="date">{dateFormatter.format(Date.parse(createdAt))}</span>
            </div>
            <div className="message">{message}</div>
            <div className="footer">
                <IconBtn Icon={FaHeart} aria-label="Like">2</IconBtn>
                <IconBtn 
                onClick={()=>setIsReplying(prev=> !prev)} 
                isActive={isReplying}
                Icon={FaReply} 
                aria-label={isReplying ? "Cancel Reply" : "Reply" }
                />
                <IconBtn Icon={FaEdit} aria-label="Edit" />
                <IconBtn Icon={FaTrash} aria-label="Delete" color="danger" />
            </div>
        </div>
        {isReplying && (
          <div className="mt-1 ml-3">
            <CommentForm autoFocus 
            onSubmit={onCommentReply} 
            loading={createCommentFn.loading}
            error={createCommentFn.error} 
            />
          </div>
        )}
        {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
}