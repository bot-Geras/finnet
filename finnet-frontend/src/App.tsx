
import { useState } from 'react';
import './App.css';
import UsersList from './components/UsersList';
import UserPosts from './components/UserPosts';
import { useUsers, useUserPosts, useCreatePost } from './hooks/useUsers';
import { UsersListSkeleton } from './components/Skeletons';

function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data: users, isLoading: loadingUsers, error: errorUsers, refetch: refetchUsers } = useUsers();
  const { data: postsData, isLoading: loadingPosts, error: errorPosts } = useUserPosts(selectedUserId);
  const createPostMutation = useCreatePost();

  const posts = postsData?.posts || [];
  const userName = postsData?.user?.name || '';

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    setSuccessMessage(null);
  };

  const handleCreatePost = async (postData: { title: string; body: string }) => {
    if (!selectedUserId) return;
    try {
      await createPostMutation.mutateAsync({ userId: selectedUserId, post: postData });
      setSuccessMessage('Post created successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingUsers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-80 shrink-0">
              <UsersListSkeleton />
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  if (errorUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-600 mb-6">{(errorUsers as Error).message || 'Failed to load users'}</p>
          <button
            onClick={() => refetchUsers()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const bgClass = isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100';
  const headerClass = isDarkMode ? 'bg-gradient-to-r from-indigo-700 to-indigo-800' : 'bg-gradient-to-r from-blue-600 to-blue-700';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgClass}`}>
      {/* Header */}
      <header className={`transition-colors duration-300 ${headerClass} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold">FinnetTrust</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Users Sidebar */}
          <div className="lg:w-80 shrink-0">
            <UsersList
              users={users || []}
              selectedUserId={selectedUserId}
              onSelectUser={handleSelectUser}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Posts Area */}
          <div className="flex-1">
            {successMessage && (
              <div className={`border px-6 py-4 rounded-2xl mb-6 flex items-center gap-3 shadow-sm transition-colors duration-200 ${isDarkMode ? 'bg-green-900/30 border-green-700 text-green-300' : 'bg-green-50 border-green-200 text-green-700'}`}>
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {selectedUserId ? (
              <UserPosts
                userName={userName}
                posts={posts}
                onCreatePost={handleCreatePost}
                loadingPosts={loadingPosts}
                errorPosts={errorPosts ? (errorPosts as Error).message : null}
                isDarkMode={isDarkMode}
                isCreatePostPending={createPostMutation.isPending}
              />
            ) : (
              <div className={`rounded-3xl shadow-xl p-12 text-center transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`}>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Welcome to FinnetTrust</h2>
                <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Select a user from the list to view their posts</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
