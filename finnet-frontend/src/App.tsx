
import { useState } from 'react';
import './App.css';
import UsersList from './components/UsersList';
import UserPosts from './components/UserPosts';
import CreatePostForm from './components/CreatePostForm';
import PostDetails from './components/PostDetails';
import { useUsers, useUserPosts, useCreatePost } from './hooks/useUsers';
import type { Post } from './types';

type ViewMode = 'create' | 'details' | null;

type UserPostsResponse = {
  posts: Post[];
  user: {
    name: string;
  };
};

function App() {
 
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(null);

  const { data: users, isLoading: loadingUsers, error: errorUsers, refetch: refetchUsers } = useUsers();
  const {
    data: postsDataRaw,
    isLoading: loadingPosts,
    error: errorPosts,
    isPlaceholderData,
  } = useUserPosts(selectedUserId);
  const postsData = postsDataRaw as UserPostsResponse | undefined;
  const createPostMutation = useCreatePost();

  const posts = postsData?.posts || [];
  const userName = postsData?.user?.name || '';

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    setSelectedPost(null);
    setViewMode(null);
    setSuccessMessage(null);
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setViewMode('details');
  };

  const handleCreatePostClick = () => {
    setSelectedPost(null);
    setViewMode('create');
  };

  const handleCancelCreate = () => {
    setViewMode(null);
    if (posts.length > 0) {
      setSelectedPost(posts[0]);
      setViewMode('details');
    }
  };

  const handleBackFromDetails = () => {
    setSelectedPost(null);
    setViewMode(null);
  };

  const handleCreatePost = async (postData: { title: string; body: string }) => {
    if (!selectedUserId) return;
    try {
      await createPostMutation.mutateAsync({ userId: selectedUserId, post: postData });
      setSuccessMessage('Post created successfully!');
      setViewMode(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const bgClass = isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100';
  const headerClass = isDarkMode ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-600 to-blue-700';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${bgClass}`}>
      {/* Header */}
      <header className={`transition-colors duration-300 ${headerClass} text-white shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-lg font-semibold">FinnetTrust</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Success Notification */}
      {successMessage && (
        <div className="fixed top-16 right-4 z-50 bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
          <svg className="w-4.5 h-4.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium text-sm">{successMessage}</span>
        </div>
      )}

      {/* Main Content - Responsive Layout */}
      <main className="flex-1 flex w-full mx-auto overflow-hidden">
        {/* Mobile Layout: Single Panel with Navigation */}
        {/* Desktop Layout: Three Panels */}
        
        {/* Left Panel: Users List */}
        <div className={`shrink-0 ${
          selectedUserId && (selectedPost || viewMode === 'create') 
            ? 'hidden lg:block' 
            : 'w-full lg:w-72'
        }`}>
          <UsersList
            users={users || []}
            selectedUserId={selectedUserId}
            onSelectUser={handleSelectUser}
            isDarkMode={isDarkMode}
            isLoading={loadingUsers}
            error={errorUsers ? (errorUsers as Error).message : null}
            onRetry={refetchUsers}
          />
        </div>

        {/* Middle Panel: Posts List */}
        <div className={`${
          !selectedUserId 
            ? 'flex-1' 
            : (selectedPost || viewMode === 'create') 
              ? 'hidden lg:block' 
              : 'flex-1'
        } border-r border-slate-200 dark:border-slate-700`}>
          {selectedUserId ? (
            <div className="flex flex-col h-full">
              {/* Mobile Back Button */}
              <div className="lg:hidden p-3 border-b border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    setSelectedUserId(null)
                    setSelectedPost(null)
                    setViewMode(null)
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Users
                </button>
              </div>
              <UserPosts
                userName={userName}
                posts={posts}
                loadingPosts={loadingPosts}
                errorPosts={errorPosts ? (errorPosts as Error).message : null}
                isDarkMode={isDarkMode}
                selectedPostId={selectedPost?.id || null}
                onSelectPost={handleSelectPost}
                onCreatePostClick={handleCreatePostClick}
                isPlaceholderData={isPlaceholderData}
              />
            </div>
          ) : (
            <div className={`h-full flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Welcome to FinnetTrust</h2>
              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Select a user from the list to view their posts</p>
            </div>
          )}
        </div>

        {/* Right Panel: Create Post or Post Details */}
        {selectedUserId && (
          <div className={`shrink-0 ${
            selectedPost || viewMode === 'create' 
              ? 'w-full lg:w-1/2' 
              : 'hidden lg:block lg:w-1/2'
          }`}>
            {viewMode === 'create' ? (
              <div className="flex flex-col h-full">
                {/* Mobile Back Button */}
                <div className="lg:hidden p-3 border-b border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleCancelCreate}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Posts
                  </button>
                </div>
                <CreatePostForm
                  onSubmit={handleCreatePost}
                  isDarkMode={isDarkMode}
                  onCancel={handleCancelCreate}
                  isSubmitting={createPostMutation.isPending}
                />
              </div>
            ) : viewMode === 'details' && selectedPost ? (
              <div className="flex flex-col h-full">
                {/* Mobile Back Button */}
                <div className="lg:hidden p-3 border-b border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleBackFromDetails}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Posts
                  </button>
                </div>
                <PostDetails
                  post={selectedPost}
                  onBack={handleBackFromDetails}
                  isDarkMode={isDarkMode}
                />
              </div>
            ) : (
              <div className={`h-full flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-l border-slate-700' : 'bg-white border-l border-slate-200'}`}>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className={`text-base font-semibold mb-1.5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Select a post</h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Choose a post from the list to view details</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
