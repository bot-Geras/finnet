
import type { User } from '../types';
import { UsersListSkeleton } from './Skeletons';

interface UsersListProps {
  users: User[];
  selectedUserId: number | null;
  onSelectUser: (userId: number) => void;
  isDarkMode: boolean;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function UsersList({ users, selectedUserId, onSelectUser, isDarkMode, isLoading, error, onRetry }: UsersListProps) {
  if (isLoading) {
    return <UsersListSkeleton />;
  }

  if (error) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-6 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Failed to load users</h2>
        <p className={`text-xs mb-4 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{error}</p>
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-r border-slate-700' : 'bg-white border-r border-slate-200'}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className={`text-base font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Users
        </h2>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0.5">
          {users.map((user, _index) => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              aria-pressed={selectedUserId === user.id}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectUser(user.id)
                }
              }}
              className={`w-full text-left p-3 transition-all duration-200 flex items-center gap-3 border-l-4 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 ${
                selectedUserId === user.id
                  ? isDarkMode
                    ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md border-blue-400'
                    : 'bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md border-blue-400'
                  : isDarkMode
                  ? 'hover:bg-slate-700/50 text-slate-200 border-transparent'
                  : 'hover:bg-slate-50 text-slate-800 border-transparent'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-200 ${
                selectedUserId === user.id
                  ? 'bg-white/20'
                  : isDarkMode
                  ? 'bg-linear-to-br from-slate-600 to-slate-700 text-slate-200 hover:from-blue-600 hover:to-blue-700'
                  : 'bg-linear-to-br from-slate-200 to-slate-300 text-slate-700 hover:from-blue-500 hover:to-blue-600 hover:text-white'
              }`} aria-hidden="true">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-sm">{user.name}</div>
                <div className="text-xs truncate opacity-75">{user.company.name}</div>
              </div>
              {selectedUserId === user.id && (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
