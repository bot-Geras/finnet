
import { useState } from 'react';
import type { CreatePostInput } from '../types';

interface CreatePostFormProps {
  onSubmit: (post: CreatePostInput) => void;
  isDarkMode: boolean;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function CreatePostForm({ onSubmit, isDarkMode, onCancel, isSubmitting }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    await onSubmit({ title: title.trim(), body: body.trim() });
    setTitle('');
    setBody('');
  };

  return (
    <div className={`flex flex-col h-full p-5 overflow-y-auto transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-l border-slate-700' : 'bg-white border-l border-slate-200'}`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Create New Post</h2>
        <button
          onClick={onCancel}
          className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="post-title"
            className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
          >
            Post Title
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-all duration-200 text-sm ${
              isDarkMode
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500'
            }`}
            placeholder="What's your post title?"
            required
            disabled={isSubmitting}
            aria-required="true"
          />
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label
            htmlFor="post-body"
            className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
          >
            Post Content
          </label>
          <textarea
            id="post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={`w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-all duration-200 text-sm resize-none flex-1 ${
              isDarkMode
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500'
            }`}
            placeholder="Write your post content here..."
            required
            disabled={isSubmitting}
            aria-required="true"
            rows={8}
          />
        </div>

        <div className="flex gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-200 ${
              isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                Creating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Publish
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
