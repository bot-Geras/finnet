
import { useState } from 'react';
import type { CreatePostInput } from '../types';

interface CreatePostFormProps {
  onSubmit: (post: CreatePostInput) => void;
  isDarkMode: boolean;
}

export default function CreatePostForm({ onSubmit, isDarkMode }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    
    setIsSubmitting(true);
    await onSubmit({ title: title.trim(), body: body.trim() });
    setTitle('');
    setBody('');
    setIsSubmitting(false);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-5 rounded-3xl shadow-xl p-7 mb-7 border transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Create New Post</h3>
      </div>

      <div>
        <label 
          htmlFor="post-title" 
          className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
        >
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 text-base ${
            isDarkMode
              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
              : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500'
          }`}
          placeholder="What's on your mind?"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label 
          htmlFor="post-body" 
          className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
        >
          Content
        </label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 text-base resize-none min-h-[140px] ${
            isDarkMode
              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
              : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500'
          }`}
          placeholder="Share your thoughts..."
          required
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-2 ${
          isDarkMode ? 'shadow-blue-900/20 hover:shadow-blue-900/30' : 'shadow-blue-200 hover:shadow-blue-300'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"></div>
            Creating...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Post
          </>
        )}
      </button>
    </form>
  );
}
