
import type { Post } from '../types';
import { PostsSkeleton } from './Skeletons';

interface UserPostsProps {
  userName: string;
  posts: Post[];
  loadingPosts: boolean;
  errorPosts: string | null;
  isDarkMode: boolean;
  selectedPostId: number | null;
  onSelectPost: (post: Post) => void;
  onCreatePostClick: () => void;
  isPlaceholderData?: boolean;
}

export default function UserPosts({ userName, posts, loadingPosts, errorPosts, isDarkMode, selectedPostId, onSelectPost, onCreatePostClick, isPlaceholderData = false }: UserPostsProps) {
  return (
    <div className={`flex flex-col h-full border-r transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h2 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{userName}'s Posts</h2>
            {isPlaceholderData && (
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            )}
          </div>
          <button
            onClick={onCreatePostClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            disabled={isPlaceholderData}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New
          </button>
        </div>
        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
      </div>

      {/* Error Message */}
      {errorPosts && (
        <div className={`p-4 border-b transition-colors duration-300 ${isDarkMode ? 'bg-red-900/20 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-sm">{errorPosts}</span>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="flex-1 overflow-y-auto">
        {loadingPosts ? (
          <div className="p-4">
            <PostsSkeleton />
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>No posts yet</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Create your first post!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => onSelectPost(post)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectPost(post)
                  }
                }}
                className={`w-full text-left p-4 transition-all duration-200 border-l-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 ${
                  selectedPostId === post.id 
                    ? (isDarkMode ? 'bg-blue-900/30 border-blue-500' : 'bg-blue-50 border-blue-500') 
                    : (isDarkMode ? 'border-transparent' : 'border-transparent')
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-2">
                    <h3 className={`font-semibold mb-1.5 line-clamp-2 text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{post.title}</h3>
                    <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{post.body}</p>
                    <div className={`text-[10px] opacity-70 ${isDarkMode ? 'text-slate-300' : 'text-slate-400'}`}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  {selectedPostId === post.id && (
                    <svg className="w-4 h-4 flex-shrink-0 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
