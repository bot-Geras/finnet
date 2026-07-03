
import type { Post } from '../types';

interface PostDetailsProps {
  post: Post;
  onBack: () => void;
  isDarkMode: boolean;
}

export default function PostDetails({ post, onBack, isDarkMode }: PostDetailsProps) {
  return (
    <div className={`flex flex-col h-full p-5 overflow-y-auto transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-l border-slate-700' : 'bg-white border-l border-slate-200'}`}>
      <button
        onClick={onBack}
        className={`flex items-center gap-2 mb-4 self-start px-3 py-1.5 rounded-lg transition-colors duration-200 text-sm ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Posts
      </button>

      <article className="flex-1">
        <h1 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{post.title}</h1>
        <div className={`text-xs mb-4 opacity-70 ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>{post.body}</p>
      </article>
    </div>
  );
}
