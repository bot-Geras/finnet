
import type { Post } from '../types';
import CreatePostForm from './CreatePostForm';
import { PostsSkeleton, CreatePostFormSkeleton } from './Skeletons';

interface UserPostsProps {
  userName: string;
  posts: Post[];
  onCreatePost: (post: { title: string; body: string }) => void;
  loadingPosts: boolean;
  errorPosts: string | null;
  isDarkMode: boolean;
  isCreatePostPending: boolean;
}

export default function UserPosts({ userName, posts, onCreatePost, loadingPosts, errorPosts, isDarkMode, isCreatePostPending }: UserPostsProps) {
  return (
    <section className="flex-1" aria-label={`${userName}'s posts`}>
      {/* User Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg" aria-hidden="true">
            {userName.charAt(0)}
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{userName}'s Posts</h2>
          </div>
        </div>
        <p className={`ml-18 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
      </div>

      {/* Error Message */}
      {errorPosts && (
        <div className={`border px-6 py-4 rounded-2xl mb-6 flex items-center gap-3 shadow-sm transition-colors duration-300 ${
          isDarkMode ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`} role="alert">
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{errorPosts}</span>
        </div>
      )}

      {/* Create Post Form */}
      {isCreatePostPending ? (
        <CreatePostFormSkeleton />
      ) : (
        <CreatePostForm onSubmit={onCreatePost} isDarkMode={isDarkMode} />
      )}

      {/* Loading Posts */}
      {loadingPosts ? (
        <PostsSkeleton />
      ) : (
        <div className="space-y-5">
          {posts.length === 0 ? (
            <div className={`rounded-3xl shadow-xl p-12 text-center transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
            }`}>
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>No posts yet</h3>
              <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Create the first post for {userName}!</p>
            </div>
          ) : (
            posts.map((post) => (
              <article 
                key={post.id} 
                className={`rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600' 
                    : 'bg-white border-slate-100'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{post.title}</h3>
                <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{post.body}</p>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} at {new Date(post.createdAt).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </time>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}
