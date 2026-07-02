import type { User } from '../types';

interface UsersListProps {
  users: User[];
  selectedUserId: number | null;
  onSelectUser: (userId: number) => void;
  isDarkMode: boolean;
}

export default function UsersList({ users, selectedUserId, onSelectUser, isDarkMode }: UsersListProps) {
  return (
    <aside 
      className={`rounded-3xl shadow-xl p-6 border transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
      }`}
      aria-label="Users list"
    >
      <h2 className={`text-xl font-bold mb-5 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Users
      </h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => onSelectUser(user.id)}
              aria-pressed={selectedUserId === user.id}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
                selectedUserId === user.id
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-900/20'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200'
                  : isDarkMode
                  ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 ${
                selectedUserId === user.id 
                  ? 'bg-white/20' 
                  : isDarkMode
                  ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-slate-200'
                  : 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700'
              }`} aria-hidden="true">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{user.name}</div>
                <div className="text-sm truncate opacity-75">{user.company.name}</div>
              </div>
              {selectedUserId === user.id && (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
