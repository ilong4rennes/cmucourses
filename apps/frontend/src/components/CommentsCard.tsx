import React, { useState, ChangeEvent, FormEvent } from "react";

interface Comment {
  id: number;
  userName: string;
  comment: string;
  date: string;
}

const CommentsCard: React.FC = () => {
  // Initial dummy comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      userName: "username",
      comment: "Excellent course!",
      date: "2025-01-20",
    },
  ]);

  // State for new comment inputs
  const [newComment, setNewComment] = useState<string>("");

  // Handler for input change
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  // Handler for form submission
  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    const newEntry: Comment = {
      id: comments.length + 1,
      userName: "Current User", // Placeholder for the current user's name
      comment: newComment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    // Add the new comment to the top of the list
    setComments([newEntry, ...comments]);

    // Reset the input field
    setNewComment("");
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Comment List */}
      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-medium">{comment.userName}</span>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="mt-2">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Your Comment
          </label>
          <textarea
            id="comment"
            rows={3}
            value={newComment}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            placeholder="Write your comment here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentsCard;
